export interface Project {
  id: string;
  title: string;
  category: 'Automation' | 'Data Analytics' | 'Machine Learning' | 'Database' | 'All';
  type: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  impact: string;
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

export interface Skill {
  name: string;
  level: number;
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
