"""
Generates the hand-drawn stroke paths used by <IntroSplash>.

Why generated rather than hand-authored: each stroke needs 3 near-identical
variants. Cycling them at 80ms reproduces the "line boil" of frame-by-frame cel
animation — the wobble that makes a static lockup feel drawn rather than typeset.
Hand-authoring 3 consistent-but-imperfect variants of the same curve is exactly
the kind of thing a seeded RNG does better than a human.

Usage:  python3 scripts/gen-scribble.py   →  src/components/intro/scribble.ts
"""
import math
import random
import os

BOIL_FRAMES = 3
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "components", "intro", "scribble.ts")


def catmull_to_bezier(pts):
    """Convert a polyline through `pts` into smooth cubic beziers (Catmull-Rom)."""
    p = list(pts)
    n = len(p)
    d = [f"M{p[0][0]:.1f},{p[0][1]:.1f}"]
    for i in range(n - 1):
        p0 = p[i - 1] if i > 0 else p[0]
        p1, p2 = p[i], p[i + 1]
        p3 = p[i + 2] if i + 2 < n else p[-1]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d.append(
            f"C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}"
        )
    return "".join(d)


def rough_loop(seed, cx=320.0, cy=110.0, rx=286.0, ry=86.0,
               start_deg=163.0, sweep_deg=376.0, steps=46, noise=1.0):
    """
    A marker circle around a word. Sweeps past 360deg so the stroke overshoots
    and crosses its own start, the way a real hand closing a loop does.

    The overshoot is deliberately small (~16deg) and barely flared: a larger
    flare reads as a pointed spike rather than a pen leaving the page.
    """
    rnd = random.Random(seed)
    # Two out-of-phase sine terms = a slow radius wobble no hand could avoid.
    ph_a, ph_b = rnd.uniform(0, 6.28), rnd.uniform(0, 6.28)
    drift_x, drift_y = rnd.uniform(-2, 2) * noise, rnd.uniform(-2, 2) * noise
    pts = []
    for i in range(steps + 1):
        t = i / steps
        a = math.radians(start_deg + sweep_deg * t)
        wob = 1 + 0.045 * math.sin(3.1 * a + ph_a) + 0.028 * math.sin(5.7 * a + ph_b)
        # Ease the tail out just enough that the stroke lifts rather than stops dead.
        tail = 1 + 0.03 * max(0.0, (t - 0.88) / 0.12) ** 2
        jx = rnd.uniform(-1.6, 1.6) * noise
        jy = rnd.uniform(-1.2, 1.2) * noise
        pts.append((
            cx + drift_x + math.cos(a) * rx * wob * tail + jx,
            cy + drift_y + math.sin(a) * ry * wob * tail + jy,
        ))
    return catmull_to_bezier(pts)


def rough_line(seed, x1, y1, x2, y2, bow=6.0, steps=12, noise=0.8):
    """A short hand-drawn swash with a slight bow through its middle."""
    rnd = random.Random(seed)
    pts = []
    for i in range(steps + 1):
        t = i / steps
        x = x1 + (x2 - x1) * t
        y = y1 + (y2 - y1) * t + math.sin(t * math.pi) * bow
        pts.append((x + rnd.uniform(-1, 1) * noise, y + rnd.uniform(-1, 1) * noise))
    return catmull_to_bezier(pts)


def ts_array(name, items, doc):
    body = "".join(f'  "{x}",\n' for x in items)
    return f"/** {doc} */\nexport const {name}: readonly string[] = [\n{body}];\n"


scribble = [rough_loop(seed=s) for s in range(BOIL_FRAMES)]
swash = [rough_line(30 + s, 10, 12, 190, 12, bow=4) for s in range(BOIL_FRAMES)]

parts = [
    "/**",
    " * Hand-drawn stroke geometry for <IntroSplash>. GENERATED — do not hand-edit.",
    " * Regenerate with: python3 scripts/gen-scribble.py",
    " *",
    " * Every stroke ships as 3 near-identical variants. Cycling them at 80ms is the",
    ' * "line boil" of cel animation: the same line redrawn, never quite the same way.',
    " *",
    ' * Paths carry pathLength="1" at render time, so stroke-dashoffset draw-on runs',
    " * at a uniform rate across variants despite their differing true lengths.",
    " */",
    "",
    f"export const BOIL_FRAMES = {BOIL_FRAMES};",
    "",
    "/** Milliseconds each boil variant holds. 80ms ≈ 12fps, matching cel animation on twos. */",
    "export const BOIL_STEP_MS = 80;",
    "",
    ts_array("SCRIBBLE_VARIANTS", scribble, "Marker circle around the wordmark. viewBox 0 0 640 220."),
    ts_array("SWASH_VARIANTS", swash, "Small underline swash beneath the name. viewBox 0 0 200 24."),
]

with open(OUT, "w") as f:
    f.write("\n".join(parts))
print(f"wrote {os.path.normpath(OUT)}")
