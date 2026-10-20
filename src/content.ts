import type { Credential, Degree, Project, Role, SkillGroup, Span } from './types';
import revitModel1 from './assets/images/revit_model_1_1780650947113.webp';
import revitModel2 from './assets/images/revit_model_2_1780650963970.webp';

export const profile = {
  name: 'Sai Soum Mein',
  handle: 'saisoummein',
  role: 'Civil engineer working in data',
  location: 'Bangkok, Thailand',
  email: 'ssoummein@gmail.com',
  github: 'https://github.com/ssmein',
  linkedin: 'https://linkedin.com/in/saisoummein/',
};

export const intro = [
  'I trained as a civil engineer and spent my first years on construction sites in Yangon and Iwakuni, keeping schedules, submittals and site records straight. I now work in data analytics in Bangkok.',
  'The two halves turn out to be the same job. A building is a measured thing before it is a physical one, and most of what goes wrong on site is a record that disagreed with reality. I build the pipelines, models and dashboards that keep those records honest, using Python, SQL and Power BI, and I automate the parts of Revit that nobody should be doing by hand.',
];

/** The career plot. Decimal years so part-year roles land in the right place. */
export const spans: Span[] = [
  {
    id: 'be',
    label: 'BEng Civil',
    detail: 'Asian Institute of Technology',
    track: 'education',
    start: 2012,
    end: 2016,
  },
  {
    id: 'me',
    label: 'MEng Construction Management',
    detail: 'Asian Institute of Technology',
    track: 'education',
    start: 2017,
    end: 2019,
  },
  {
    id: 'shwetaung',
    label: 'Shwe Taung',
    detail: 'Civil engineer, Yangon',
    track: 'site',
    start: 2020.83,
    end: 2021.17,
  },
  {
    id: 'seikitokyu',
    label: 'Seikitokyu Kogyo',
    detail: 'Civil engineer, Iwakuni',
    track: 'site',
    start: 2022.83,
    end: 2023.17,
  },
  {
    id: 'marketingape',
    label: 'marketingApe',
    detail: 'Data analyst, Bangkok',
    track: 'data',
    start: 2024.17,
    end: 2024.83,
  },
  {
    id: 'shine',
    label: 'Shine',
    detail: 'Data analyst, Bangkok',
    track: 'data',
    start: 2024.92,
    end: 2026.33,
  },
];

export const projects: Project[] = [
  {
    id: 'revit-modelling',
    title: 'BIM modelling in Revit',
    discipline: 'Modelling',
    summary:
      'Two conceptual models built natively in Revit, used as the structural and architectural base for coordination work.',
    detail:
      'Structural and architectural models built to LOD 300, showing concrete framing, structural partitions and a clear coordination grid. They exist to be the parametric starting point other work hangs off, so the emphasis is on consistency: one grid, one set of levels, named elements, and schedules that reconcile against the geometry.',
    outcome:
      'A clean parameterised base that removes the model inconsistencies which normally surface during multi-discipline coordination.',
    stack: ['Revit', 'Structural framing', 'Coordination grids'],
    figures: [
      { label: 'Models', value: '2' },
      { label: 'Detail level', value: 'LOD 300' },
      { label: 'Disciplines', value: 'Architectural, structural' },
    ],
    images: [revitModel1, revitModel2],
  },
  {
    id: 'revit-auto',
    title: 'Revit parametric automation',
    discipline: 'Automation',
    summary:
      'Python and Dynamo scripts that handle family placement, schedule export and parameter mapping across more than fifty Revit families.',
    detail:
      'A set of Dynamo graphs and Python scripts that take over the repetitive half of modelling: placing containment routes and plumbing fixtures, tagging metadata to a naming convention, and reading clearances back out of the model to check them. The scripts run as a batch rather than node by node, so the same project can be re-run after a design change instead of being re-tagged by hand.',
    outcome:
      'Twelve sequential manual steps collapsed into one batch run, which is where both the time saving and the consistency come from.',
    stack: ['Python', 'Dynamo', 'Revit API', 'IFC', 'JSON'],
    figures: [
      { label: 'Families automated', value: '50+' },
      { label: 'Manual steps removed', value: '12' },
      { label: 'Run mode', value: 'Single batch' },
    ],
  },
  {
    id: 'kpi-dash',
    title: 'Construction KPI dashboard',
    discipline: 'Analytics',
    summary:
      'A reporting pipeline that joins model properties to schedule and procurement data, processed in Python and SQL, published in Power BI.',
    detail:
      'Model geometry checks and schedule performance are queried on a regular cycle, consolidated into PostgreSQL, and served to Power BI. The point is to put clash density and progress on the same axis as procurement, so a slipping delivery and the elements waiting on it are visible in one view rather than reconciled by hand each week.',
    outcome:
      'Replaced a weekly spreadsheet pack with a dashboard leads read themselves, which is what made supply shortages visible early enough to act on.',
    stack: ['Power BI', 'SQL', 'Python', 'pandas', 'Primavera P6'],
    figures: [
      { label: 'Refresh', value: 'Scheduled' },
      { label: 'Sources', value: 'Schedule, procurement, model' },
      { label: 'Warehouse', value: 'PostgreSQL' },
    ],
  },
  {
    id: 'asset-db',
    title: 'BIM asset database for facilities',
    discipline: 'Database',
    summary:
      'A normalised PostgreSQL database for facilities asset management, fed by automated IFC extraction behind a Python API.',
    detail:
      'Extraction scripts parse IFC models for asset classifications, serial keys and warranty metadata, normalise them, and load them into PostgreSQL. A FastAPI layer exposes the result so facilities ticketing systems can resolve a ticket against the actual element in the model rather than a re-typed asset tag.',
    outcome:
      'Asset data moves from model to facilities database without a manual key-in step, which is where the transcription errors used to come from.',
    stack: ['PostgreSQL', 'Python', 'FastAPI', 'IfcOpenShell', 'Docker'],
    figures: [
      { label: 'Intake', value: 'Automated from IFC' },
      { label: 'Interface', value: 'REST' },
      { label: 'Deployment', value: 'Docker' },
    ],
  },
];

