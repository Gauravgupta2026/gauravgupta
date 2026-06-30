import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusDot, type ExperimentStatus } from "@/components/ui/StatusDot";
import data from "@/content/experiments.json";

type Experiment = {
  title: string;
  detail: string;
  status: ExperimentStatus;
};

const log = data.items as Experiment[];

const LEGEND: { status: ExperimentStatus; label: string }[] = [
  { status: "shipped", label: "Shipped" },
  { status: "brewing", label: "Brewing" },
  { status: "exploring", label: "Exploring" },
  { status: "abandoned", label: "Abandoned" },
];

/** Status label color in the right column. */
function statusColor(status: ExperimentStatus) {
  if (status === "shipped") return "text-blue";
  if (status === "abandoned") return "text-mute";
  return "text-soft-ink";
}

export function Experiments() {
  return (
    <Shell as="section" className="pt-[90px] md:pt-[150px]">
      <Reveal className="mb-[30px] flex flex-wrap items-end justify-between gap-[18px]">
        <div>
          <div className="mb-[14px]">
            <Eyebrow>The Lab / Live Log</Eyebrow>
          </div>
          <h2 className="m-0 font-display text-[42px] font-normal italic tracking-[-0.01em] text-ink">
            Experiments
          </h2>
        </div>
        <div className="flex items-center gap-[9px] border border-ink/15 bg-card px-[14px] py-[9px]">
          <span className="h-[7px] w-[7px] rounded-full bg-blue animate-blink" />
          <span className="font-mono text-[10px] tracking-[0.06em] text-soft-ink">
            updated by <span className="text-ink">{data.updatedBy}</span> on{" "}
            {data.updatedOn}
          </span>
        </div>
      </Reveal>

      {/* legend */}
      <Reveal className="mb-[24px] flex flex-wrap gap-[24px]">
        {LEGEND.map((l) => (
          <span
            key={l.status}
            className="inline-flex items-center gap-[8px] font-mono text-[10px] uppercase tracking-[0.1em] text-soft-ink"
          >
            <StatusDot status={l.status} />
            {l.label}
          </span>
        ))}
      </Reveal>

      {/* log */}
      <Reveal className="border-t border-ink/15">
        {log.map((row) => {
          const dead = row.status === "abandoned";
          return (
            <div
              key={row.title}
              className="grid grid-cols-[18px_1fr_auto] items-center gap-[20px] border-b border-ink/10 px-[8px] py-[20px] md:grid-cols-[18px_1.5fr_1.4fr_110px]"
            >
              <StatusDot status={row.status} />
              <span
                className={`font-display text-[20px] ${
                  dead ? "text-mute line-through" : "text-ink"
                }`}
              >
                {row.title}
              </span>
              <span
                className={`hidden font-mono text-[11px] md:block ${
                  dead ? "text-mute" : "text-soft-ink"
                }`}
              >
                {row.detail}
              </span>
              <span
                className={`text-right font-mono text-[10px] uppercase tracking-[0.12em] ${statusColor(
                  row.status,
                )}`}
              >
                {row.status}
              </span>
            </div>
          );
        })}
      </Reveal>
    </Shell>
  );
}
