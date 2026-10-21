import { roles } from '../content';
import Section from './Section';

export default function Path() {
  return (
    <Section
      id="path"
      title="Path"
      lede="Data work since 2024, engineering before that. The order matters more than it looks: the questions I ask of a dataset come from having had to answer them on a site, to someone who needed the answer that morning."
    >
      {/* The station line everything hangs off. */}
      <ol className="relative border-l border-rule pl-6 sm:pl-8">
        {roles.map((role) => (
          <li key={role.id} className="relative pb-12 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[calc(1.5rem+3.5px)] top-2 h-1.5 w-1.5 rounded-full sm:-left-[calc(2rem+3.5px)] ${
                role.track === 'data' ? 'bg-data' : 'bg-site'
              }`}
            />

            <p className="nums text-xs font-medium text-slate">{role.period}</p>

            <h3 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">
              {role.role}
            </h3>

            <p className="mt-0.5 font-body text-base text-slate">
              {role.company}, {role.location}
            </p>

            <ul className="mt-4 max-w-[66ch] space-y-2.5">
              {role.work.map((item) => (
                <li
                  key={item}
                  className="font-body leading-relaxed text-ink before:mr-2.5 before:text-slate before:content-['—']"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-4 font-body text-sm text-slate">{role.tools.join(', ')}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