export const roles: Role[] = [
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
      'Prepared technical submittals: material data sheets, shop drawings and method statements.',
      'Kept document control in order across project records and drawings.',
      'Drafted and coordinated RFIs, worked senior engineer comments back through them, and closed technical queries before they became delays.',
    ],
    tools: ['Primavera P6', 'AutoCAD', 'Critical path analysis', 'Submittals', 'Document control'],
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
      'Tracked progress across live activities on site and took part in daily toolbox and safety meetings.',
      'Kept daily site logs and material delivery records, and wrote the daily and weekly progress reports.',
      'Carried technical issues between subcontractors, design teams and site personnel to stop them turning into logistical conflicts.',
    ],
    tools: ['Site supervision', 'Quality compliance', 'Progress tracking', 'Subcontractor coordination'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Analytics and automation',
    note: 'Where most of my current work sits.',
    skills: [
      { name: 'pandas and NumPy', tier: 'Core' },
      { name: 'Power BI and DAX', tier: 'Core' },
      { name: 'Python', tier: 'Core' },
      { name: 'Matplotlib and seaborn', tier: 'Working' },
      { name: 'SQL', tier: 'Working' },
      { name: 'scikit-learn', tier: 'Working' },
    ],
  },
  {
    category: 'BIM platforms',
    note: 'From modelling and coordination work.',
    skills: [
      { name: 'Autodesk Revit', tier: 'Core' },
      { name: 'Dynamo visual scripting', tier: 'Core' },
      { name: 'Navisworks Manage', tier: 'Working' },
      { name: 'AutoCAD and Civil 3D', tier: 'Working' },
      { name: 'IFC and openBIM', tier: 'Exposure' },
    ],
  },
  {
    category: 'Engineering and delivery',
    note: 'Carried over from site.',
    skills: [
      { name: 'Primavera P6 scheduling', tier: 'Core' },
      { name: 'Critical path analysis', tier: 'Core' },
      { name: 'Document control and submittals', tier: 'Core' },
      { name: 'Git and GitHub', tier: 'Working' },
      { name: 'Revit API', tier: 'Exposure' },
      { name: 'ISO 19650 information management', tier: 'Exposure' },
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

export const certifications: Credential[] = [
  {
    id: 'cert-1',
    title: 'Google Advanced Data Analytics Professional',
    issuer: 'Google',
    year: '2024',
    detail: 'Statistical modelling, Python, regression and machine learning models.',
  },
  {
    id: 'cert-3',
    title: 'Power BI Data Analyst Associate (PL-300)',
    issuer: 'Microsoft',
    year: '2024',
    detail: 'Transforming datasets, DAX models and deploying dashboards.',
  },
  {
    id: 'cert-2',
    title: 'Autodesk Certified Professional, Revit for Structural Design',
    issuer: 'Autodesk',
    year: '2023',
    detail: 'Structural framing, parameter mapping and Dynamo workflows.',
  },
  {
    id: 'cert-4',
    title: 'Project management and Primavera P6',
    issuer: 'Project Management Institute and Oracle partner',
    year: '2022',
    detail: 'Critical path analysis, schedule compression and resource allocation.',
  },
  {
    id: 'cert-5',
    title: 'Registered Assistant Engineer',
    issuer: 'Myanmar Engineering Council',
    year: '2021',
    detail: 'Licensed credential covering engineering ethics, building codes and site inspection.',
  },
];

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
      'Organising complex building elements',
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
      'Structural element automation and adaptive arrays',
    ],
  },
];
