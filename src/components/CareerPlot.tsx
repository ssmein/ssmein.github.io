import { spans } from '../content';
import type { Track } from '../types';

const DOMAIN_START = 2012;
const DOMAIN_END = 2026.9;
/** Narrow screens show only the sparse ticks; the rest appear from `sm` up. */
const YEAR_TICKS: { year: number; dense?: boolean }[] = [
  { year: 2012 },
  { year: 2015, dense: true },
  { year: 2018 },
  { year: 2021, dense: true },
  { year: 2024, dense: true },
  { year: 2026 },
];

const pct = (year: number) => ((year - DOMAIN_START) / (DOMAIN_END - DOMAIN_START)) * 100;

const LANES: { track: Track; name: string; bar: string; text: string }[] = [
  { track: 'education', name: 'Study', bar: 'bg-ink/25', text: 'text-slate' },
  { track: 'site', name: 'Site', bar: 'bg-site', text: 'text-site' },
  { track: 'data', name: 'Data', bar: 'bg-data', text: 'text-data' },
];

export default function CareerPlot() {
  return (
    <figure className="mt-12 sm:mt-16">
      <div className="border-y border-rule py-6 sm:py-8">
        {LANES.map((lane, laneIndex) => {
          const laneSpans = spans.filter((s) => s.track === lane.track);

          return (
            <div
              key={lane.track}
              className="flex items-center gap-4 sm:gap-6 py-2.5 sm:py-3"
            >
              <div
                className={`nums w-12 sm:w-16 shrink-0 text-[11px] sm:text-xs font-medium tracking-wide ${lane.text}`}
              >
                {lane.name}
              </div>

              <div className="relative h-3 grow">
                {/* Baseline the spans sit on. */}
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-rule" />

                {laneSpans.map((span, spanIndex) => (
                  <div
                    key={span.id}
                    title={`${span.detail}, ${span.period}`}
                    className={`draw-track absolute top-1/2 h-2.5 min-w-[7px] -translate-y-1/2 rounded-[1px] ${lane.bar}`}
                    style={{
                      left: `${pct(span.start)}%`,
                      width: `${pct(span.end) - pct(span.start)}%`,
                      animationDelay: `${70 + laneIndex * 110 + spanIndex * 55}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Year axis */}
        <div className="flex items-start gap-4 sm:gap-6 pt-3">
          <div className="w-12 shrink-0 sm:w-16" />
          <div className="relative h-4 grow">
            {YEAR_TICKS.map((tick, tickIndex) => (
              <div
                key={tick.year}
                className={`absolute top-0 flex flex-col items-start ${
                  tick.dense ? 'hidden sm:flex' : 'flex'
                }`}
                style={{
                  left: `${pct(tick.year)}%`,
                  transform:
                    tickIndex === YEAR_TICKS.length - 1 ? 'translateX(-100%)' : undefined,
                }}
              >
                <div className="h-1.5 w-px bg-rule" />
                <div className="nums mt-1 text-[10px] text-slate sm:text-[11px]">{tick.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="mt-4 max-w-[62ch] font-body text-sm leading-relaxed text-slate">
        Two engineering degrees, a few years of it on site in Yangon and Iwakuni,
        then analytics and data science in Bangkok — which is where the work has
        been since 2024.
      </figcaption>

      {/* The same information, for screen readers and anyone the chart fails. */}
      <ul className="sr-only">
        {spans.map((span) => (
          <li key={span.id}>
            {span.label}, {span.detail}, {span.period}.
          </li>
        ))}
      </ul>
    </figure>
  );
}
