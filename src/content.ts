import type { Credential, Degree, Project, Role, SkillGroup, Span } from './types';

export const profile = {
  name: 'Sai Soum Mein',
  handle: 'saisoummein',
  role: 'Data scientist',
  location: 'Bangkok, Thailand',
  email: 'ssoummein@gmail.com',
  github: 'https://github.com/ssmein',
  linkedin: 'https://linkedin.com/in/saisoummein/',
};

/** The one claim the site makes. Everything below is evidence for it. */
export const headline =
  'I build the analysis and the product around it — retrieval systems, internal tools and the reporting that keeps them honest.';

export const intro = [
  'I am a data scientist in Bangkok. Most of my work ends up as something people actually open: a retrieval assistant that answers enquiries, a tracker a production team runs its week from, a model whose output changes where a budget goes.',
  'That range is deliberate. An analysis that stops at a notebook rarely changes anything, so I have learned the parts either side of it — getting the data into shape, and building the interface that puts the result in front of whoever needs to act on it.',
  'Before this I trained as a civil engineer and worked on sites in Yangon and Iwakuni. It is where I learned that most things go wrong because a record disagreed with reality, which turns out to be the same problem I work on now.',
];

/**
 * The career plot. Decimal years, so November 2020 is 2020.83.
 * TODO(sai): confirm the start date of the current role.
 */
export const spans: Span[] = [
  {
    id: 'be',
    label: 'BEng Civil',
    detail: 'Asian Institute of Technology',
    track: 'education',
    period: '2012 — 2016',
    start: 2012,
    end: 2016,
  },
  {
    id: 'me',
    label: 'MEng Construction Management',
    detail: 'Asian Institute of Technology',
    track: 'education',
    period: '2017 — 2019',
    start: 2017,
    end: 2019,
  },
  {
    id: 'shwetaung',
    label: 'Shwe Taung',
    detail: 'Civil engineer, Yangon',
    track: 'site',
    period: 'Nov 2020 — Mar 2021',
    start: 2020.83,
    end: 2021.17,
  },
  {
    id: 'seikitokyu',
    label: 'Seikitokyu Kogyo',
    detail: 'Civil engineer, Iwakuni',
    track: 'site',
    period: 'Nov 2022 — Mar 2023',
    start: 2022.83,
    end: 2023.17,
  },
  {
    id: 'marketingape',
    label: 'marketingApe',
    detail: 'Data analyst, Bangkok',
    track: 'data',
    period: 'Mar 2024 — Nov 2024',
    start: 2024.17,
    end: 2024.83,
  },
  {
    id: 'shine',
    label: 'Shine',
    detail: 'Data analyst, Bangkok',
    track: 'data',
    period: 'Dec 2024 — May 2026',
    start: 2024.92,
    end: 2026.33,
  },
  {
    id: 'university',
    label: 'University',
    detail: 'Data scientist, Bangkok',
    track: 'data',
    period: '2026 — present',
    start: 2026.4,
    end: 2026.9,
  },
];

const UNIVERSITY = 'A school within a private university, Bangkok';

/**
 * All current client work is confidential, so these are written at the level of
 * problem, constraint and decision rather than screenshots.
 *
 * TODO(sai): where a figure is genuinely known and you are allowed to publish
 * it, add it to `figures`. Do not estimate — an unverifiable number costs more
 * than a missing one.
 */
