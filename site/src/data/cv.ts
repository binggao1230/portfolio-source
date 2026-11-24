export type CvLocale = 'en';

export type CvDownloadLanguage = 'en' | 'fr';

export interface CvDownload {
  lang: CvDownloadLanguage;
  label: string;
  url: string;
}

/** Canonical PDF editions; the first entry is the no-JavaScript default.
 *  `/cv/en` and `/cv/fr` are 302 redirects (see public/_redirects) so their
 *  request counts are exactly the button clicks. */
export const cvDownloads: CvDownload[] = [
  { lang: 'en', label: 'English CV', url: '/cv/en' },
  { lang: 'fr', label: 'French CV', url: '/cv/fr' },
];

export interface CvContent {
  locale: CvLocale;
  route: string;
  pageTitle: string;
  description: string;
  eyebrow: string;
  name: string;
  portraitAlt: string;
  role: string;
  summary: string;
  downloads: CvDownload[];
  contactLabel: string;
  languageNavigationLabel: string;
  contactNavigationLabel: string;
  languageLinks: { label: string; href: string }[];
  contact: {
    email: string;
    location: string;
    linkedinLabel: string;
    githubLabel: string;
  };
  facts: { value: string; label: string }[];
  sections: {
    experience: { number: string; title: string; subtitle: string };
    education: { number: string; title: string; subtitle: string };
    skills: { number: string; title: string; subtitle: string };
    community: { number: string; title: string; subtitle: string };
  };
  experience: {
    role: string;
    organization: string;
    href?: string;
    place: string;
    period: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    place: string;
    period: string;
    details: string[];
  }[];
  skills: { label: string; value: string }[];
  community: {
    role: string;
    organization: string;
    href: string;
    place: string;
    period: string;
    bullets: string[];
  };
  closing: string;
  portfolioLabel: string;
  closingMark: string;
}

