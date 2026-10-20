import { profile } from '../content';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#path', label: 'Path' },
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#contact', label: 'Contact' },
];

export default function Masthead() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4 px-5 py-4 sm:px-8">
        {/* The name is the h1 immediately below on mobile, so it is redundant there. */}
        <a
          href="#top"
          className="hidden font-display text-sm font-semibold tracking-tight text-ink transition-colors hover:text-data sm:block"
        >
          {profile.name}
        </a>

        <nav aria-label="Sections" className="w-full sm:w-auto">
          <ul className="flex items-baseline justify-between gap-5 sm:justify-end sm:gap-7">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-display text-[13px] text-slate transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
