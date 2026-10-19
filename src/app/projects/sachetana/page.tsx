import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { paperProjects } from "@/content/paperPortfolio";
import {
  ABOUT_FACTS, ART, BET, EVOLUTIONS, NAME, FIXES, FLOW_CAPTION, INDEX_GROUPS, METRICS, MOCKUPS, PAINTINGS, REASONS, RESULTS, ROLES, SMALLER_CALLS,
  STORIES, SUMMARY, TIMELINE_CAPTION, TURN, TURN_PULL, WEB, type Story,
} from "./content";
import { KeyMap, MetricArt, ReasonIcon, ScopeBlocks, Swimlane, Timeline } from "./Illustrations";
import { Index } from "./Index";
import { Legend, Marks, PhoneScreen, type Callout } from "./Phone";
import { ReadingProgress } from "./ReadingProgress";
import { Zoom } from "./Zoom";
import styles from "./Sachetana.module.css";

export const metadata: Metadata = {
  title: "Sachetana — Gaurav Gupta",
  description: "A student mental health check-in app for MAHE, Manipal. A closed project, written up honestly.",
};

const IMAGE_ZOOM_WIDTH = 1000;
const LOGOS = "/assets/sachetana/logos/svg";

/** Marks on each screen. x and y are percentages of the screen. */
const SOS_MARKS: Callout[] = [
  { n: 1, x: 48, y: 46.2, text: "SOS calls the emergency contact, then the ambulance contact." },
  { n: 2, x: 93, y: 45.2, text: "The appointment link opens the hospital’s own booking website." },
  { n: 3, x: 94, y: 64, text: "Five campus contacts sit below." },
];
const SIGNUP_MARKS: Callout[] = [
  { n: 1, x: 96, y: 36.5, text: "Name, phone, email and password." },
  { n: 2, x: 94, y: 69, text: "One question: are you a student?" },
];
/** The logo: a tangle at the lower left that resolves into one smooth curve. Positions are percentages of the logo. */
const LOGO_MARKS: Callout[] = [
  { n: 1, x: 12, y: 49, text: "The start: a tangle of loops that cross. These are the complex thoughts of the brain." },
  { n: 2, x: 60, y: 101, text: "The line works its way out of the tangle." },
  { n: 3, x: 93, y: 48, text: "It ends as one smooth curve: the thoughts, simplified and settled." },
];

/** On the mockups, marks sit left of the phone and a line runs to the thing they point at. */
const ASSESS_MARKS: Callout[] = [
  { n: 1, x: 27, y: 19.8, tx: 38.5, text: "The category. The app screens for anxiety, depression and substance abuse." },
  { n: 2, x: 27, y: 37, tx: 38.5, text: "One question per screen." },
  { n: 3, x: 27, y: 56, tx: 38.5, text: "Answers are bars, not stars." },
  { n: 4, x: 27, y: 77, tx: 44, text: "Next question." },
];
const HOME_MARKS: Callout[] = [
  { n: 1, x: 22, y: 38, tx: 34, text: "A journal box: “We help you journal your thoughts.”" },
  { n: 2, x: 22, y: 70.6, tx: 34, text: "A prompt that asks how you feel." },
];

/** A full-width mockup that breaks up the text. With callouts it shows a legend, without it zooms. */
function Breaker({ src, alt, caption, callouts }: { src: string; alt: string; caption: string; callouts?: readonly Callout[] }) {
  if (!callouts) {
    return <div className={styles.breakerGap}><ZoomImage src={src} alt={alt} width={1920} height={1440} sizes="(max-width: 767px) 100vw, 980px" caption={caption} /></div>;
  }
  return (
    <figure className={styles.breaker}>
      <div className={styles.breakerFrame}>
        <Image src={src} alt={alt} width={1920} height={1440} sizes="(max-width: 767px) 100vw, 980px" />
        <Marks callouts={callouts} />
      </div>
      <Legend callouts={callouts} />
      <figcaption className={styles.label}>{caption}</figcaption>
    </figure>
  );
}

function Painting({ name, priority = false, sizes = "100vw" }: { name: string; priority?: boolean; sizes?: string }) {
  return <Image src={`${ART}/${name}.jpg`} alt="" fill sizes={sizes} priority={priority} className={styles.paintingImage} />;
}