const english: CvContent = {
  locale: 'en',
  route: '/cv',
  pageTitle: 'Professional CV',
  description: 'Bing Gao — computational mechanics engineering student working across fluid simulation, thermal systems, numerical verification, and engineering software.',
  eyebrow: 'Professional CV, 2026',
  name: 'Bing Gao',
  portraitAlt: 'Bing Gao in the Faroe Islands',
  role: 'Computational Mechanics Engineering Student / Fluid Simulation, Thermal Systems & Engineering Software',
  summary: 'Engineer with 9+ years in mobile software development and technical leadership, now applying experience from a product serving more than 2 million users to fluid simulation, finite-element analysis, thermal modelling, and numerical verification while completing a French engineering degree.',
  downloads: cvDownloads,
  contactLabel: 'Contact me',
  languageNavigationLabel: 'CV language',
  contactNavigationLabel: 'Contact information',
  languageLinks: [
    { label: 'English', href: '/cv' },
  ],
  contact: {
    email: 'binggao1230@gmail.com',
    location: 'Paris, France',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'Code portfolio',
  },
  facts: [
    { value: '9+ years', label: 'Software delivery and technical leadership' },
    { value: '2M+', label: 'Users reached by a product built from scratch' },
    { value: 'Aug 2027', label: 'Engineering degree expected' },
  ],
  sections: {
    experience: { number: '01', title: 'Experience', subtitle: 'Engineering and product delivery' },
    education: { number: '02', title: 'Education', subtitle: 'Mechanics, computation, and software' },
    skills: { number: '03', title: 'Core skills', subtitle: 'Tools and working languages' },
    community: { number: '04', title: 'Community', subtitle: 'Developer education at scale' },
  },
  experience: [
    {
      role: 'Aerodynamics Team Member',
      organization: 'Vinci Eco Drive, ESILV Formula Student',
      href: 'https://vinciecodrive.fr/',
      place: 'Paris, France',
      period: 'Sep 2025 — Present',
      bullets: [
        'Cooling design & calculations: designed and evaluated motor, inverter, and battery cooling systems; selected radiators, fans, pumps, and piping using heat-transfer, energy-balance, and pressure-loss calculations to size flow and cooling capacity.',
        'CAD & aerodynamics: modeled sidepods, cooling ducts, deflectors, and the rear wing in 3DEXPERIENCE; assessed airflow paths and component placement to balance heat rejection and aerodynamic drag.',
        'OpenFOAM simulation: simulated cooling airflow and external aerodynamics; compared CFD results with hand calculations and previous team data on flow rate, pressure drop, temperature, and drag across design variants.',
      ],
    },
    {
      role: '3D Modelling Intern',
      organization: 'Felisiak Engineering & Development',
      place: 'Paris, France',
      period: 'Apr 2026 — Aug 2026',
      bullets: [
        "Reconstructed the fuselage and key components of ESA's Space Rider spacecraft in Blender from public blueprints; automated Python checks measured maximum deviations of 6 mm (side view) and 8.4 mm (top view).",
      ],
    },
    {
      role: 'Mobile Application Development Manager',
      organization: 'Inkeverse',
      href: 'https://ir.inkeverse.com/en/ir_overview.php',
      place: 'Beijing, China',
      period: 'Jul 2016 — Aug 2025',
      bullets: [
        'Product & technical leadership: wrote over 70% of the initial core code for LaoYou (a live-streaming social platform) that grew to 2M+ users; led technical design, task planning, code reviews, releases, and long-term maintenance.',
        'Full-stack, multi-platform & AI-assisted development: developed Android and iOS applications, integrated React Native, built mini-programs with Taro, and developed back-end services with Ruby on Rails; used Cursor and Claude Code for implementation, refactoring, and testing.',
        'Real-time systems & release engineering: developed live-room architecture, audio/video processing, real-time gift rendering, and voiceprint-recognition features; built Ruby-based automation for testing, builds, staged rollouts, and App Store delivery; implemented hotfixes, code obfuscation, SSL pinning, and production-incident troubleshooting.',
      ],
    },
    {
      role: 'Android Engineering Intern',
      organization: 'Creating EV Technology',
      place: 'Beijing, China',
      period: 'Aug 2015 — Jul 2016',
      bullets: [
        'Contributed to 11 ClassBox 7.0 releases (university course management platform): course management, Coursera integration, calendars, widgets, in-app updates, WebView, and APIs for course mapping, account binding, and e-commerce.',
      ],
    },
  ],
  education: [
    {
      degree: "Engineering Degree (Master's level), Modelling & Computational Mechanics",
      institution: 'ESILV',
      place: 'Paris, France',
      period: 'Sep 2025 — Aug 2027',
      details: [
        'Coursework focus: CFD, FEM, Fluid Flow Analysis, Aeroelasticity, Structural Optimization.',
      ],
    },
    {
      degree: 'B.Eng., Computer Science',
      institution: 'Changchun University of Science and Technology (CUST)',
      place: 'Changchun, China',
      period: 'Sep 2012 — Jul 2016',
      details: [
        'Honors: National Scholarship (top 0.2%); 1st Class Scholarship ×5; 1st Prizes in Mathematical Modeling and ACM contests.',
      ],
    },
  ],
  skills: [
    {
      label: 'Mechanical engineering',
      value: 'OpenFOAM, Ansys Fluent, STAR-CCM+, Abaqus, CATIA/3DEXPERIENCE, SolidWorks, Blender.',
    },
    {
      label: 'Programming',
      value: 'Python, C/C++, MATLAB/Simulink, Java/Kotlin, Ruby, JavaScript/TypeScript, SQL, Linux, ATLAS, MoTeC, Dymola.',
    },
    {
      label: 'Languages',
      value: 'Chinese (native), English (C1), French (B2).',
    },
  ],
  community: {
    role: 'Core Organizer',
    organization: 'Google Developer Group Beijing',
    href: 'https://gdg.community.dev/gdg-beijing/',
    place: 'Beijing, China',
    period: 'Nov 2015 — Aug 2025',
    bullets: [
      'Ran 5+ events a year for 200–1,000 attendees, organizing Android, Kotlin, Flutter, TensorFlow, and Machine Learning sessions with Google and local tech experts.',
    ],
  },
  closing: 'Detailed methods, figures, and evidence records are available in the',
  portfolioLabel: 'engineering portfolio',
  closingMark: 'Bing Gao, Paris',
};

export const cvLocales: Record<CvLocale, CvContent> = {
  en: english,
};
