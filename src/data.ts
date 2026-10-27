import { Project, Experience, SkillGroup, Stat, Degree, Certificate, SpecialCourse } from './types';

const UNIVERSITY = 'A school within a private university, Bangkok';

/**
 * Only facts that can be checked against the rest of the page.
 * TODO(sai): if you can publish a real operational number — enquiries handled,
 * clips tracked, dashboard users — it belongs here and beats any of these.
 */
export const statsData: Stat[] = [
  { id: 'systems', count: 3, suffix: '', label: 'Systems Shipped This Year' },
  { id: 'since', count: 2, suffix: '+', label: 'Years Working In Data' },
  { id: 'roles', count: 5, suffix: '', label: 'Roles In Engineering & Data' },
  { id: 'degrees', count: 2, suffix: '', label: 'Engineering Degrees' }
];

export const skillGroupsData: SkillGroup[] = [
  {
    category: 'Data Science & Modelling',
    skills: [
      { name: 'Python', level: 92, tier: 'Core' },
      { name: 'pandas / NumPy', level: 92, tier: 'Core' },
      { name: 'SQL', level: 92, tier: 'Core' },
      { name: 'Marketing Mix Modelling', level: 92, tier: 'Core' },
      { name: 'scikit-learn', level: 68, tier: 'Working' },
      { name: 'Time Series (ARIMA, SARIMA)', level: 68, tier: 'Working' }
    ]
  },
  {
    category: 'Retrieval & Language Models',
    skills: [
      { name: 'Retrieval-Augmented Generation', level: 92, tier: 'Core' },
      { name: 'Embeddings & Vector Search', level: 92, tier: 'Core' },
      { name: 'Prompt & Response Design', level: 92, tier: 'Core' },
      { name: 'Grounding & Source Attribution', level: 68, tier: 'Working' },
      { name: 'Retrieval Evaluation', level: 68, tier: 'Working' }
    ]
  },
  {
    category: 'Products & Interfaces',
    skills: [
      { name: 'Power BI / DAX', level: 92, tier: 'Core' },
      { name: 'Web Applications', level: 92, tier: 'Core' },
      { name: 'React / TypeScript', level: 68, tier: 'Working' },
      { name: 'ETL & Pipeline Maintenance', level: 68, tier: 'Working' },
      { name: 'Matplotlib / Seaborn', level: 68, tier: 'Working' },
      { name: 'Git / GitHub', level: 68, tier: 'Working' }
    ]
  },
  {
    category: 'Delivery',
    skills: [
      { name: 'Product Requirement Documents', level: 92, tier: 'Core' },
      { name: 'Stakeholder Reporting', level: 92, tier: 'Core' },
      { name: 'Primavera P6 Scheduling', level: 68, tier: 'Working' },
      { name: 'Critical Path Analysis', level: 68, tier: 'Working' },
      { name: 'Revit / Dynamo', level: 30, tier: 'Exposure' }
    ]
  }
];

/**
 * Current client work is confidential, so each project is written as problem,
 * constraint and decision rather than a gallery. No invented metrics: where a
 * number is not known or not publishable, the row is left out.
 */
