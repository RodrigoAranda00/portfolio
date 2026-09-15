"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useHashNavClick } from "@/hooks/useHashNavClick";
import { cn } from "@/lib/utils";

export function NavLinks({
  items,
}: {
  items: { href: string; id: string; label: string }[];
}) {
  const pathname = usePathname();
  const handleClick = useHashNavClick();
  const [intersectingIds, setIntersectingIds] = useState<Set<string>>(
    () => new Set(),
  );

  const routeMatch = items.find(
    (item) => pathname === `/${item.id}` || pathname.startsWith(`/${item.id}/`),
  );
  const scrollActiveId =
    items.find((item) => intersectingIds.has(item.id))?.id ?? null;
  const activeId = routeMatch ? routeMatch.id : scrollActiveId;

  useEffect(() => {
    if (routeMatch) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        setIntersectingIds((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              next.add(entry.target.id);
            } else {
              next.delete(entry.target.id);
            }
          }
          return next;
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items, routeMatch]);

  return (
    <nav className="hidden items-center justify-center gap-6 md:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={(event) => handleClick(event, item.id)}
          className={cn(
            "text-sm transition-colors",
            item.id === activeId
              ? "text-tone-a-accent drop-shadow-[0_0_6px_var(--color-maroon-glow)]"
              : "text-fg-muted hover:text-fg",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
