/**
 * The shape of the enquiry assistant. Architecture only — no client content.
 * A genuine sequence, which is why the steps are numbered.
 */
const STEPS = [
  {
    n: 1,
    title: 'Question',
    body: 'Fees, scholarships, entry requirements — asked at any hour.',
  },
  {
    n: 2,
    title: 'Retrieval',
    body: 'Matched against the school’s own published material.',
  },
  {
    n: 3,
    title: 'Grounded answer',
    body: 'Only what those documents support. No invented figures.',
  },
  {
    n: 4,
    title: 'Next step',
    body: 'The relevant page and call to action, not a dead end.',
  },
];

export default function RagDiagram() {
  return (
    <figure className="mt-8">
      <div className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.n} className="bg-paper-sunk p-4 sm:p-5">
            <div className="nums text-xs font-semibold text-data">{step.n}</div>
            <h4 className="mt-2 font-display text-sm font-semibold tracking-tight text-ink">
              {step.title}
            </h4>
            <p className="mt-1.5 font-body text-sm leading-relaxed text-slate">{step.body}</p>
          </div>
        ))}
      </div>

      <figcaption className="mt-3 max-w-[64ch] font-body text-sm leading-relaxed text-slate">
        A question the documents do not cover is handed to a person rather than
        answered from the model’s own knowledge.
      </figcaption>
    </figure>
  );
}
