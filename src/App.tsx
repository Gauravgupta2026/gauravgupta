import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { ProjectPage } from "./components/ProjectPage";
import { Footer } from "./components/Footer";
import { useRoute } from "./useRoute";

export function App() {
  const route = useRoute();

  // A stable key that only changes when we actually move between pages — so
  // in-page anchor clicks on the home view (#about, #projects) don't trigger a
  // scroll-to-top and override native anchor scrolling.
  const routeKey = route.name === "project" ? `project:${route.id}` : "home";

  useEffect(() => {
    if (route.name === "project") {
      window.scrollTo(0, 0);
      return;
    }
    // Arriving home from a project page: honor an in-page anchor if one is set
    // (the section now exists in the DOM), otherwise go to the top.
    const { hash } = window.location;
    if (hash.length > 1 && !hash.startsWith("#/")) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  return (
    <div className="app">
      <Nav />
      {route.name === "project" ? <ProjectPage id={route.id} /> : <Home />}
      <Footer />
    </div>
  );
}
