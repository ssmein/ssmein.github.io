export type Track = 'education' | 'site' | 'data';

export interface Span {
  id: string;
  label: string;
  detail: string;
  track: Track;
  /** Written out, because rounding the decimals below misreports the dates. */
  period: string;
  /** Decimal years, e.g. Nov 2020 is 2020.83. */
  start: number;
  end: number;
}

export type Discipline = 'AI systems' | 'Internal tools' | 'Analytics';

export interface Project {
  id: string;
  title: string;
  discipline: Discipline;
  /** Named only as far as confidentiality allows. */
  client: string;
  /** One line on why the work existed. */
  problem: string;
  summary: string;
  /** The decisions worth reading, one paragraph each. */
  detail: string[];
  outcome: string;
  stack: string[];
  figures: { label: string; value: string }[];
  /** True when the work is under NDA, so the page can say so plainly. */
  confidential?: boolean;
  diagram?: 'rag';
  images?: string[];
}

export interface Role {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  track: Track;
  work: string[];
  tools: string[];
}

export type Tier = 'Core' | 'Working' | 'Exposure';

export interface SkillGroup {
  category: string;
  note: string;
  skills: { name: string; tier: Tier }[];
}

export interface Degree {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  notes: { text: string; href?: string }[];
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  year: string;
  detail: string;
  href?: string;
  syllabus?: string[];
}
