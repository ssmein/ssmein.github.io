import { certifications, courses, education } from '../content';
import Section from './Section';

export default function Credentials() {
  return (
    <Section id="credentials" title="Credentials">
      {/* Degrees */}
      <div className="space-y-8">
        {education.map((degree) => (
          <div key={degree.id}>
            <p className="nums text-xs font-medium text-slate">{degree.period}</p>
            <h3 className="mt-1.5 max-w-[46ch] font-display text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
              {degree.degree}
            </h3>
            <p className="mt-0.5 font-body text-base text-slate">
              {degree.institution}, {degree.location}
            </p>
            <ul className="mt-3 space-y-1.5">
              {degree.notes.map((note) => (
                <li key={note.text} className="max-w-[66ch] font-body text-[15px] leading-relaxed text-slate">
                  {note.href ? (
                    <a
                      href={note.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:text-data hover:decoration-data"
                    >
                      {note.text}
                    </a>
                  ) : (
                    note.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <h3 className="mt-14 font-display text-base font-semibold tracking-tight text-ink">
        Certifications
      </h3>
      <dl className="mt-4 border-t border-rule">
        {certifications.map((item) => (
          <div
            key={item.id}
            className="grid gap-x-6 gap-y-1 border-b border-rule py-3.5 sm:grid-cols-[1fr_auto]"
          >
            <div>
              <dt className="font-body text-[15px] font-semibold text-ink">{item.title}</dt>
              <dd className="mt-0.5 max-w-[60ch] font-body text-sm leading-relaxed text-slate">
                {item.issuer}. {item.detail}
              </dd>
            </div>
            <div className="nums text-sm text-slate sm:text-right">{item.year}</div>
          </div>
        ))}
      </dl>

      {/* Courses */}
      <h3 className="mt-14 font-display text-base font-semibold tracking-tight text-ink">
        Training
      </h3>
      <div className="mt-4 border-t border-rule">
        {courses.map((course) => (
          <details key={course.id} className="group border-b border-rule py-3.5">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
              <span className="flex items-baseline gap-2.5">
                <span
                  aria-hidden="true"
                  className="font-display shrink-0 text-sm leading-none text-data transition-transform group-open:rotate-45"
                >
                  +
                </span>
                <span>
                  <span className="font-body text-[15px] font-semibold text-ink">
                    {course.title}
                  </span>
                  <span className="ml-2 font-body text-sm text-slate">{course.issuer}</span>
                </span>
              </span>
              <span className="nums shrink-0 text-sm text-slate">{course.year}</span>
            </summary>

            {course.syllabus?.length ? (
              <ul className="mt-3 space-y-1.5 pl-[22px]">
                {course.syllabus.map((line) => (
                  <li
                    key={line}
                    className="max-w-[64ch] font-body text-[15px] leading-relaxed text-slate before:mr-2.5 before:text-slate before:content-['—']"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}

            {course.href ? (
              <a
                href={course.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block font-body text-sm text-data underline decoration-data/40 decoration-1 underline-offset-4 transition-colors hover:decoration-data"
              >
                View certificate
              </a>
            ) : null}
          </details>
        ))}
      </div>
    </Section>
  );
}
