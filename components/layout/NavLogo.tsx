"use client";

import type { MouseEvent } from "react";
import { Link, usePathname } from "@/i18n/navigation";

export function NavLogo() {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="justify-self-start font-display text-lg font-bold text-fg"
    >
      RodrigoAranda<span className="text-tone-a-accent">.dev</span>
    </Link>
  );
}
