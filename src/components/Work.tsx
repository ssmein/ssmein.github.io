import { projects } from '../content';
import RagDiagram from './RagDiagram';
import Section from './Section';

export default function Work() {
  return (
    <Section
      id="work"
      title="Work"
      lede="Most of this is client work I cannot show, so it is written as the problem, the constraint and the decision rather than a gallery. The reasoning is the part worth reading anyway."
    >
      <div className="divide-y divide-rule">
        {projects.map((project, index) => (
          <article key={project.id} className={index === 0 ? 'pb-14' : 'py-14 last:pb-0'}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-display text-xs font-medium text-data">{project.discipline}</p>
              <p className="font-body text-xs text-slate">{project.client}</p>
              {project.confidential ? (
                <p className="border border-rule px-1.5 py-0.5 font-body text-[11px] leading-none text-slate">
                  Under NDA
                </p>
              ) : null}
            </div>

            <h3 className="mt-2.5 max-w-[26ch] font-display text-[clamp(1.5rem,3.6vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
              {project.title}
            </h3>

            <p className="mt-4 max-w-[62ch] font-body text-lg leading-relaxed text-ink">
              {project.summary}
            </p>

            {/* The problem gets its own weight: it is what makes the rest legible. */}
            <p className="mt-6 max-w-[64ch] border-l-2 border-rule pl-4 font-body leading-relaxed text-slate">
              {project.problem}
            </p>

            {project.diagram === 'rag' ? <RagDiagram /> : null}

            <div className="mt-6 space-y-4">
              {project.detail.map((paragraph) => (
                <p key={paragraph} className="max-w-[68ch] font-body leading-relaxed text-slate">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-8 border-t border-rule">
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
          </article>
        ))}
      </div>
    </Section>
  );
}
