import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { contact } from "@/lib/data";

const ports = [
  { label: "GitHub", value: contact.githubHandle, href: contact.github },
  { label: "LinkedIn", value: contact.linkedinLabel, href: contact.linkedin },
  { label: "X", value: `@${contact.xHandle}`, href: contact.x },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section
      id="contact"
      data-sheet="03"
      className="mx-auto max-w-frame scroll-mt-6 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeader no="03" label="Sign-off" title="Reach me" />

      <Reveal className="mt-8 grid gap-px bg-seam sm:grid-cols-2">
        <div className="bg-bg p-6 sm:p-8">
          <div className="label">Primary channel</div>
          <button
            type="button"
            onClick={copyEmail}
            className="group mt-3 flex w-full items-center justify-between gap-4 text-left"
          >
            <span className="readout break-all text-h3 text-ink transition-colors group-hover:text-amber">
              {contact.email}
            </span>
            <span className="label shrink-0 border border-seam-bright px-3 py-1.5 text-amber transition-colors group-hover:bg-amber-soft">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
          <p className="mt-4 max-w-prose text-data text-ink-dim">
            Apprentice in Zurich, open to frontend work and good problems. Mail lands fastest.
          </p>
        </div>

        <div className="bg-bg">
          {ports.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border-b border-seam px-6 py-5 transition-colors last:border-b-0 hover:bg-panel/50 sm:px-8"
            >
              <span className="label">{p.label}</span>
              <span className="readout flex items-center gap-3 text-data text-ink-dim transition-colors group-hover:text-amber">
                {p.value}
                <span aria-hidden="true">&rsaquo;</span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
