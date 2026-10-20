import { profile } from '../content';
import Section from './Section';

const ELSEWHERE = [
  { label: 'LinkedIn', value: 'linkedin.com/in/saisoummein', href: profile.linkedin },
  { label: 'GitHub', value: 'github.com/ssmein', href: profile.github },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      lede="Open to analytics and construction technology work. Email is the fastest way to reach me."
    >
      <a
        href={`mailto:${profile.email}`}
        className="inline-block font-display text-[clamp(1.5rem,5vw,2.75rem)] font-semibold tracking-[-0.025em] text-ink underline decoration-rule decoration-2 underline-offset-[6px] transition-colors hover:text-data hover:decoration-data"
      >
        {profile.email}
      </a>

      <dl className="mt-10 max-w-md border-t border-rule">
        {ELSEWHERE.map((item) => (
          <div
            key={item.label}
            className="flex items-baseline justify-between gap-6 border-b border-rule py-2.5"
          >
            <dt className="font-body text-sm text-slate">{item.label}</dt>
            <dd>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-body text-[15px] text-ink transition-colors hover:text-data"
              >
                {item.value}
              </a>
            </dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-6 border-b border-rule py-2.5">
          <dt className="font-body text-sm text-slate">Based in</dt>
          <dd className="font-body text-[15px] text-ink">{profile.location}</dd>
        </div>
      </dl>
    </Section>
  );
}
