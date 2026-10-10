"""Cut the opening-sequence window art into animation layers.

Input : design/opening/window-master.png  (closed window on a white background)
Output: public/opening/*.webp and src/components/opening/geometry.ts

Layers (all positioned in the cropped window canvas):
  window-frame.webp    frame with a transparent hole where the shutters sit
  shutter-left.webp    left shutter, hinge on its left edge
  shutter-right.webp   right shutter, hinge on its right edge
  panel.webp           warm cream panel that fills the hole, with a soft inner shadow
  paper.webp           seamless handmade-paper tile for the page background

Run: python3 scripts/build-opening-assets.py [--panel marigold|indigo]   (needs numpy and Pillow)
If you replace the master with a higher-resolution version of the same drawing,
re-measure SEAL_X, SEED and the WINDOW_* constants below, then run again.
"""
import argparse
import json
import pathlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
MASTER = ROOT / "design/opening/window-master.png"
OUT = ROOT / "public/opening"
GEOMETRY = ROOT / "src/components/opening/geometry.ts"

# ---- Measurements taken on the 1077x1461 master. Change them if the master changes. ----
SEAL_X = 539.5            # x of the thin dark seam between the two shutters
SEED = (1150, 470)        # (y, x) of a pixel on dark shutter paint, used to start the fill
PAPER_WHITE = 246         # min(r,g,b) at or above this counts as the white page
FRAME_SEAL_PX = 3         # frame colour is grown this much so the fill cannot leak through texture
HAIRLINE_PX = 3           # thin slivers narrower than this are removed from the shutter region
BOTTOM_PERCENTILE = 85     # the sill line is the 85th-percentile bottom row of all shutter columns
SMOOTH_PX = 6             # notches narrower than this (twice) are filled, so the hole edge is not ragged
SHUTTER_BLEED_PX = 2      # shutters overlap the frame by this much, so no seam shows when closed
PANEL_BLEED_PX = 3        # the panel runs this far under the frame
APEX_WINDOW = (14, 536, 558)  # half-width, top row, last row of the shutters' pointed tip
APEX_FLOOR_ROW = 558      # above this row the fill is limited to the tip, so it cannot leak
FEATHER_PX = 0.8          # edge softening for every cut

PAPER_SIZE = 768
PAPER_BASE = (239, 231, 216)
# What shows behind the shutters. `center` is the brightest point, `edge` the colour toward the frame,
# `shade` is what the inner shadow multiplies by, `ink` is the text colour that reads best on it.
PANEL_THEMES = {
    "marigold": {"center": (255, 226, 148), "edge": (236, 150, 58), "shade": (0.80, 0.62, 0.56), "strength": 0.42, "ink": "#1e2e5a"},
    "indigo": {"center": (52, 82, 150), "edge": (20, 34, 84), "shade": (0.55, 0.60, 0.80), "strength": 0.50, "ink": "#f4ecd6"},
}
DEFAULT_PANEL = "marigold"
PANEL_SHADOW_BLUR = 22
PANEL_SHADOW_SHIFT = (6, 10)       # light comes from the upper left, so shade falls lower right
RNG_SEED = 7


def shift_or(mask: np.ndarray) -> np.ndarray:
    out = mask.copy()
    out[1:] |= mask[:-1]
    out[:-1] |= mask[1:]
    out[:, 1:] |= mask[:, :-1]
    out[:, :-1] |= mask[:, 1:]
    return out


def dilate(mask: np.ndarray, n: int) -> np.ndarray:
    for _ in range(n):
        mask = shift_or(mask)
    return mask


def erode(mask: np.ndarray, n: int) -> np.ndarray:
    return ~dilate(~mask, n)


def grow(seed: np.ndarray, allowed: np.ndarray) -> np.ndarray:
    """Flood fill: spread from `seed` through `allowed` pixels."""
    region = seed & allowed
    while True:
        spread = shift_or(region) & allowed
        if (spread == region).all():
            return region
        region = spread


def feather(mask: np.ndarray) -> np.ndarray:
    img = Image.fromarray((mask * 255).astype("uint8"), "L").filter(ImageFilter.GaussianBlur(FEATHER_PX))
    soft = np.asarray(img).astype("float32") / 255
    return np.clip((soft - 0.3) / 0.5, 0, 1)