function Head({ label, title, lead }: { label: string; title: string; lead?: string }) {
  return (
    <header className={styles.head}>
      <p className={styles.date}>{label}</p>
      <h2>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}

function Text({ story, extra }: { story: Story; extra?: React.ReactNode }) {
  return (
    <div className={styles.text}>
      {story.paras.map((para) => <p key={para}>{para}</p>)}
      {story.cost && <p className={styles.cost}><span className={styles.label}>What it cost</span>{story.cost}</p>}
      <blockquote className={styles.pull}>{story.pull}</blockquote>
      {extra}
    </div>
  );
}

function Figure({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure className={styles.figure}>
      {children}
      <figcaption className={styles.label}>{caption}</figcaption>
    </figure>
  );
}

function ZoomImage({ src, alt, width, height, caption, sizes }: { src: string; alt: string; width: number; height: number; caption: string; sizes: string }) {
  return (
    <Figure caption={caption}>
      <Zoom src={src} alt={alt} width={width} height={height} maxWidth={IMAGE_ZOOM_WIDTH} caption={caption}>
        <Image src={src} alt="" width={width} height={height} sizes={sizes} />
      </Zoom>
    </Figure>
  );
}

export default function SachetanaPage() {
  const index = paperProjects.findIndex((item) => item.slug === "sachetana");
  const next = paperProjects[(index + 1) % paperProjects.length];
  const story = (id: string) => STORIES.find((s) => s.id === id)!;

  return (
    <main id="main-content" className={styles.page}>
      <ReadingProgress />

      <header className={styles.banner}>
        <Painting name="water-lilies-1906" priority />
        <Link className={styles.back} href="/work">Back to work</Link>
        <div className={styles.bannerText}>
          <Image className={styles.logo} src={`${LOGOS}/logo-white.svg`} alt="Sachetana logo" width={33} height={38} priority />
          <p className={styles.eyebrow}>Case study</p>
          <h1>Sachetana</h1>
          <p className={styles.bannerLead}>A quiet first step toward campus counselling.</p>
          <p className={styles.byline}>for MAHE, Manipal, 2024 – 25 — as designer and builder</p>
        </div>
        <p className={styles.credit}>Claude Monet, Water Lilies, 1906</p>
      </header>

      <div className={styles.body}>
        <Index groups={INDEX_GROUPS} />

        <div className={styles.entries}>
          {/* ---------- At a glance: everything a hiring manager needs ---------- */}
          <section className={styles.entry} id="summary">
            <Head label="At a glance" title="Sachetana in 30 seconds." />
            <div className={styles.summary}>
              {SUMMARY.map((row) => (
                <div key={row.k}><h3>{row.k}</h3><p>{row.v}</p></div>
              ))}
            </div>
            <dl className={styles.strip}>
              {ABOUT_FACTS.map((fact) => <div key={fact.k}><dt>{fact.k}</dt><dd>{fact.v}</dd></div>)}
            </dl>
          </section>

          <section className={styles.entry} id="numbers">
            <Head label="The numbers" title="Six numbers, and how sure I am of each." lead="I kept no usage analytics, so every number comes from my records or my memory. Each one shows where it comes from." />
            <div className={styles.metrics}>
              {METRICS.map((metric) => (
                <figure key={metric.id} className={styles.metric}>
                  <MetricArt id={metric.id} />
                  <p className={styles.value}>{metric.value}</p>
                  <figcaption>{metric.caption}</figcaption>
                  <p className={styles.label}>{metric.source}</p>
                </figure>
              ))}
            </div>
          </section>

          <section className={styles.entry} id="timeline">
            <Head label="Prototype to app" title="From one month of prototypes to three months of building." lead="Until the hackathon we only had prototypes. Winning turned it into a real build, and then the support ran out." />
            <Figure caption={TIMELINE_CAPTION}>
              <div className={styles.chart}><Timeline /></div>
            </Figure>
            {EVOLUTIONS.length > 0 && (
              <div className={styles.bleed}>
                <div className={styles.paintingImage}><Painting name="wheat-sunset-snow" /></div>
                {EVOLUTIONS.map((pair) => (
                  <div className={styles.evolution} key={pair.id}>
                    <figure><Image src={pair.before.src} alt={pair.before.alt} width={pair.before.width} height={pair.before.height} sizes="(max-width: 767px) 100vw, 480px" /><figcaption><strong>Prototype</strong>{pair.label}</figcaption></figure>
                    <span className={styles.evolutionArrow} aria-hidden>→</span>
                    <figure><Image src={pair.after.src} alt={pair.after.alt} width={pair.after.width} height={pair.after.height} sizes="(max-width: 767px) 100vw, 480px" /><figcaption><strong>MVP</strong>{pair.label}</figcaption></figure>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={styles.entry} id="screens">
            <Head label="The screens" title="What the app looks like." lead="The first screens a student meets, and the home screen. Click any image to enlarge it." />
            <ZoomImage src={`${MOCKUPS}/onboarding-duo.jpeg`} alt="Two phones showing the Get Started sheet and the Sachetana welcome screen" width={1920} height={1440} sizes="(max-width: 767px) 100vw, 980px" caption="The way in: Get Started, then the welcome screen." />
            <div className={styles.pair}>
              <ZoomImage src={`${MOCKUPS}/getting-started.png`} alt="A phone showing the Get Started sheet with Continue with Email and Continue with Phone" width={1920} height={1440} sizes="(max-width: 767px) 100vw, 480px" caption="Sign-up starts with a choice: email or phone." />
              <ZoomImage src={`${MOCKUPS}/assessments-2.png`} alt="Two tilted phones showing both assessment layouts" width={1920} height={1440} sizes="(max-width: 767px) 100vw, 480px" caption="Two layouts for the same question: a card with a face, and a list of bars." />
            </div>
          </section>

          {/* ---------- The story, for readers who want more ---------- */}
          <figure className={styles.divider}>
            <div className={styles.dividerImage}><Painting name="charing-cross-1901" /></div>
            <figcaption>
              <span className={styles.label}>The story</span>
              <strong>The full story, for anyone who wants the detail. It all comes from my own records and memory.</strong>
            </figcaption>
          </figure>

          <section className={styles.entry} id="bet">
            <Head label="The bet" title="The help was there. Students did not go." lead="I came to see three reasons students stayed away from services the campus already ran." />
            <div className={styles.reasons}>
              {REASONS.map((reason) => (
                <div key={reason.id}><ReasonIcon id={reason.id} /><h3>{reason.title}</h3><p>{reason.text}</p></div>
              ))}
            </div>
            <div className={styles.text}>
              {BET.paras.map((para) => <p key={para}>{para}</p>)}
              <blockquote className={styles.pull}>{BET.pull}</blockquote>
            </div>
            <Breaker src={`${MOCKUPS}/onboarding-0.png`} alt="The Sachetana welcome screen: a seated silhouette facing a blue painted landscape, with Sign up and Log in buttons" caption="The first screen a student sees: one painted image, the name, and two buttons." />
          </section>

          <section className={styles.entry} id="name">
            <Head label={NAME.label} title={NAME.title} lead={NAME.lead} />
            <div className={styles.cols}>
              <div className={styles.text}>
                {NAME.paras.map((para) => <p key={para}>{para}</p>)}
                <blockquote className={styles.pull}>{NAME.pull}</blockquote>
                <p className={`${styles.label} ${styles.sourceNote}`}>{NAME.source} <a href={NAME.sourceHref} target="_blank" rel="noopener noreferrer">Wisdom Library</a></p>
              </div>
              <div className={styles.visual}>
                <div className={styles.logoBox}>
                  <Image src={`${LOGOS}/logo-black.svg`} alt="The Sachetana logo: a tangled loop at the lower left that resolves into one smooth S-shaped curve" width={33} height={38} unoptimized />
                  <Marks callouts={LOGO_MARKS} />
                </div>
                <Legend callouts={LOGO_MARKS} />
                <p className={styles.label}>The Sachetana logo.</p>
              </div>
            </div>
          </section>

          <section className={styles.entry} id="sos">
            <Head label={story("sos").label} title={story("sos").title} lead={story("sos").lead} />
            <div className={styles.cols}>
              <Text story={story("sos")} />
              <div className={styles.visual}>
                <PhoneScreen src={`${WEB}/sos.png`} alt="SOS screen with a large SOS button, a Schedule an appointment link and a list of five campus contacts." width={430} height={932} callouts={SOS_MARKS} />
                <Legend callouts={SOS_MARKS} />
                <p className={styles.label}>The SOS screen. Phone numbers are hidden in this image.</p>
              </div>
            </div>
          </section>

          <section className={styles.entry} id="flagging">
            <Head label={story("flagging").label} title={story("flagging").title} lead={story("flagging").lead} />
            <Text story={story("flagging")} />
            <Breaker src={`${MOCKUPS}/assessments.png`} alt="A phone showing a Sachetana question on a blue screen, with three answer bars and a Next question button" caption="A question screen, drawn as a list of bars." callouts={ASSESS_MARKS} />
            <Figure caption={FLOW_CAPTION}>
              <div className={styles.chart}><Swimlane /></div>
            </Figure>
          </section>

          <section className={styles.entry} id="privacy">
            <Head label={story("privacy").label} title={story("privacy").title} lead={story("privacy").lead} />
            <div className={styles.cols}>
              <Text story={story("privacy")} extra={<Figure caption="Identity and responses are kept apart. Interns see only the responses."><KeyMap /></Figure>} />
              <div className={styles.visual}>
                <PhoneScreen src={`${WEB}/signup.png`} alt="Sachetana sign-up form with name, phone, email and password fields and an 'Are you a student?' checkbox." width={430} height={932} callouts={SIGNUP_MARKS} />
                <Legend callouts={SIGNUP_MARKS} />
                <p className={styles.label}>The sign-up screen.</p>
              </div>
            </div>
          </section>

          <section className={styles.entry} id="scope">
            <Head label={story("scope").label} title={story("scope").title} lead={story("scope").lead} />
            <Text story={story("scope")} extra={<Figure caption="The scope, before and after."><ScopeBlocks /></Figure>} />
            <Breaker src={`${MOCKUPS}/home.png`} alt="The Sachetana home screen in a phone, with a greeting, a journal box and a how-are-you-feeling prompt" caption="The home screen." callouts={HOME_MARKS} />
          </section>

          <section className={styles.entry} id="smaller">
            <Head label="Smaller calls" title="Three more decisions, shorter." />
            <div className={styles.smaller}>
              {SMALLER_CALLS.map((call) => (
                <div key={call.id} className={styles.smallRow}>
                  <div>
                    <h3>{call.title}</h3>
                    <p>{call.text}</p>
                  </div>
                  {call.id === "sliders" && (
                    <ZoomImage src={`${MOCKUPS}/assessments-2.png`} alt="Two tilted phones showing both assessment layouts" width={1920} height={1440} sizes="(max-width: 767px) 100vw, 420px" caption="Two layouts for the same question." />
                  )}
                  {call.id === "chatbot" && (
                    <Figure caption="The rule, drawn as a card. The chatbot screen is not on this page.">
                      <span className={styles.ruleCard}>
                        <span className={styles.label}>The rule</span>
                        <span><em>A definition</em><strong>Answered</strong></span>
                        <span><em>A request for a solution</em><strong>Blocked, with a warning</strong></span>
                      </span>
                    </Figure>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.entry} id="turn">
            <Head label="The turn" title="The backing did not arrive. And I stopped believing an app was enough." lead="Two things ended the project: no funding, and a conversation that changed my mind." />
            <figure className={styles.band}>
              <div className={styles.bandImage}><Painting name="whistler-nocturne" /></div>
              <figcaption className={styles.label}>Nocturne: Blue and Gold — Southampton Water, Whistler, 1872.</figcaption>
            </figure>
            <div className={styles.text}>
              {TURN.map((row) => <p key={row.title}><strong className={styles.run}>{row.title}.</strong> {row.text}</p>)}
              <blockquote className={styles.pull}>{TURN_PULL}</blockquote>
            </div>
          </section>

          <section className={styles.entry} id="fixes">
            <Head label="What I would fix" title="The gaps, so nobody reads this as a claim of compliance." lead="An app that handles mental health data needs more care than a hackathon build gave it. These are the gaps I know of." />
            <ul className={styles.rows}>
              {FIXES.map((item) => <li key={item}><span>{item}</span></li>)}
            </ul>
            <p className={styles.reflection}>
              I would not build this again. What I am proud of is the UI, the feature set and the SOS flow. They came from watching people use it, and then changing it.
            </p>
          </section>

          <section className={styles.entry} id="facts">
            <Head label="All the facts" title="Every fact, and where it comes from." lead="This is everything I can stand behind. I have no usage counts, no appointment numbers, and no evidence that the app changed what students did. Testing was manual and live, and only photos remain." />
            <ul className={styles.rows}>
              {RESULTS.map((row) => <li key={row.fact}><span>{row.fact}</span><em className={styles.label}>{row.source}</em></li>)}
            </ul>
          </section>

          <section className={styles.entry} id="credits">
            <Image className={styles.creditLogo} src={`${LOGOS}/logo-black.svg`} alt="" width={33} height={38} />
            <p className={styles.date}>Credits</p>
            <div className={styles.creditsGrid}>
              <ul className={styles.roles}>
                {ROLES.map((row, i) => <li key={`${row.who}-${i}`}><span>{row.who}</span><em className={styles.label}>{row.what}</em></li>)}
              </ul>
              <div>
                <p className={styles.label}>Paintings</p>
                <ul className={styles.paintingList}>
                  {PAINTINGS.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className={styles.label}>All three are in the public domain. Images from the Art Institute of Chicago open-access collection.</p>
              </div>
            </div>
          </section>

          <footer className={styles.more}>
            <p className={styles.label}>More work</p>
            <Link href={`/projects/${next.slug}`}>
              <span className={styles.moreImage}><Image src={next.image} alt={next.alt} fill sizes="(max-width: 767px) 100vw, 480px" /></span>
              <strong>{next.title}</strong>
              <span className={styles.label}>{next.purpose}</span>
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
