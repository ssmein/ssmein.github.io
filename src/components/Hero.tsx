import { headline, profile } from '../content';
import CareerPlot from './CareerPlot';

export default function Hero() {
  return (
    <section id="top" className="pt-14 pb-16 sm:pt-20 sm:pb-20">
      <h1 className="font-display text-[clamp(2.4rem,8.5vw,5.25rem)] font-bold leading-[0.95] tracking-[-0.035em] text-ink">
        {profile.name}
      </h1>

      <p className="mt-5 max-w-[34ch] font-display text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">
        {profile.role} in {profile.location}.
      </p>

      <p className="mt-3 max-w-[56ch] text-balance font-body text-lg leading-relaxed text-slate sm:text-xl">
        {headline}
      </p>

      <CareerPlot />
    </section>
  );
}
