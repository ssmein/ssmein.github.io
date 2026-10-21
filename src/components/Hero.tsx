import { headline, profile, projects } from '../content';

export default function Hero() {
  return (
    <section id="top" className="pt-14 pb-16 sm:pt-24 sm:pb-24">
      <h1 className="font-display text-[clamp(2.6rem,10vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-ink">
        Sai Soum
        <br />
        Mein
      </h1>

      <div className="mt-8 border-t border-ink pt-5">
        <p className="font-display text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">
          {profile.role} in {profile.location}.
        </p>
        <p className="mt-3 max-w-[58ch] font-body text-lg leading-relaxed text-slate sm:text-xl">
          {headline}
        </p>
      </div>

      {/* The index doubles as the visual anchor now the chart is gone. */}
      <nav aria-label="Selected work" className="mt-14 sm:mt-16">
        <h2 className="font-display text-sm font-semibold tracking-tight text-ink">
          Selected work
        </h2>

        <ul className="mt-4 border-t border-rule">
          {projects.map((project) => (
            <li key={project.id}>
              <a
                href={`#${project.id}`}
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4 transition-colors hover:border-ink"
              >
                <span className="font-display text-lg font-medium tracking-[-0.015em] text-ink sm:text-xl">
                  {project.title}
                </span>
                <span className="font-display text-xs font-medium text-data transition-colors group-hover:text-ink">
                  {project.discipline}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
