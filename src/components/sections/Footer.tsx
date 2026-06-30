import { Shell } from "@/components/Shell";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-mono text-[12px] text-ink no-underline transition-colors duration-300 hover:text-blue"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <Shell
      as="footer"
      className="grid grid-cols-2 gap-x-[24px] gap-y-[34px] pb-[90px] pt-[70px] md:grid-cols-[1fr_auto_auto] md:gap-[60px]"
    >
      <div>
        <div className="mb-[12px] font-display text-[20px] text-ink">
          Gaurav Gupta
        </div>
        <div className="font-mono text-[11px] text-blue">c. 2026</div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="mb-[4px] font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
          General
        </div>
        <FooterLink href="#projects">Projects</FooterLink>
        <FooterLink href="#work">About</FooterLink>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="mb-[4px] font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
          Links
        </div>
        <FooterLink href="#">Socials</FooterLink>
        <FooterLink href="mailto:hello@example.com">Email</FooterLink>
      </div>
    </Shell>
  );
}
