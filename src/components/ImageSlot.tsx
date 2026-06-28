interface ImageSlotProps {
  /** Image URL (e.g. "/images/hero.jpg"). When absent, a placeholder shows. */
  src?: string;
  alt: string;
  /** `contain` keeps the whole image visible (hero mat); `cover` fills (cards). */
  fit?: "contain" | "cover";
  /** Placeholder label shown when no `src` is supplied. */
  placeholder?: string;
}

/**
 * A drop-in image frame. Supply `src` to show a photo; leave it empty to show a
 * labelled placeholder so the layout is complete before assets are added.
 */
export function ImageSlot({
  src,
  alt,
  fit = "cover",
  placeholder = "Image",
}: ImageSlotProps) {
  return (
    <div className="imageslot">
      {src ? (
        <img src={src} alt={alt} className={`img--${fit}`} loading="lazy" />
      ) : (
        <span aria-label={alt}>{placeholder}</span>
      )}
    </div>
  );
}
