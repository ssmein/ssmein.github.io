import { Project, Experience, SkillGroup, Stat } from './types';

export const statsData: Stat[] = [
  { id: 'years', count: 4, suffix: 'Y+', label: 'Years Experience (Construction + Data)' },
  { id: 'projects', count: 20, suffix: '+', label: 'Dashboard Delivered' },
  { id: 'certs', count: 3, suffix: ' Certs', label: 'Professional Certifications' },
  { id: 'scripts', count: 12, suffix: ' Scripts', label: 'BIM Automation Scripts' }
];

export const skillGroupsData: SkillGroup[] = [
  {
    category: 'BIM Platforms',
    skills: [
      { name: 'Autodesk Revit', level: 95 },
      { name: 'Navisworks Manage', level: 80 },
      { name: 'AutoCAD / Civil 3D', level: 50 },
      { name: 'Dynamo Visual Scripting', level: 85 },
      { name: 'IFC Schema / OpenBIM', level: 30 }
    ]
  },
  {
    category: 'Computational Design',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'SQL', level: 71 },
      { name: 'Dynamo Custom Nodes', level: 82 },
      { name: 'Revit API', level: 25 },
      { name: 'Version Control (Git/GitHub)', level: 50 }
    ]
  },
  {
    category: 'Analytics & Automation',
    skills: [
      { name: 'Pandas / NumPy Data Wrangling', level: 85 },
      { name: 'Power BI / DAX Dashboards', level: 75 },
      { name: 'Matplotlib & Seaborn Visuals', level: 70 },
      { name: 'Predictive Modeling (scikit-learn)', level: 55 },
      { name: 'Information Management (ISO 19650)', level: 2 }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: 'revit-auto',
    title: 'Revit Parametric Automation Suite',
    category: 'Automation',
    type: 'Automation',
    description: 'Python + Dynamo scripts automating family placement, schedule export, and parameter mapping across 50+ Revit families.',
    longDescription: 'Developed a comprehensive computational design suite using Revit API, RevitPythonShell, and Dynamo. The package automates the heavy-lifting of electrical containment routes, plumbing fixture placements, and metadata tagging according to industry-standard building guidelines. It scans current project spaces, calculates structural clearances, resolves conflicts, and generates optimal mechanical layouts dynamically.',
    tags: ['Python', 'Dynamo', 'Revit API', 'OpenBIM', 'JSON'],
    metrics: [
      { label: 'Time Saved', value: '40 hrs/Phase' },
      { label: 'Error Margin', value: '-95%' },
      { label: 'Families Automated', value: '50+' }
    ],
    impact: 'Automated 12 sequential manual tasks down to a 1-click batch run, drastically increasing accuracy and delivering high consistency in multi-discipline models.'
  },
  {
    id: 'kpi-dash',
    title: 'Construction KPI & Model Analytics Dashboard',
    category: 'Data Analytics',
    type: 'Data Analytics',
    description: 'Live analytics pipeline pulling from Procore & Primavera, processed with Python/SQL, visualized in Power BI.',
    longDescription: 'Created an enterprise data architecture connecting BIM model properties with procurement & scheduler databases. Using a custom Python pipeline, model geometry checks and schedule-performance statistics are regularly queried. The consolidated insights are loaded to PostgreSQL and served to Power BI, allowing project steering committees to track clash densities against chronological progress.',
    tags: ['Power BI', 'SQL Server', 'Python', 'Pandas', 'Primavera P6'],
    metrics: [
      { label: 'Update Speed', value: 'Near Real-Time' },
      { label: 'Data Points', value: '500,000+' },
      { label: 'Stakeholders Served', value: '25+' }
    ],
    impact: 'Replaced weekly spreadsheet reporting with a live dashboard, empowering leads to identify supply shortages and coordinate directly with site managers.'
  },
  {
    id: 'ml-clash',
    title: 'ML Clash Prioritization Engine',
    category: 'Machine Learning',
    type: 'Machine Learning',
    description: 'Trained a gradient-boosted classifier on 50,000 historical Navisworks clashes to auto-triage critical MEP conflicts.',
    longDescription: 'Faced with thousands of search-set clashes that delay coordination cycles, we trained an XGBoost model on historic projects metadata. By digesting parameters like discipline type, structural proximity, element density, and coordinate positions, the engine predicts whether a clash represents a critical structural blocker vs. a negligible field adjustment, allowing engineering coordinators to focus their meetings.',
    tags: ['scikit-learn', 'XGBoost', 'Python', 'Navisworks XML', 'Pandas'],
    metrics: [
      { label: 'QA Efficiency', value: '+60%' },
      { label: 'Prediction Precision', value: '92.4%' },
      { label: 'Clashes Analyzed', value: '50,000+' }
    ],
    impact: 'Cut coordination meeting prep from 8 hours per week down to 1.5 hours, letting engineers spend time resolving structural constraints instead of filtering spreadsheets.'
  },
  {
    id: 'asset-db',
    title: 'BIM Asset Management Database (FM)',
    category: 'Database',
    type: 'Database',
    description: 'Normalized PostgreSQL database for FM asset management with automated IFC data extraction and a Python API layer.',
    longDescription: 'Built a specialized database that links spatial design data with ongoing operations and maintenance cycles. Custom extraction scripts parse IFC models to fetch asset classifications, serial keys, and warranty metadata. The data is parsed, normalized, and stored in PostgreSQL, exposing secure REST endpoints that tie into existing Facility Management ticketing platforms.',
    tags: ['PostgreSQL', 'Python', 'FastAPI', 'IFC-OpenShell', 'Docker'],
    metrics: [
      { label: 'Asset Intake Speed', value: '15 mins/Bldg' },
      { label: 'Data Accuracy', value: '99.9%' },
      { label: 'Database Rows', value: '120k+' }
    ],
    impact: 'Transferred 30,000 MEP elements from 3D models directly to client facilities databases, zeroing out manual key-in mistakes and setting up predictive asset tracking.'
  }
];

