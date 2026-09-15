"use client";

import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmailCopyPill({
  email,
  copyLabel,
  copiedLabel,
  sendLabel,
}: {
  email: string;
  copyLabel: string;
  copiedLabel: string;
  sendLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="flex max-w-md items-center gap-2 rounded-full border border-border/60 bg-base-elevated/60 py-2 pr-2 pl-5">
      <span className="flex-1 truncate text-left text-base text-fg-muted">
        {email}
      </span>
      <Button
        size="icon"
        className="rounded-full bg-tone-a-accent text-fg hover:bg-tone-a-accent/80"
        aria-label={sendLabel}
        nativeButton={false}
        render={<a href={`mailto:${email}`} />}
      >
        <Send className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer rounded-full"
        aria-label={copied ? copiedLabel : copyLabel}
        onClick={handleCopy}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}