export const projects: Project[] = [
  {
    id: 'enquiry-assistant',
    title: 'Enquiry assistant for prospective students',
    discipline: 'AI systems',
    client: UNIVERSITY,
    confidential: true,
    diagram: 'rag',
    problem:
      'Prospective students and their parents ask the same small set of high-stakes questions — scholarships, fees, entry requirements — and ask them at night, at weekends, and in the weeks when the admissions team is busiest.',
    summary:
      'A retrieval-based assistant that answers enquiries from the school’s own documents and moves the conversation towards the right landing page and call to action.',
    detail: [
      'The obvious framing is deflection: answer common questions so staff do not have to. That framing produces a bad product. Someone asking what a scholarship covers is deciding whether to apply, so the goal is not to end the conversation but to resolve the uncertainty and hand them the next step. Every answer is built to land somewhere — the relevant page, the form, the person to talk to.',
      'Because the subject is fees and scholarships, a confidently wrong answer is worse than no answer. Responses are grounded in the school’s published material rather than generated from the model’s own knowledge, so the assistant can only say what the documents say, and questions outside that material are routed to a human instead of guessed at.',
      'The content moves. Fees change, deadlines pass, scholarship rounds open and close. An assistant that is accurate at launch and stale by the next intake is a liability, so keeping the source material current is part of the system rather than an afterthought.',
    ],
    outcome:
      'Routine enquiries get answered the moment they are asked, and the people asking them arrive at the right page instead of a dead end.',
    stack: ['Python', 'LLM', 'Embeddings', 'Vector search', 'Retrieval-augmented generation'],
    figures: [
      { label: 'Domain', value: 'Admissions and scholarships' },
      { label: 'Answer grounding', value: 'School’s own documents' },
      { label: 'Out-of-scope handling', value: 'Routed to a person' },
    ],
  },
  {
    id: 'production-tracker',
    title: 'Production tracker for educational video',
    discipline: 'Internal tools',
    client: 'Children’s educational video production',
    confidential: true,
    problem:
      'A pipeline of children’s educational clips moves through scripting, shooting, editing and review. Stakeholders kept asking two questions nobody could answer quickly: where is this clip, and how far along are we overall.',
    summary:
      'A tracker that shows which clips sit at which stage, and what proportion of the work is actually finished from a stakeholder’s point of view.',
    detail: [
      'The hard part was not the board of clips and stages — it was defining the percentage. Counting finished clips over total clips is easy and misleading: a project where every clip is scripted but none are edited is not half done. The figure only means something if stages are weighted by the effort they actually represent, so that the number moves when real work happens and not when a clip changes column.',
      'The audience shaped the interface. Stakeholders are not the production team, and they do not want a task board — they want to know whether the deadline holds. So the view leads with overall progress and stage distribution, and the per-clip detail sits underneath for when someone asks about a specific one.',
    ],
    outcome:
      'Status questions stopped going through the production lead, and progress reporting became something stakeholders could check themselves rather than request.',
    stack: ['Web application', 'Progress modelling', 'Stakeholder reporting'],
    figures: [
      { label: 'Tracks', value: 'Clips through production stages' },
      { label: 'Progress measure', value: 'Effort-weighted, not clip count' },
      { label: 'Audience', value: 'Stakeholders, not the production team' },
    ],
  },
  {
    id: 'content-calendar',
    title: 'Content calendar for marketing operations',
    discipline: 'Internal tools',
    client: UNIVERSITY,
    confidential: true,
    problem:
      'The school’s content planning lived across spreadsheets and chat threads, so what was scheduled, what was being worked on and what had already gone out were three different answers depending on who you asked.',
    summary:
      'A planning and tracking application that holds the school’s content operation in one place — what is scheduled, what is in progress, what has shipped.',
    detail: [
      'This is an unglamorous category of software that quietly decides whether a marketing team functions. The value is not in any single feature but in there being exactly one place to look, which means the tool has to be easier to update than the spreadsheet it replaces or people simply keep the spreadsheet.',
      'Built as part of the same marketing operation as the enquiry assistant, so the planning side and the public-facing side share an understanding of what the school is actually promoting at any point in the intake cycle.',
    ],
    outcome:
      'Content planning moved out of scattered spreadsheets into a single view the team and its stakeholders both work from.',
    stack: ['Web application', 'Scheduling', 'Marketing operations'],
    figures: [
      { label: 'Replaces', value: 'Spreadsheets and chat threads' },
      { label: 'Covers', value: 'Planned, in progress, published' },
    ],
  },
  {
    id: 'mmm',
    title: 'Marketing mix modelling',
    discipline: 'Analytics',
    client: 'marketingApe Co. Ltd.',
    problem:
      'Clients spending across several channels could see what each channel reported about itself, which is not the same as knowing what each channel contributed.',
    summary:
      'End-to-end marketing mix modelling — collection, cleaning and ETL across channels — to quantify channel contribution and inform where the budget went.',
    detail: [
      'Most of the work was upstream of the model. Channel data arrives in different shapes, on different calendars, with different definitions of a conversion, and a mix model is only as trustworthy as the reconciliation underneath it. Getting that layer right was the majority of the effort and the part that determined whether the results held up.',
      'I also wrote the product requirement documents for the client-facing analytics tools built on top of this work, which meant specifying what the model could and could not support before anyone designed a dashboard around it.',
    ],
    outcome:
      'Channel contribution became something clients could allocate against, rather than a set of platform-reported numbers that each claimed the same conversion.',
    stack: ['Python', 'Marketing mix modelling', 'ETL', 'SQL', 'Product requirements'],
    figures: [
      { label: 'Scope', value: 'Collection through to model' },
      { label: 'Also delivered', value: 'PRDs for client analytics tools' },
    ],
  },
];

