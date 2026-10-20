import { intro } from '../content';
import Section from './Section';

export default function Now() {
  return (
    <Section id="now" title="Now">
      <div className="space-y-5">
        {intro.map((paragraph) => (
          <p key={paragraph} className="max-w-[66ch] font-body text-lg leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
