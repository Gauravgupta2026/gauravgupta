import Image from "next/image";
type Drawing = "house" | "phone" | "flower" | "kart" | "cup";
export function InkDrawing({ kind, className = "" }: { kind: Drawing; className?: string }) {
  if (kind === "house" || kind === "phone") return <Image className={className} src={`/reference-dwija/${kind}.png`} width={kind === "house" ? 320 : 200} height={kind === "house" ? 241 : 190} alt={kind === "house" ? "A little house in a garden" : "An ink drawing of a rotary telephone"} unoptimized />;
  return <svg className={className} viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "cup" ? <><path d="M44 65h91l-8 49q-35 18-72-1Z M137 69c34-10 36 42-4 36 M36 124q65 18 113-1 M70 52c-20-19 19-26 1-45 M100 49c-20-18 15-25 3-41" /><path d="M49 70q40 7 80 0 M54 117q30 16 72 0" /></> : kind === "kart" ? <><path d="m23 95 11-31 43-9 31 22 45 1 16 28H29 M70 57l10-22 29 3 19 33 M24 104h151 M83 58l28 10 M139 74l12-29 18 5" /><circle cx="49" cy="109" r="18" /><circle cx="146" cy="109" r="18" /><circle cx="49" cy="109" r="8" /><circle cx="146" cy="109" r="8" /><path d="M35 67h20M163 56l9 11M89 43l16 2" /></> : <><path d="M97 130q12-44 4-78 M99 102q-34 0-45-24 41-2 45 24 M100 117q29-3 39-28-34 0-39 28" /><path d="M100 54c-31 17-48-6-28-23-6-30 23-33 31-12 28-15 44 7 22 24 17 25-10 42-25 11Z" /><circle cx="100" cy="39" r="9" /><path d="M45 135q55 10 112-1" /></>}
  </svg>;
}
