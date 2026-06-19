import { Project, Experience, SkillGroup, Stat, Degree, Certificate, SpecialCourse } from './types';
import revitModel1 from './assets/images/revit_model_1_1780650947113.png';
import revitModel2 from './assets/images/revit_model_2_1780650963970.png';

export const statsData: Stat[] = [
  { id: 'years', count: 4, suffix: 'Y+', label: 'Years Experience (Construction + Data)' },
  { id: 'projects', count: 5, suffix: '+', label: 'Dashboard Delivered' },
  { id: 'certs', count: 4, suffix: ' Certs', label: 'Professional Certifications' },
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
    id: 'revit-modelling',
    title: 'BIM Modelling in Autodesk Revit',
    category: 'Modelling',
    type: 'BIM Modelling',
    description: 'A structural and architectural modeling showcase featuring 2 conceptual models built natively in Autodesk Revit, serving as foundational spatial assets.',
    longDescription: 'This project highlights precise structural, architectural, and spatial conceptual modeling built in Autodesk Revit. Designed to serve as highly accurate structural frameworks, these initial 3D models establish parametric foundations for complex space layouts. The project is structured dynamically to scale as more models are uploaded, currently featuring two core models showing concrete framing, structural partitions, and clear structural coordination grids.',
    tags: ['Revit', 'BIM Modelling', 'Structural Design', 'Architectural Concept', '3D Rendering'],
    metrics: [
      { label: 'Active Models', value: '2 Models' },
      { label: 'Model Accuracy', value: 'LOD 300' },
      { label: 'Revit Version', value: '25.0 / API Core' }
    ],
    impact: 'Establishes a neat, clean, fully parameterized structural starting point that removes model inconsistencies and sets up downstream multi-discipline coordination.',
    images: [
      revitModel1,
      revitModel2
    ],
    technicalSpecs: [
      { label: 'Platform', value: 'Autodesk Revit' },
      { label: 'Precision Level', value: 'LOD 300' },
      { label: 'Disciplines', value: 'Architectural / Structural' },
      { label: 'Model Volume', value: '2 Conceptual Models' }
    ],
    diagrams: [
      { title: '01. Conceptual Building Model', url: '', caption: 'Structural and architectural 3D layout designed inside Revit showing structural column grid.' },
      { title: '02. Structural Framing Detail', url: '', caption: 'MEP routing and framing detail model view for multi-discipline clash prevention.' }
    ]
  },
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
    impact: 'Automated 12 sequential manual tasks down to a 1-click batch run, drastically increasing accuracy and delivering high consistency in multi-discipline models.',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop'
    ],
    technicalSpecs: [
      { label: 'API Integration', value: 'Revit API / DB Link' },
      { label: 'Framework', value: 'Python / Dynamo Core' },
      { label: 'Interoperability', value: 'IFC / COBie Metadata' },
      { label: 'Task Schema', value: '1-Click JSON Batch' }
    ],
    diagrams: [
      { title: '01. Automation Suite UI', url: '', caption: 'The parameter mapping dashboard running on a multi-thread background worker inside Revit.' },
      { title: '02. Data Mapping Matrix', url: '', caption: 'Schematic flow showing data transformation from structural coordinates into parameters.' },
      { title: '03. Family Parametric Schema', url: '', caption: 'Mapping electrical containment paths across custom parametric assemblies.' },
      { title: '04. Thread Sync Logic', url: '', caption: 'Thread management showing concurrent worker queue resolving structural intersections.' }
    ]
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
    impact: 'Replaced weekly spreadsheet reporting with a live dashboard, empowering leads to identify supply shortages and coordinate directly with site managers.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b446d2e4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop'
    ],
    technicalSpecs: [
      { label: 'Data Ingress', value: 'PostgreSQL Warehousing' },
      { label: 'Integration Feed', value: 'Primavera P6 & Procore' },
      { label: 'Processing Layer', value: 'Pandas / NumPy Engine' },
      { label: 'Visual Analytics', value: 'Power BI Gateway' }
    ],
    diagrams: [
      { title: '01. Analytical Overview', url: '', caption: 'BIM model coordinate validation matching active warehouse procurement milestones.' },
      { title: '02. Live Warehouse Stream', url: '', caption: 'Database schema tracing chronological project completion against materials delivery.' },
      { title: '03. Procurement Schedule', url: '', caption: 'Chronological Gantt chart mapping supply shortages directly onto physical elements.' },
      { title: '04. Stakeholder Control', url: '', caption: 'Admin command panel showing real-time feedback loops connecting site leads with supply lines.' }
    ]
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
    impact: 'Transferred 30,000 MEP elements from 3D models directly to client facilities databases, zeroing out manual key-in mistakes and setting up predictive asset tracking.',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
    ],
    technicalSpecs: [
      { label: 'Engine Schema', value: 'PostgreSQL Relational' },
      { label: 'Model Parsing', value: 'IFC-OpenShell CLI' },
      { label: 'Exposed API', value: 'FastAPI Uvicorn' },
      { label: 'Containerization', value: 'Docker Engine' }
    ],
    diagrams: [
      { title: '01. Facility Layout', url: '', caption: 'Operation and maintenance assets synced across operational REST endpoints.' },
      { title: '02. Model Parsing Log', url: '', caption: 'Dynamic logs translating IFC class hierarchies into relational rows.' },
      { title: '03. DB Relational Mapping', url: '', caption: 'Normalized SQL tables matching GUIDs to physical maintenance tickets.' },
      { title: '04. Endpoint Test Playground', url: '', caption: 'REST Client displaying payload responses for operational asset queries.' }
    ]
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
    skillsUsed: ['Power BI', 'SQL', 'Python', 'MS Excel']
  },
  {
    id: 'marketingape',
    period: 'Mar 2024 — Nov 2024',
    role: 'Data Analyst',
    company: 'marketingApe Co. Ltd.',
    location: 'Bangkok, Thailand',
    description: [
      'Managed end-to-end Marketing Mix Modeling (MMM) projects from data collection, cleaning, and ETL across multiple data channels to quantify performance impact and optimize resource allocation.',
      'Collaborated with development teams to design analytics tools which enable clients to monitor real time performance.',
      'Authored comprehensive Product Requirement Documents (PRDs) to guide analytics tool development.'
    ],
    skillsUsed: ['Marketing Mix Modeling (MMM)', 'Data Cleaning', 'Python', 'ETL', 'Product Design', 'SQL']
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
    period: 'Nov 2020 - Mar 2021',
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
    details: [
      'Capstone Project: Engineering Behavior of Artificial Municipal Solid Waste'
    ]
  }
];

