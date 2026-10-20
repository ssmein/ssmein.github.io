import { skillGroups } from '../content';
import Section from './Section';
import type { Tier } from '../types';

/* Weight carries the ranking; every tier stays above 4.5:1 on paper. */
const TIER_STYLE: Record<Tier, string> = {
  Core: 'text-ink font-semibold',
  Working: 'text-slate font-medium',
  Exposure: 'text-slate font-normal',
};

export default function Toolkit() {
  return (
    <Section
      id="toolkit"
      title="Toolkit"
      lede="Graded honestly. Core means I use it in production work, working means I am competent and reach for documentation, exposure means I have built with it but would not claim depth."
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:gap-x-14">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">
              {group.category}
            </h3>
            <p className="mt-1 font-body text-sm text-slate">{group.note}</p>

            <dl className="mt-4 border-t border-rule">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-2"
                >
                  <dt className="font-body text-[15px] text-ink">{skill.name}</dt>
                  <dd
                    className={`font-display shrink-0 text-xs font-medium ${TIER_STYLE[skill.tier]}`}
                  >
                    {skill.tier}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