export const experienceData: Experience[] = [
  {
    id: 'shine',
    period: 'Dec 2024 — May 2026',
    role: 'Data Analyst',
    company: 'Shine Co. Ltd.',
    location: 'Bangkok, Thailand',
    type: 'Part-time',
    description: [
      'Conducted in depth analysis of historical and real time sales, inventory, and pricing data to identify market trends and deliver actionable insights.',
      'Designed and deployed automated Power BI dashboards for regional dealerships, enabling real time KPI tracking.',
      'Transformed raw multisource datasets into structured reports, assist in data pipeline management and dashboard automation.'
    ],
    skillsUsed: ['Power BI', 'SQL', 'Python', 'Tableau', 'Data Automation', 'MS Excel']
  },
  {
    id: 'marketingape',
    period: 'Mar 2024 — Nov 2024',
    role: 'Data Analyst',
    company: 'marketingApe Co. Ltd.',
    location: 'Bangkok, Thailand',
    description: [
      'Managed end-to-end Marketing Mix Modeling (MMM) projects from data collection, cleansing, and integration across multiple data channels to quantify performance impact and optimize resource allocation.',
      'Collaborated with development teams to design analytics tools which enable clients to monitor real time performance.',
      'Authored comprehensive Product Requirement Documents (PRDs) to guide analytics tool development.'
    ],
    skillsUsed: ['Marketing Mix Modeling (MMM)', 'Data Cleansing', 'Python', 'Data Integration', 'Product Design', 'SQL']
  },
  {
    id: 'seikitokyu',
    period: 'Nov 2022 — Mar 2023',
    role: 'Civil Engineer',
    company: 'Seikitokyu Kogyo Co. Ltd.',
    location: 'Iwakuni, Japan',
    description: [
      'Developed and monitored detailed schedules using Primavera P6, including WBS creation, critical path method (CPM) analysis, and progress tracking.',
      'Prepared and submitted technical submittals including material data sheets, shop drawings, and method statements.',
      'Supported document control processes by organizing and maintaining project records, drawings.',
      'Drafted and coordinated RFIs (Requests for Information), responding to senior engineer comments and ensuring timely resolution of technical queries to minimize construction delays.'
    ],
    skillsUsed: ['Primavera P6', 'AutoCAD', 'CPM Analysis', 'Technical Submittals', 'Document Control']
  },
  {
    id: 'shwetaung',
    period: 'Nov 2022 — Mar 2023',
    role: 'Civil Engineer',
    company: 'Shwe Taung E&C Co. Ltd.',
    location: 'Yangon, Myanmar',
    description: [
      'Assisted senior engineers in overseeing daily construction activities, ensuring all work strictly complied with construction drawings, project specifications, and quality standards.',
      'Monitored the job site to track the progress of all ongoing activities and actively contributed to daily toolbox and safety meetings.',
      'Maintained daily site logs, tracked material deliveries, and prepared daily and weekly progress reports.',
      'Facilitated communication between subcontractors, design teams, and on-site personnel to resolve technical issues and prevent further logistical conflicts.'
    ],
    skillsUsed: ['Site Operations', 'Technical Compliance', 'Progress Tracking', 'Subcontractor Coordination', 'Site Logistics']
  }
];