def bbox(mask: np.ndarray):
    ys, xs = np.where(mask)
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def to_rgba(rgb: np.ndarray, alpha: np.ndarray, box) -> Image.Image:
    x0, y0, x1, y1 = box
    out = np.dstack([rgb[y0:y1, x0:x1], (alpha[y0:y1, x0:x1] * 255).astype("uint8")])
    return Image.fromarray(out, "RGBA")


def save(img: Image.Image, name: str, quality: int = 93):
    img.save(OUT / name, "WEBP", quality=quality, method=6)


def window_alpha(near_white: np.ndarray) -> np.ndarray:
    """Alpha of the whole window: white that touches the picture edge is background."""
    border = np.zeros_like(near_white)
    border[0, :] = border[-1, :] = border[:, 0] = border[:, -1] = True
    background = grow(border & near_white, near_white)
    return feather(~background)


def shutter_region(rgb: np.ndarray) -> np.ndarray:
    """Pixels of both shutters, found by flooding inside the lighter-blue frame."""
    a = rgb.astype("float32") / 255
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(axis=2), a.min(axis=2)
    sat = (mx - mn) / np.maximum(mx, 1e-6)
    span = np.maximum(mx - mn, 1e-6)
    hue = np.where(mx == r, ((g - b) / span) % 6, np.where(mx == g, (b - r) / span + 2, (r - g) / span + 4)) * 60
    frame_blue = (mx >= 0.66) & (sat >= 0.45) & (hue >= 195) & (hue <= 222)
    free = ~dilate(frame_blue, FRAME_SEAL_PX)

    h, w = free.shape
    yy, xx = np.mgrid[0:h, 0:w]
    half, tip_top, tip_bottom = APEX_WINDOW
    limit = ((yy >= APEX_FLOOR_ROW) & (xx >= 205) & (xx <= 875)) | (
        (np.abs(xx - SEAL_X) <= half) & (yy >= tip_top) & (yy < tip_bottom)
    )
    seed = np.zeros((h, w), bool)
    seed[SEED] = True
    filled = grow(seed, free & limit)

    # Paint inside the shutters (flowers, knobs) can be light blue; fill those holes.
    border = np.zeros_like(filled)
    border[0, :] = border[-1, :] = border[:, 0] = border[:, -1] = True
    outside = grow(border & ~filled, ~filled)
    region = ~outside
    # Remove hairline leaks along the frame's highlight lines, then fill small notches in the edge.
    trimmed = dilate(erode(region, HAIRLINE_PX), HAIRLINE_PX) & region
    smooth = erode(dilate(trimmed, SMOOTH_PX), SMOOTH_PX)
    return flatten_bottom(smooth)


def flatten_bottom(region: np.ndarray) -> np.ndarray:
    """The sill is a straight line. Aqua dots on the shutters' lower border look like frame blue and
    leave small peaks along it, so extend every column down to the common bottom row."""
    columns = np.where(region.any(axis=0))[0]
    last_rows = np.array([np.where(region[:, x])[0].max() for x in columns])
    bottom = int(np.percentile(last_rows, BOTTOM_PERCENTILE))
    out = region.copy()
    for x, last in zip(columns, last_rows):
        out[last : bottom + 1, x] = True
    return out


def make_panel(region: np.ndarray, box, theme: dict) -> Image.Image:
    x0, y0, x1, y1 = box
    h, w = y1 - y0, x1 - x0
    hole = region[y0:y1, x0:x1]
    # Shade falls near the edges and away from the light.
    shifted = np.roll(np.roll(hole, PANEL_SHADOW_SHIFT[1], axis=0), PANEL_SHADOW_SHIFT[0], axis=1)
    soft = np.asarray(
        Image.fromarray((shifted * 255).astype("uint8"), "L").filter(ImageFilter.GaussianBlur(PANEL_SHADOW_BLUR))
    ).astype("float32") / 255
    shade = np.clip(1 - soft, 0, 1) ** 1.3 * theme["strength"]
    yy, xx = np.mgrid[0:h, 0:w]
    # Light is brightest a little below the middle of the opening and falls off toward the frame.
    radial = np.exp(-(((xx - w / 2) / (w * 0.55)) ** 2 + ((yy - h * 0.58) / (h * 0.50)) ** 2) * 1.6)
    centre, edge = np.array(theme["center"], "float32"), np.array(theme["edge"], "float32")
    base = edge[None, None, :] + (centre - edge)[None, None, :] * radial[..., None]
    rng = np.random.default_rng(RNG_SEED)
    grain = rng.normal(0, 2.2, (h, w, 1))
    tint = 1 - shade[..., None] * (1 - np.array(theme["shade"], "float32"))
    rgb = np.clip(base * tint + grain, 0, 255).astype("uint8")
    alpha = feather(dilate(hole, PANEL_BLEED_PX))
    return Image.fromarray(np.dstack([rgb, (alpha * 255).astype("uint8")]), "RGBA")


