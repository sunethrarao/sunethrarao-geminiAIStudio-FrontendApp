import { Injectable } from '@angular/core';

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  details: string;
}

export interface Project {
  name: string;
  category: string;
  summary: string;
  technologies: string[];
}

export interface SiteStats {
  viewers: number;
  rating: number;
  totalRatings: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeDataService {
  // Simulated state
  private _viewers = 14205;
  private _ratingSum = 628; 
  private _totalRatings = 128; // Avg ~4.9

  getProfile() {
    return {
      name: 'Sunethra Krishnaraj',
      title: 'Strategic Frontend Engineering Manager',
      summary: 'Strategic Frontend Engineering Manager with 16.5 years of experience leading high-performing UI engineering teams and delivering large-scale, business-critical products. Proven expertise in Front-End Architecture, Micro Frontends, and Agile delivery. Strong focus on reusability, performance optimization, and AI-assisted development.',
      email: 'sunethrarao@gmail.com', // Keeping email as per typical resume, but phone is hidden
      location: 'Bengaluru',
      linkedin: 'LinkedIn Profile',
      github: 'GitHub Profile',
      gde: 'Google Developer Expert'
    };
  }

  getSkills() {
    return {
      leadership: ['Team Management', 'Stakeholder Management', 'Agile/Scrum', 'Product Lifecycle', 'Technical Governance', 'Mentoring'],
      architecture: ['Micro Frontends', 'Monorepos', 'Reusable Components', 'State Management (Akita, Pinia)', 'UI Architecture'],
      tech: ['Angular 2-20', 'TypeScript', 'Vue 3', 'HTML5/CSS3', 'RxJS', 'Tailwind', 'PrimeNG'],
      ai: ['Prompt Engineering', 'AI-driven documentation', 'Reverse Engineering POCs', 'Smart Assistant Dev']
    };
  }

  getSkillEvidence(): Record<string, string> {
    return {
      'Team Management': 'Built and led a high-performing UI team of 20+ engineers within two weeks for a global FMCG program, establishing culture and best practices.',
      'Stakeholder Management': 'Acted as the primary technical liaison for global clients, translating complex architectural decisions into business value propositions.',
      'Agile/Scrum': 'Facilitated Agile ceremonies and sprint planning, ensuring predictable delivery velocities for distributed teams.',
      'Product Lifecycle': 'Managed end-to-end product development life cycles from initial proof-of-concept to production deployment and maintenance.',
      'Technical Governance': 'Established coding standards, code review guidelines, and architectural compliance checks across multiple project streams.',
      'Mentoring': 'Guided junior and mid-level developers, fostering career growth and technical excellence within the organization.',
      
      'Micro Frontends': 'Architected a "Maintenance-app" Micro Frontend for the Immigration Services Portal to decouple monolithic dependencies.',
      'Monorepos': 'Implemented Nx Monorepo strategies to share code and configurations effectively across multiple related applications.',
      'Reusable Components': 'Created centralized UI libraries to ensure brand consistency and reduce development time across the Retail Convenience Platform.',
      'UI Architecture': 'Designed the frontend architecture for an AI Letter Drafting Tool, focusing on responsiveness and accessibility.',
      
      'Angular 2-20': 'Expert-level command of Angular ecosystem, overseeing upgrades and implementing modern features like Signals and Standalone components.',
      'TypeScript': 'Enforced strict typing and advanced TypeScript patterns to improve code reliability and developer tooling.',
      'Vue 3': 'Led development on Retail platforms using Vue.js, ensuring feature parity and high performance.',
      'Tailwind': 'Utilized utility-first CSS for rapid UI prototyping and production-ready responsive designs.',
      
      'Prompt Engineering': 'Leveraging LLMs to accelerate code generation, documentation, and unit testing workflows.',
      'Smart Assistant Dev': 'Developing context-aware chatbots and assistants to automate routine queries and improve user engagement.'
    };
  }

  getProjects(): Project[] {
    return [
      {
        name: 'Global FMCG Transformation',
        category: 'Digital Transformation',
        summary: 'Objective: Accelerate the digital presence of a major consumer goods company. Role: Led end-to-end front-end strategy and rapidly scaled the engineering team. Impact: Built a 20+ member team in two weeks and delivered a robust, scalable UI platform ahead of schedule.',
        technologies: ['Angular', 'Nx Monorepo', 'RxJS', 'Scrum']
      },
      {
        name: 'Immigration Services Portal',
        category: 'Legal Tech',
        summary: 'Objective: Modernize a legacy immigration platform for global scale. Role: Refactored the UI architecture and implemented a Micro Frontend strategy. Impact: Modularized the codebase, significantly reducing regression testing time, and authored the architecture for a new AI-driven letter drafting tool.',
        technologies: ['Angular', 'Micro Frontends', 'AI Integration', 'TypeScript']
      },      
      {
        name: 'Retail Convenience Platform',
        category: 'E-Commerce',
        summary: 'Objective: Enhance the digital customer experience for a retail giant. Role: Led UI development across Angular and Vue.js streams and managed CI/CD pipelines. Impact: Achieved seamless cross-browser compatibility and streamlined deployment cycles via Azure DevOps.',
        technologies: ['Vue.js', 'Angular', 'Azure DevOps', 'CI/CD']
      },
      {
        name: 'Event Ticketing Marketplace',
        category: 'Entertainment',
        summary: 'Objective: optimize high-traffic marketing pages for a ticketing platform. Role: Technology Lead responsible for frontend performance and SEO. Impact: Delivered 70+ responsive pages and implemented SEO strategies that measurably increased conversion rates.',
        technologies: ['HTML5', 'CSS3', 'SEO', 'JavaScript']
      }
    ];
  }

  getExperience(): Experience[] {
    return [
      {
        company: 'Global Professional Services Firm',
        role: 'Application Development Associate Manager',
        period: 'Jun 2019 – Present',
        description: 'Delivered 8-10 successful projects on scalable platforms. Performed roles including Developer, Team Lead, SME, and Technical Delivery Manager.',
        highlights: [
          'Large FMCG Program: Led end-to-end front-end strategy and architecture. Built a high-performing UI team of 20+ within two weeks.',
          'Immigration Services Portal: Refactored and modularized UI project structure. Implemented Micro Frontend "Maintenance-app". Authored UI architecture for AI Letter Drafting Tool.',
          'Retail Convenience Platform: Led UI development using Angular and Vue.js. Managed Azure Repos CI/CD and enabled cross-browser compatibility.',
          'FinTech Mortgage Platform: Served as Frontend SME.',
          'Digital Media Gallery: Frontend Lead.',
          'Mining & Natural Resources Portal: Front End Lead on SharePoint platform.'
        ]
      },
      {
        company: 'Global IT Services Firm',
        role: 'Technology Lead',
        period: 'Nov 2013 – Jun 2019',
        description: 'Lead developer for major client accounts focusing on marketing and content delivery.',
        highlights: [
          'Event Ticketing Marketplace: Developed 70+ marketing content pages using HTML5, CSS3, and JavaScript.',
          'Built 95+ responsive pages across devices with RWD principles.',
          'Implemented SEO strategies increasing conversions.'
        ]
      },
      {
        company: 'Global Internet Services Company',
        role: 'Web Engineer',
        period: 'Apr 2011 – Jun 2013',
        description: 'Designed, developed, and tested web enhancements.',
        highlights: [
          'Managed WordPress and Site Builder websites.',
          'Delivered 40+ SLA-related solutions weekly.'
        ]
      },
      {
        company: 'Enterprise Technology Giant',
        role: 'Technical Support Engineer',
        period: 'Nov 2009 – Apr 2011',
        description: 'Technical support and web improvements.',
        highlights: [
          'Contributed to website improvements using HTML & CSS.',
          'Resolved 20+ critical issues per week.'
        ]
      }
    ];
  }

  getEducation(): Education[] {
    return [
      {
        degree: 'Executive MBA',
        institution: 'Swiss School of Business & Management (SSBM), Geneva',
        year: '2023',
        details: 'Grade B, GPA: 3.55'
      },
      {
        degree: 'Bachelor of Engineering (Electronics & Communication)',
        institution: 'Canara Engineering College',
        year: '2009',
        details: '65%'
      }
    ];
  }

  getCertifications() {
    return [
      'Smart Assistant or Chatbot Development - NASSCOM (Jan 2026)',
      'Yuva AI For All - NASSCOM (Dec 2025)',
      'Build agents in Copilot Chat (Sept 2025)',
      'Prompt Engineering – Coursera (2025)',
      'Power Platform Functional Consultant Associate (PL-200)',
      'Azure AI Fundamentals (AI-900)',
      'Accenture Technology Architect Associate (TAA)'
    ];
  }

  getAwards() {
    return [
      'Superhero Client Awards – FY25 Q4',
      'Growth Catalyst Award – FY24 Q2',
      'Inspiring Innovator Award – FY22 Q3',
      'Power App Hackathon Jury Award – FY22 Q3'
    ];
  }

  // Site Stats Logic
  incrementViewers(): void {
    this._viewers++;
  }

  getSiteStats(): SiteStats {
    return {
      viewers: this._viewers,
      rating: this._ratingSum / this._totalRatings,
      totalRatings: this._totalRatings
    };
  }

  submitRating(score: number): SiteStats {
    this._ratingSum += score;
    this._totalRatings++;
    return this.getSiteStats();
  }
}