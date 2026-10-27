export interface Project {
  id: string;
  title: string;
  category: 'AI Systems' | 'Internal Tools' | 'Analytics' | 'All';
  type: string;
  /** Named only as far as confidentiality allows. */
  client: string;
  /** True when the work is under NDA, so the UI can say so plainly. */
  confidential?: boolean;
  /** Why the work existed. */
  problem: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  impact: string;
  images?: string[];
  technicalSpecs?: { label: string; value: string }[];
  diagrams?: { title: string; url: string; caption: string }[];
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  skillsUsed: string[];
  type?: string;
}

export type Tier = 'Core' | 'Working' | 'Exposure';

export interface Skill {
  name: string;
  /** Bar width only. The tier is what gets shown — see Skills.tsx. */
  level: number;
  tier: Tier;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Stat {
  id: string;
  count: number;
  suffix: string;
  label: string;
}

export interface Degree {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  details: string;
}

export interface SpecialCourse {
  id: string;
  title: string;
  issuer: string;
  year: string;
  link?: string;
  isPdf?: boolean;
  syllabus?: string[];
}