export const certificationData: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Google Advanced Data Analytics Professional',
    issuer: 'Google',
    year: '2024',
    details: 'Covers advanced statistical modeling, Python data structures, regression modeling, and machine learning models.'
  },
  {
    id: 'cert-2',
    title: 'Autodesk Certified Professional: Revit for Structural Design',
    issuer: 'Autodesk',
    year: '2023',
    details: 'Validates industry-grade expertise in complex structural framing, parameter mapping, and Dynamo scripting workflows.'
  },
  {
    id: 'cert-3',
    title: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
    issuer: 'Microsoft',
    year: '2024',
    details: 'Demonstrates professional proficiency in transforming datasets, creating DAX models, and deploying automated corporate BI dashboards.'
  },
  {
    id: 'cert-4',
    title: 'Project Management Professional & Primavera P6 Specialist',
    issuer: 'Project Management Institute / Oracle Partner',
    year: '2022',
    details: 'Specialized training in Critical Path Method (CPM) analyses, schedule compression, and resource constraint allocation modeling.'
  },
  {
    id: 'cert-5',
    title: 'Professional Civil Engineer (Registered Assistant Engineer)',
    issuer: 'Myanmar Engineering Council',
    year: '2021',
    details: 'Licensed engineer credential verifying competency in engineering ethics, building code specifications, and construction site inspection.'
  }
];

export const specialCourseData: SpecialCourse[] = [
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
    id: 'revit-bim',
    title: 'Revit Architecture BIM Modelling Essentials',
    issuer: 'Autodesk Authorized Training Program',
    year: '2026',
    isPdf: true,
    link: '/certificates/revit_certificate.pdf',
    syllabus: [
      'Parametric 3D structural, wall, structural schedules, and family design modules',
      'Creation, modification, and organization of complex Autodesk building elements',
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
      'Automated parameter processing, mass file attribute editing, and Excel connectors',
      'Structural element automation, adaptive component arrays, and modeling scripts'
    ]
  }
];