export const roles: Role[] = [
  {
    id: 'university',
    period: '2026 — present',
    role: 'Data scientist',
    company: UNIVERSITY,
    location: 'Bangkok, Thailand',
    track: 'data',
    work: [
      'Built a retrieval-based enquiry assistant that answers prospective students’ questions on scholarships, fees and admissions from the school’s own material, and routes them to the relevant page and call to action.',
      'Built a content calendar application for the school’s marketing operation, replacing planning spread across spreadsheets and chat.',
      'Built a stakeholder-facing production tracker for a children’s educational video pipeline, reporting stage and effort-weighted completion.',
    ],
    tools: ['Python', 'LLM and RAG', 'Vector search', 'React', 'SQL'],
  },
  {
    id: 'shine',
    period: 'Dec 2024 — May 2026',
    role: 'Data analyst',
    company: 'Shine Co. Ltd.',
    location: 'Bangkok, Thailand',
    track: 'data',
    work: [
      'Analysed historical and live sales, inventory and pricing data to find market trends and turn them into decisions the commercial team could act on.',
      'Built and deployed automated Power BI dashboards for regional dealerships so they could track their own KPIs instead of waiting on a report.',
      'Turned raw multi-source data into structured reporting, and helped maintain the pipelines and dashboard refreshes behind it.',
    ],
    tools: ['Power BI', 'SQL', 'Python', 'Excel'],
  },
  {
    id: 'marketingape',
    period: 'Mar 2024 — Nov 2024',
    role: 'Data analyst',
    company: 'marketingApe Co. Ltd.',
    location: 'Bangkok, Thailand',
    track: 'data',
    work: [
      'Ran marketing mix modelling projects end to end, from collection and cleaning through ETL across channels, to quantify what each channel was actually contributing.',
      'Worked with the development team on analytics tools that let clients watch performance themselves.',
      'Wrote the product requirement documents those tools were built from.',
    ],
    tools: ['Marketing mix modelling', 'Python', 'SQL', 'ETL', 'Product definition'],
  },
  {
    id: 'seikitokyu',
    period: 'Nov 2022 — Mar 2023',
    role: 'Civil engineer',
    company: 'Seikitokyu Kogyo Co. Ltd.',
    location: 'Iwakuni, Japan',
    track: 'site',
    work: [
      'Built and tracked schedules in Primavera P6, including the work breakdown structure, critical path analysis and progress reporting.',
      'Prepared technical submittals, kept document control in order, and coordinated RFIs so technical queries closed before they became delays.',
    ],
    tools: ['Primavera P6', 'AutoCAD', 'Critical path analysis', 'Document control'],
  },
  {
    id: 'shwetaung',
    period: 'Nov 2020 — Mar 2021',
    role: 'Civil engineer',
    company: 'Shwe Taung E&C Co. Ltd.',
    location: 'Yangon, Myanmar',
    track: 'site',
    work: [
      'Supported senior engineers overseeing daily construction activity, checking work against drawings, specifications and quality standards.',
      'Kept daily site logs and material records, wrote progress reports, and carried technical issues between subcontractors, design teams and site personnel.',
    ],
    tools: ['Site supervision', 'Quality compliance', 'Progress tracking'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Data science and modelling',
    note: 'The analysis itself.',
    skills: [
      { name: 'Python', tier: 'Core' },
      { name: 'pandas and NumPy', tier: 'Core' },
      { name: 'SQL', tier: 'Core' },
      { name: 'Marketing mix modelling', tier: 'Core' },
      { name: 'scikit-learn', tier: 'Working' },
      { name: 'Time series forecasting (ARIMA, SARIMA)', tier: 'Working' },
      { name: 'Statistical inference', tier: 'Working' },
    ],
  },
  {
    category: 'Retrieval and language models',
    note: 'Current work.',
    skills: [
      { name: 'Retrieval-augmented generation', tier: 'Core' },
      { name: 'Embeddings and vector search', tier: 'Core' },
      { name: 'Prompt and response design', tier: 'Core' },
      { name: 'Grounding and source attribution', tier: 'Working' },
      { name: 'Retrieval evaluation', tier: 'Working' },
    ],
  },
  {
    category: 'Products and interfaces',
    note: 'Where the analysis ends up.',
    skills: [
      { name: 'Power BI and DAX', tier: 'Core' },
      { name: 'Web applications', tier: 'Core' },
      { name: 'React and TypeScript', tier: 'Working' },
      { name: 'ETL and pipeline maintenance', tier: 'Working' },
      { name: 'Matplotlib and seaborn', tier: 'Working' },
      { name: 'Git and GitHub', tier: 'Working' },
    ],
  },
  {
    category: 'Delivery',
    note: 'Carried over from engineering, and still the most useful thing I brought.',
    skills: [
      { name: 'Product requirement documents', tier: 'Core' },
      { name: 'Stakeholder reporting', tier: 'Core' },
      { name: 'Primavera P6 scheduling', tier: 'Working' },
      { name: 'Critical path analysis', tier: 'Working' },
      { name: 'Revit and Dynamo', tier: 'Exposure' },
    ],
  },
];

export const education: Degree[] = [
  {
    id: 'msc',
    degree: 'MEng, Construction, Engineering and Infrastructure Management',
    institution: 'Asian Institute of Technology',
    period: '2017 — 2019',
    location: 'Pathum Thani, Thailand',
    notes: [
      {
        text: 'Thesis: Characteristics of organizational culture in contractor companies affecting project performance and management styles',
        href: 'https://aitir.ait.ac.th/ait-thesis/detail.php?q=B07730',
      },
    ],
  },
  {
    id: 'be',
    degree: 'BEng, Civil and Infrastructure Engineering',
    institution: 'Asian Institute of Technology',
    period: '2012 — 2016',
    location: 'Pathum Thani, Thailand',
    notes: [{ text: 'Capstone: engineering behaviour of artificial municipal solid waste' }],
  },
];

/**
 * TODO(sai): confirm every entry here before this goes live. These were carried
 * over from the generated site, so treat them as unverified until you have the
 * certificate in hand. Delete anything you cannot produce on request.
 */
export const certifications: Credential[] = [
  {
    id: 'cert-1',
    title: 'Google Advanced Data Analytics Professional',
    issuer: 'Google',
    year: '2024',
    detail: 'Statistical modelling, Python, regression and machine learning.',
  },
  {
    id: 'cert-3',
    title: 'Power BI Data Analyst Associate (PL-300)',
    issuer: 'Microsoft',
    year: '2024',
    detail: 'Transforming datasets, DAX models and deploying dashboards.',
  },
];

/** Training attended, kept separate from work experience on purpose. */
export const courses: Credential[] = [
  {
    id: 'coursera-ml',
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI and Stanford',
    year: '2025',
    detail: '',
    href: 'https://coursera.org/share/b7ad5678531653af1a10bf8538f199f4',
    syllabus: [
      'Supervised learning: regression and classification',
      'Neural networks and decision trees',
      'Clustering, anomaly detection and recommenders',
    ],
  },
  {
    id: 'coursera-ds',
    title: 'IBM Data Science',
    issuer: 'IBM, via Coursera',
    year: '2023',
    detail: '',
    href: 'https://coursera.org/share/85ed086c21c80ad95b247a28b7668d4a',
    syllabus: [
      'Data science tooling and methodology in Python',
      'Analysis with pandas and NumPy',
      'Visualisation with Matplotlib, seaborn and Folium',
      'Applied machine learning and model evaluation',
    ],
  },
  {
    id: 'revit-bim',
    title: 'Revit Architecture BIM Modelling Essentials',
    issuer: 'Autodesk authorised training',
    year: '2026',
    detail: '',
    href: '/certificates/revit_certificate.pdf',
    syllabus: [
      'Parametric walls, schedules and family design',
      'Quantity takeoffs, schedules and layout sheets',
    ],
  },
  {
    id: 'dynamo-bim',
    title: 'Automation BIM Essentials, Dynamo',
    issuer: 'Autodesk authorised training',
    year: '2026',
    detail: '',
    href: '/certificates/dynamo_certificate.pdf',
    syllabus: [
      'Visual programming: wiring, custom nodes and code blocks',
      'Batch parameter editing and Excel connectors',
    ],
  },
];
