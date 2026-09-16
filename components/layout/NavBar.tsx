import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLinks } from "@/components/layout/NavLinks";
import { NavLogo } from "@/components/layout/NavLogo";

const NAV_ITEMS = [
  { href: "/#experience", key: "experience", id: "experience" },
  { href: "/#projects", key: "projects", id: "projects" },
  { href: "/#education", key: "education", id: "education" },
  { href: "/#beyond-work", key: "beyondWork", id: "beyond-work" },
] as const;

export async function NavBar() {
  const t = await getTranslations("nav");
  const items = NAV_ITEMS.map((item) => ({
    href: item.href,
    id: item.id,
    label: t(item.key),
  }));

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-sm"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
        <NavLogo />

        <NavLinks items={items} />

        <div className="col-start-3 flex items-center justify-end gap-3 justify-self-end">
          <LanguageSwitcher />

          <MobileNav items={items} />
        </div>
      </div>
    </header>
  );
}
