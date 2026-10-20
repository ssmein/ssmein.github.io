import { profile } from '../content';

export default function Footer() {
  return (
    <footer className="border-t border-rule py-8">
      <div className="flex flex-col gap-1.5 font-body text-sm text-slate sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          {profile.name}, {profile.location}
        </p>
        <p>Built and maintained by hand, 2026</p>
      </div>
    </footer>
  );
}
