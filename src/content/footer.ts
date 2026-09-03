export type FooterLink = { num: string; name: string; href: string };
export type SocialLink = { name: string; href: string };

/** Copy verbatim from Landing.dc.html's footIndex / footSocial data. */
export const footerIndex: FooterLink[] = [
  { num: "01", name: "Selected work", href: "/work" },
  { num: "02", name: "Labs", href: "/labs" },
  { num: "03", name: "Notes", href: "/#notes" },
  { num: "04", name: "My story", href: "/#story" },
];

export const footerSocial: SocialLink[] = [
  { name: "X", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "Read.cv", href: "#" },
  { name: "Instagram", href: "#" },
];
