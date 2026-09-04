import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { timeline } from "@/content/story";

/**
 * The Manipal go-kart story — a static photo band, pull quote, the kart
 * narrative, the career timeline, and the freelance-photography coda.
 * Copy verbatim from Landing.dc.html / LANDING 4-dark.pdf.
 */
export function MyStory() {
  return (
    <section id="story" className="pt-[80px] md:pt-[130px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/photos/beach-manipal.png"
        alt="Beach night, Manipal"
        className="block h-auto w-full"
      />

      <Shell wide className="pt-[56px] md:pt-[90px]">
        <Reveal
          as="p"
          className="m-0 mx-auto max-w-[700px] text-pretty text-center font-body text-[13px] leading-[22px] text-mute-3 md:text-[14px] md:leading-[26px]"
        >
          Grew up in Manipal taking things apart. Everything worth building
          since has needed more than one pair of hands.
        </Reveal>

        <Reveal
          as="div"
          delay={80}
          className="mx-auto mt-[36px] max-w-[820px] text-[13px] leading-[21px] md:mt-[56px] md:text-[14px] md:leading-[33.5px]"
        >
          <p className="m-0 text-pretty text-mute-3">
            Manipal, second year. <span className="text-ink">The go-kart team</span> had a
            car, 15 people, and a competition date. They put me on{" "}
            <span className="text-ink">design, marketing &amp; budgets</span>.
          </p>
          <p className="m-0 mt-[18px] text-pretty text-mute-3">
            I managed sponsors, budget, calendar, and a workshop full of
            engineers who each knew their subsystem deserved the extra week.
          </p>
          <p className="m-0 mt-[18px] text-pretty text-mute-3">
            <span className="text-ink">8 months later</span> the kart ran at{" "}
            <span className="text-ink">Buddh International Circuit</span>, the
            track India built for Formula 1, and we finished 4th overall.
          </p>
          <p className="m-0 mt-[18px] text-pretty text-mute-3">
            None of that came from me being the best engineer in the room; it
            came from getting the room to agree what &ldquo;done&rdquo; meant
            before anyone cut metal. I&rsquo;ve used that on every project
            since.
          </p>
        </Reveal>

        <Reveal
          as="div"
          delay={160}
          className="mx-auto mt-[44px] max-w-[820px] font-mono text-[10px] md:mt-[64px] md:text-[12px]"
        >
          {timeline.map((r) => (
            <div
              key={r.when}
              className="flex h-[36px] items-baseline gap-[10px] sm:h-[38px] md:h-[42px]"
            >
              <div className="shrink-0 whitespace-nowrap text-mute-3">{r.when}</div>
              {/* leader line — flex-grows to fill exactly the gap between
                  the two columns, so it stays aligned regardless of how
                  long `when`/`what` are, instead of a fixed dash count
                  that only lined up by coincidence at one text length. */}
              <div
                aria-hidden="true"
                className="hidden h-0 min-w-[16px] flex-1 translate-y-[-3px] border-b border-dotted border-mute-3/50 sm:block"
              />
              <div className="min-w-0 shrink truncate font-body text-mute-2">{r.what}</div>
            </div>
          ))}
        </Reveal>

        <Reveal
          as="div"
          delay={240}
          className="mx-auto mt-[44px] max-w-[820px] text-[13px] leading-[21px] md:mt-[64px] md:text-[14px] md:leading-[33.5px]"
        >
          <p className="m-0 text-pretty text-mute-3">
            Not everything is on that list.
          </p>
          <p className="m-0 mt-[18px] text-pretty text-mute-3">
            I&rsquo;ve freelanced since second year, mostly behind a camera
            &mdash;{" "}
            <a href="#" className="text-ink underline underline-offset-4 hover:text-lilac">
              Superteam India
            </a>
            ,{" "}
            <a href="#" className="text-ink underline underline-offset-4 hover:text-lilac">
              GoatFish
            </a>
            , and{" "}
            <a href="#" className="text-ink underline underline-offset-4 hover:text-lilac">
              Little Unusual
            </a>
            , and a few people who found me through them. This gig took me
            places and I met people.
          </p>
          <p className="m-0 mt-[18px] text-pretty text-mute-3">
            It&rsquo;s the same muscle as product work. Photography just makes
            it obvious &mdash; one afternoon, someone else&rsquo;s vision, and
            a room waiting on you to call it.
          </p>
          <p className="m-0 mt-[26px] text-pretty text-mute-3">
            Nothing on this site was handed to me as a brief. Nothing on it
            got built alone, either.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}
