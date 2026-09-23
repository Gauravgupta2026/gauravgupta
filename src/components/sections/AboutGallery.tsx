import { WebGLPeelFilm } from "@/components/ui/WebGLPeelFilm";
import { aboutGalleryScreens } from "@/content/aboutGallery";

export function AboutGallery() {
  return (
    <div className="about-gallery">
      {aboutGalleryScreens.map((screen, index) => (
        <section
          className="about-gallery-screen"
          key={`photo-screen-${index + 1}`}
          aria-label={`Photo screen ${index + 1} of ${aboutGalleryScreens.length}`}
        >
          <div className="about-gallery-screen__inner">
            <div className="about-gallery-frame">
              <div className="about-gallery-grid">
                {screen.photos.map((photo) => (
                  <figure className="about-gallery-photo" key={photo.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                  </figure>
                ))}
              </div>
              <WebGLPeelFilm story={screen.story} screenNumber={index + 1} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
