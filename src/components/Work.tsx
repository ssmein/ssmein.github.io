import { projects } from '../content';
import Section from './Section';

export default function Work() {
  return (
    <Section
      id="work"
      title="Work"
      lede="Four pieces of work, from modelling through to the databases and dashboards built on top of it."
    >
      <div className="divide-y divide-rule">
        {projects.map((project, index) => (
          <article key={project.id} className={index === 0 ? 'pb-12' : 'py-12 last:pb-0'}>
            <p className="font-display text-xs font-medium text-data">{project.discipline}</p>

            <h3 className="mt-2 max-w-[28ch] font-display text-[clamp(1.5rem,3.6vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
              {project.title}
            </h3>

            <p className="mt-4 max-w-[62ch] font-body text-lg leading-relaxed text-ink">
              {project.summary}
            </p>

            <p className="mt-4 max-w-[68ch] font-body leading-relaxed text-slate">
              {project.detail}
            </p>

            {/* Figures: tabular, aligned down a column, no cards. */}
            <dl className="mt-7 border-t border-rule">
              {project.figures.map((figure) => (
                <div
                  key={figure.label}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-2.5"
                >
                  <dt className="font-body text-sm text-slate">{figure.label}</dt>
                  <dd className="nums text-right text-sm font-medium text-ink">{figure.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 max-w-[64ch] border-l-2 border-data pl-4 font-body leading-relaxed text-ink">
              {project.outcome}
            </p>

            <p className="mt-6 font-body text-sm text-slate">{project.stack.join(', ')}</p>

            {project.images?.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {project.images.map((src, imageIndex) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title}, model view ${imageIndex + 1}`}
                    width={1400}
                    height={764}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full border border-rule bg-paper-sunk"
                  />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
