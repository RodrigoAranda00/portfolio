"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useHashNavClick } from "@/hooks/useHashNavClick";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { profile } from "@/lib/data/profile";

export function MobileNav({
  items,
}: {
  items: { href: string; id: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const handleClick = useHashNavClick();
  const t = useTranslations("nav");

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" aria-label={t("openMenu")} />}
        >
          <Menu />
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <SheetHeader>
            <SheetTitle>{profile.name}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
            {items.map((item) => (
              <SheetClose
                key={item.href}
                render={
                  <Link
                    href={item.href}
                    onClick={(event) => handleClick(event, item.id)}
                  />
                }
              >
                <span className="block rounded-md px-2 py-2 text-sm text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg">
                  {item.label}
                </span>
              </SheetClose>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 px-4 pb-4">
            <LanguageSwitcher />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