export const projectsData: Project[] = [
  {
    id: 'enquiry-assistant',
    title: 'Enquiry Assistant for Prospective Students',
    category: 'AI Systems',
    type: 'AI Systems',
    client: UNIVERSITY,
    confidential: true,
    problem:
      'Prospective students and their parents ask the same small set of high-stakes questions — scholarships, fees, entry requirements — and ask them at night, at weekends, and in the weeks when the admissions team is busiest.',
    description:
      'A retrieval-based assistant that answers enquiries from the school’s own documents and moves the conversation towards the right landing page and call to action.',
    longDescription:
      'The obvious framing is deflection: answer common questions so staff do not have to. That framing produces a bad product. Someone asking what a scholarship covers is deciding whether to apply, so the goal is not to end the conversation but to resolve the uncertainty and hand them the next step. Every answer is built to land somewhere — the relevant page, the form, the person to talk to.\n\nBecause the subject is fees and scholarships, a confidently wrong answer is worse than no answer. Responses are grounded in the school’s published material rather than generated from the model’s own knowledge, so the assistant can only say what the documents say, and questions outside that material are routed to a human instead of guessed at.\n\nThe content moves. Fees change, deadlines pass, scholarship rounds open and close. An assistant that is accurate at launch and stale by the next intake is a liability, so keeping the source material current is part of the system rather than an afterthought.',
    tags: ['Python', 'LLM', 'Embeddings', 'Vector Search', 'RAG'],
    metrics: [
      { label: 'Domain', value: 'Admissions & Scholarships' },
      { label: 'Answer Grounding', value: 'School’s Own Documents' },
      { label: 'Out Of Scope', value: 'Routed To A Person' }
    ],
    impact:
      'Routine enquiries get answered the moment they are asked, and the people asking them arrive at the right page instead of a dead end.',
    technicalSpecs: [
      { label: 'Approach', value: 'Retrieval-Augmented Generation' },
      { label: 'Retrieval', value: 'Embeddings & Vector Search' },
      { label: 'Guardrail', value: 'Grounded In Source Documents' },
      { label: 'Fallback', value: 'Human Handoff' }
    ],
    diagrams: [
      { title: '01. Question', url: '', caption: 'Fees, scholarships, entry requirements — asked at any hour.' },
      { title: '02. Retrieval', url: '', caption: 'Matched against the school’s own published material.' },
      { title: '03. Grounded Answer', url: '', caption: 'Only what those documents support. No invented figures.' },
      { title: '04. Next Step', url: '', caption: 'The relevant page and call to action, not a dead end.' }
    ]
  },
  {
    id: 'production-tracker',
    title: 'Production Tracker for Educational Video',
    category: 'Internal Tools',
    type: 'Internal Tools',
    client: 'Children’s educational video production',
    confidential: true,
    problem:
      'A pipeline of children’s educational clips moves through scripting, shooting, editing and review. Stakeholders kept asking two questions nobody could answer quickly: where is this clip, and how far along are we overall.',
    description:
      'A tracker showing which clips sit at which stage, and what proportion of the work is actually finished from a stakeholder’s point of view.',
    longDescription:
      'The hard part was not the board of clips and stages — it was defining the percentage. Counting finished clips over total clips is easy and misleading: a project where every clip is scripted but none are edited is not half done. The figure only means something if stages are weighted by the effort they actually represent, so that the number moves when real work happens and not when a clip changes column.\n\nThe audience shaped the interface. Stakeholders are not the production team, and they do not want a task board — they want to know whether the deadline holds. So the view leads with overall progress and stage distribution, and the per-clip detail sits underneath for when someone asks about a specific one.',
    tags: ['Web Application', 'Progress Modelling', 'Stakeholder Reporting'],
    metrics: [
      { label: 'Tracks', value: 'Clips Through Stages' },
      { label: 'Progress Measure', value: 'Effort-Weighted' },
      { label: 'Audience', value: 'Stakeholders' }
    ],
    impact:
      'Status questions stopped going through the production lead, and progress reporting became something stakeholders could check themselves rather than request.',
    technicalSpecs: [
      { label: 'Interface', value: 'Web Application' },
      { label: 'Core Logic', value: 'Effort-Weighted Completion' },
      { label: 'Primary View', value: 'Overall Progress First' },
      { label: 'Secondary View', value: 'Per-Clip Detail' }
    ]
  },
  {
    id: 'content-calendar',
    title: 'Content Calendar for Marketing Operations',
    category: 'Internal Tools',
    type: 'Internal Tools',
    client: UNIVERSITY,
    confidential: true,
    problem:
      'The school’s content planning lived across spreadsheets and chat threads, so what was scheduled, what was being worked on and what had already gone out were three different answers depending on who you asked.',
    description:
      'A planning and tracking application holding the school’s content operation in one place — what is scheduled, what is in progress, what has shipped.',
    longDescription:
      'This is an unglamorous category of software that quietly decides whether a marketing team functions. The value is not in any single feature but in there being exactly one place to look, which means the tool has to be easier to update than the spreadsheet it replaces or people simply keep the spreadsheet.\n\nBuilt as part of the same marketing operation as the enquiry assistant, so the planning side and the public-facing side share an understanding of what the school is actually promoting at any point in the intake cycle.',
    tags: ['Web Application', 'Scheduling', 'Marketing Operations'],
    metrics: [
      { label: 'Replaces', value: 'Spreadsheets & Chat' },
      { label: 'Covers', value: 'Planned, Active, Published' }
    ],
    impact:
      'Content planning moved out of scattered spreadsheets into a single view the team and its stakeholders both work from.',
    technicalSpecs: [
      { label: 'Interface', value: 'Web Application' },
      { label: 'Scope', value: 'Plan, Track, Publish' },
      { label: 'Shares Context With', value: 'Enquiry Assistant' }
    ]
  },
  {
    id: 'mmm',
    title: 'Marketing Mix Modelling',
    category: 'Analytics',
    type: 'Analytics',
    client: 'marketingApe Co. Ltd.',
    problem:
      'Clients spending across several channels could see what each channel reported about itself, which is not the same as knowing what each channel contributed.',
    description:
      'End-to-end marketing mix modelling — collection, cleaning and ETL across channels — to quantify channel contribution and inform where the budget went.',
    longDescription:
      'Most of the work was upstream of the model. Channel data arrives in different shapes, on different calendars, with different definitions of a conversion, and a mix model is only as trustworthy as the reconciliation underneath it. Getting that layer right was the majority of the effort and the part that determined whether the results held up.\n\nI also wrote the product requirement documents for the client-facing analytics tools built on top of this work, which meant specifying what the model could and could not support before anyone designed a dashboard around it.',
    tags: ['Python', 'MMM', 'ETL', 'SQL', 'Product Requirements'],
    metrics: [
      { label: 'Scope', value: 'Collection To Model' },
      { label: 'Also Delivered', value: 'PRDs For Client Tools' }
    ],
    impact:
      'Channel contribution became something clients could allocate against, rather than a set of platform-reported numbers each claiming the same conversion.',
    technicalSpecs: [
      { label: 'Method', value: 'Marketing Mix Modelling' },
      { label: 'Pipeline', value: 'Collection, Cleaning, ETL' },
      { label: 'Hardest Layer', value: 'Cross-Channel Reconciliation' }
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: 'university',
    period: '2026 — Present',
    role: 'Data Scientist',
    company: UNIVERSITY,
    location: 'Bangkok, Thailand',
    description: [
      'Built a retrieval-based enquiry assistant answering prospective students’ questions on scholarships, fees and admissions from the school’s own material, routing them to the relevant page and call to action.',
      'Built a content calendar application for the school’s marketing operation, replacing planning spread across spreadsheets and chat.',
      'Built a stakeholder-facing production tracker for a children’s educational video pipeline, reporting stage and effort-weighted completion.'
    ],
    skillsUsed: ['Python', 'LLM & RAG', 'Vector Search', 'React', 'SQL']
  },
  {
    id: 'shine',
    period: 'Dec 2024 — May 2026',
    role: 'Data Analyst',
    company: 'Shine Co. Ltd.',
    location: 'Bangkok, Thailand',
    type: 'Part-time',
    description: [
      'Analysed historical and live sales, inventory and pricing data to find market trends and turn them into decisions the commercial team could act on.',
      'Built and deployed automated Power BI dashboards for regional dealerships so they could track their own KPIs instead of waiting on a report.',
      'Turned raw multi-source data into structured reporting, and helped maintain the pipelines and dashboard refreshes behind it.'
    ],
    skillsUsed: ['Power BI', 'SQL', 'Python', 'MS Excel']
  },
  {
    id: 'marketingape',
    period: 'Mar 2024 — Nov 2024',
    role: 'Data Analyst',
    company: 'marketingApe Co. Ltd.',
    location: 'Bangkok, Thailand',
    description: [
      'Ran marketing mix modelling projects end to end, from collection and cleaning through ETL across channels, to quantify what each channel was actually contributing.',
      'Worked with the development team on analytics tools that let clients watch performance themselves.',
      'Wrote the product requirement documents those tools were built from.'
    ],
    skillsUsed: ['Marketing Mix Modelling', 'Python', 'ETL', 'SQL', 'Product Design']
  },
  {
    id: 'seikitokyu',
    period: 'Nov 2022 — Mar 2023',
    role: 'Civil Engineer',
    company: 'Seikitokyu Kogyo Co. Ltd.',
    location: 'Iwakuni, Japan',
    description: [
      'Developed and monitored detailed schedules using Primavera P6, including WBS creation, critical path analysis, and progress tracking.',
      'Prepared and submitted technical submittals including material data sheets, shop drawings, and method statements.',
      'Supported document control processes by organizing and maintaining project records and drawings.',
      'Drafted and coordinated RFIs, responding to senior engineer comments and resolving technical queries to minimize construction delays.'
    ],
    skillsUsed: ['Primavera P6', 'AutoCAD', 'CPM Analysis', 'Technical Submittals', 'Document Control']
  },
  {
    id: 'shwetaung',
    period: 'Nov 2020 — Mar 2021',
    role: 'Civil Engineer',
    company: 'Shwe Taung E&C Co. Ltd.',
    location: 'Yangon, Myanmar',
    description: [
      'Assisted senior engineers in overseeing daily construction activities, ensuring work complied with drawings, specifications, and quality standards.',
      'Monitored the job site to track progress of ongoing activities and contributed to daily toolbox and safety meetings.',
      'Maintained daily site logs, tracked material deliveries, and prepared daily and weekly progress reports.',
      'Facilitated communication between subcontractors, design teams, and on-site personnel to resolve technical issues.'
    ],
    skillsUsed: ['Site Operations', 'Technical Compliance', 'Progress Tracking', 'Subcontractor Coordination']
  }
];

export const educationData: Degree[] = [
  {
    id: 'msc',
    degree: 'Master of Engineering in Construction, Engineering and Infrastructure Management',
    institution: 'Asian Institute of Technology',
    period: '2017 — 2019',
    location: 'Pathum Thani, Thailand',
    details: [
      'Thesis Title: "Characteristics of organizational culture in contractor companies affecting project performance and management styles."',
      'Thesis Link: https://aitir.ait.ac.th/ait-thesis/detail.php?q=B07730'
    ]
  },
  {
    id: 'be',
    degree: 'Bachelor of Engineering in Civil and Infrastructure Engineering',
    institution: 'Asian Institute of Technology',
    period: '2012 — 2016',
    location: 'Pathum Thani, Thailand',
    details: ['Capstone Project: Engineering Behavior of Artificial Municipal Solid Waste']
  }
];

/**
 * TODO(sai): three further certifications were carried over from the generated
 * template and could not be verified — Autodesk Certified Professional (Revit
 * Structural), PMP & Primavera P6 Specialist, and Myanmar Engineering Council
 * Registered Assistant Engineer. Add any that are genuine.
 */
export const certificationData: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Google Advanced Data Analytics Professional',
    issuer: 'Google',
    year: '2024',
    details: 'Advanced statistical modeling, Python data structures, regression modeling, and machine learning models.'
  },
  {
    id: 'cert-3',
    title: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
    issuer: 'Microsoft',
    year: '2024',
    details: 'Transforming datasets, creating DAX models, and deploying automated corporate BI dashboards.'
  }
];