def make_paper() -> Image.Image:
    """Seamless cream paper: soft mottling, fine tooth and short cotton fibres."""
    n = PAPER_SIZE
    rng = np.random.default_rng(RNG_SEED)

    def blurred_noise(sigma: float) -> np.ndarray:
        spectrum = np.fft.fft2(rng.standard_normal((n, n)))
        fy = np.fft.fftfreq(n)[:, None]
        fx = np.fft.fftfreq(n)[None, :]
        kernel = np.exp(-2 * (np.pi * sigma) ** 2 * (fx**2 + fy**2))
        field = np.real(np.fft.ifft2(spectrum * kernel))
        return field / field.std()

    mottle = blurred_noise(40) * 1.5 + blurred_noise(9) * 0.9
    tooth = rng.normal(0, 1.5, (n, n))

    fibres = Image.new("L", (n, n), 128)
    draw = ImageDraw.Draw(fibres)
    for _ in range(1300):
        x, y = rng.uniform(0, n, 2)
        length = rng.uniform(8, 38)
        angle = rng.uniform(0, np.pi)
        dx, dy = np.cos(angle) * length, np.sin(angle) * length
        tone = int(rng.choice([96, 108, 150, 162]))
        for ox in (-n, 0, n):          # draw wrapped copies so the tile has no seam
            for oy in (-n, 0, n):
                draw.line([(x + ox, y + oy), (x + dx + ox, y + dy + oy)], fill=tone, width=1)
    fibre_field = (np.asarray(fibres.filter(ImageFilter.GaussianBlur(0.5))).astype("float32") - 128) * 0.28

    luminance = mottle + tooth + fibre_field
    rgb = np.clip(np.array(PAPER_BASE, "float32")[None, None, :] + luminance[..., None] * np.array([1.0, 1.0, 0.92]), 0, 255)
    return Image.fromarray(rgb.astype("uint8"), "RGB")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--panel", choices=sorted(PANEL_THEMES), default=DEFAULT_PANEL, help="what shows behind the shutters")
    theme = PANEL_THEMES[parser.parse_args().panel]
    OUT.mkdir(parents=True, exist_ok=True)
    GEOMETRY.parent.mkdir(parents=True, exist_ok=True)
    rgb = np.asarray(Image.open(MASTER).convert("RGB"))
    near_white = rgb.min(axis=2) >= PAPER_WHITE

    win_alpha = window_alpha(near_white)
    region = shutter_region(rgb)
    win_box = bbox(win_alpha > 0.5)
    wx0, wy0, wx1, wy1 = win_box

    yy, xx = np.mgrid[0 : region.shape[0], 0 : region.shape[1]]
    bled = dilate(region, SHUTTER_BLEED_PX)
    left_mask = bled & (xx <= SEAL_X + 2)
    right_mask = bled & (xx >= SEAL_X - 2)

    frame_alpha = win_alpha * (1 - feather(region))
    save(to_rgba(rgb, frame_alpha, win_box), "window-frame.webp")

    boxes = {}
    for name, mask in (("left", left_mask), ("right", right_mask)):
        box = bbox(mask)
        save(to_rgba(rgb, feather(mask), box), f"shutter-{name}.webp")
        boxes[name] = box
    panel_box = bbox(dilate(region, PANEL_BLEED_PX))
    save(make_panel(region, panel_box, theme), "panel.webp")
    save(make_paper(), "paper.webp", quality=82)

    def rel(box):
        x0, y0, x1, y1 = box
        return {"x": x0 - wx0, "y": y0 - wy0, "w": x1 - x0, "h": y1 - y0}

    geometry = {
        "window": {"w": wx1 - wx0, "h": wy1 - wy0},
        "shutterLeft": rel(boxes["left"]),
        "shutterRight": rel(boxes["right"]),
        "panel": rel(panel_box),
        "panelInk": theme["ink"],
    }
    GEOMETRY.write_text(
        "// Generated by scripts/build-opening-assets.py. Pixel positions inside the cropped window art.\n"
        f"export const OPENING_GEOMETRY = {json.dumps(geometry, indent=2)} as const;\n"
    )
    print(json.dumps(geometry, indent=2))


if __name__ == "__main__":
    main()
