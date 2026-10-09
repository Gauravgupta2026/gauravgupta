# Experiments: paper portfolio
This branch implements the Dwija reference requested by Gaurav on 9 October 2026. It supersedes the previous SVSD experiment. Production is separate.
## Reference
https://www.dwijaxo.com/ provides the layout, typography, illustrated entry, stamp sequence and revealed footer. Gaurav’s own identity, project status, links and story provide the content. Reference artwork is documented in public/reference-dwija/SOURCES.md.
## Typography and surface
Local Newsreader 400, 16/24px body; local Jane Austen handwriting for identity and labels. White page, #1a1a1a ink, #74716d secondary copy, #fafafa paper footer, #b4265b focus. No dark mode.
## Composition
Home is a 660px reading column with 24px gutters, 300px house, 40px illustration-to-introduction gap, 80px major gaps, 56px between indexes. Desktop vertical navigation is at 78/52px above 1280px, 20/40px below. Clock and availability are visible above 1024px.
## Routes
Home /; Playground /playground with /labs alias; About /about; Contact /contact; Work /work; Notes /notes and /notes/[slug]; Projects /projects/[slug]. /home-experiment aliases Home. The legacy new-project route retains a work-in-progress page.
## Interactions
Welcome is a native modal shown once per browser session; Enter or Escape closes it. Mobile navigation and media/stamp viewers use native dialogs with Escape and focus return. All live text stays in the DOM.
About uses a sticky five-stamp scroll scene on desktop. Below 640px or with reduced motion it becomes a readable vertical sequence. Dots allow deliberate chapter navigation.
The desktop footer is fixed behind the content, revealed by reserved bottom space. Phones and short screens use a normal-flow footer. Contact swaps the garden for a native horizontally scrollable photo strip.
## Responsive and accessibility
Desktop 1280px, gallery 768px, phone 640px. One gallery column on phones, two on larger screens. Minimum 44px controls. No automatic slideshow. Decorative drawings have empty alternative text or are hidden. Meaningful photographs have descriptive alternatives.
Reduced motion disables sway, ringing and droplet effects and removes the pinned stamp sequence. Touch never hides the pointer or depends on watering effects. Pages and captions must not overflow horizontally at 360, 390, 768 and 1440px.
## Content
Do not invent credentials, launch status, quantitative impact, availability dates or external profiles. Project intros use the existing portfolio facts. Unfinished studies remain labelled; existing notes are working notes. Full case-study drafts remain in source history and are not promoted as verified finished stories.
## Verification
Run lint, webpack production build, standalone typecheck and diff checks. Verify the native entry/menu/viewers, route navigation, footer and photo controls. Passing code checks does not establish visual acceptance.
