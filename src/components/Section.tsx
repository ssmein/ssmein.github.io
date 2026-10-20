import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  lede?: string;
  children: ReactNode;
}

export default function Section({ id, title, lede, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-rule py-14 sm:py-20">
      <div className="sm:grid sm:grid-cols-[8rem_1fr] sm:gap-10">
        <h2 className="font-display text-sm font-semibold tracking-tight text-ink sm:sticky sm:top-24 sm:self-start">
          {title}
        </h2>

        <div className="mt-6 sm:mt-0">
          {lede ? (
            <p className="mb-10 max-w-[64ch] font-body text-lg leading-relaxed text-slate">
              {lede}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