export const specialCourseData: SpecialCourse[] = [
  {
    id: 'coursera-ml',
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI & Stanford',
    year: '2025',
    link: 'https://coursera.org/share/b7ad5678531653af1a10bf8538f199f4',
    syllabus: [
      'Supervised Machine Learning: Linear Regression and Classification Models',
      'Advanced Learning Algorithms: Multi-class Neural Networks and Decision Trees',
      'Unsupervised Learning: K-means Clustering, Anomaly Detection, and Recommender Systems'
    ]
  },
  {
    id: 'coursera-ds',
    title: 'IBM Data Science',
    issuer: 'IBM (via Coursera)',
    year: '2023',
    link: 'https://coursera.org/share/85ed086c21c80ad95b247a28b7668d4a',
    syllabus: [
      'Data Science Tools, Methodology, and Python Project Execution',
      'Data Analysis with Pandas, NumPy, and Scientific Computing Libraries',
      'Data Visualization with Matplotlib, Seaborn, and Interactive Folium Maps',
      'Applied Machine Learning Algorithms and Model Evaluation Metrics'
    ]
  },
  {
    id: 'revit-bim',
    title: 'Revit Architecture BIM Modelling Essentials',
    issuer: 'Autodesk Authorized Training Program',
    year: '2026',
    isPdf: true,
    link: '/certificates/revit_certificate.pdf',
    syllabus: [
      'Parametric 3D structural, wall, structural schedules, and family design modules',
      'Generation of automatic quantity takeoff lists, schedules, and structural layout sheets'
    ]
  },
  {
    id: 'dynamo-bim',
    title: 'Automation BIM Essential (Dynamo)',
    issuer: 'Autodesk Authorized Training Program',
    year: '2026',
    isPdf: true,
    link: '/certificates/dynamo_certificate.pdf',
    syllabus: [
      'Visual programming paradigms: wire routing, custom nodes, and code block lists',
      'Automated parameter processing, mass file attribute editing, and Excel connectors'
    ]
  }
];
