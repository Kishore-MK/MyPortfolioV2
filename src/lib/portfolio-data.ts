export type SectionConfig = {
    id: string;
    title: string;
    coords: { top: number; left: number };
    size: { width: number; height: number | 'auto' };
    minHeight?: number;
};
interface Coordinates {
  left: number;
  top: number;
}

interface Size {
  width: number;
  height: number;
}
 
interface Section {
  id: string;
  Component: React.ComponentType<any>;
  coords?: Coordinates;
  size?: Size;
  title: string;
  props: any;
}
export type AboutSectionData = {
    paragraphs: string[];
    avatar: {
        src: string;
        alt: string;
        hint: string;
    };
};

export type Skill = {
    name: string;
    icon: string; 
};

export type SkillsSectionData = {
    [key: string]: Skill[];
};

export type Project = {
    title: string;
    description: string;
    image: string;
    hint: string;
    tags: string[];
    link: string;
};

export type Note = {
    id: number;
    title: string;
    body: string;
    createdAt: string;
};

export type Experience = {
    role: string;
    company: string;
    period: string;
    description: string;
};

export type Tweet = {
    tweetId: string;
};

export type ContactSectionData = {
    socialLinks: {
        name: string;
        url: string;
    }[];
};


export type PortfolioData = {
    about: AboutSectionData;
    skills: SkillsSectionData;
    projects: Project[];
    experience: Experience[];
    contact: ContactSectionData;
    tweets: Tweet[];
    notes: Note[];
};

// export const portfolioData: PortfolioData = {
//   about: {
//     paragraphs: [
//       "I'm a user experience designer based in the vibrant tech scene of San Francisco. My passion lies in creating intuitive, beautiful, and impactful digital products that solve real-world problems and delight users.",
//       "With a background in psychology and a keen eye for aesthetics, I approach design with a user-centric methodology, ensuring every interaction is both meaningful and seamless. When I'm not designing, you can find me exploring new coffee shops, hiking in Marin, or working on my latest side project."
//     ],
//     avatar: {
//       src: "https://placehold.co/200x200.png",
//       alt: "A portrait of the user experience designer.",
//       hint: "designer portrait"
//     }
//   },
//   skills: {
//     "Design & Prototyping": [
//       { name: "Figma", icon: "Figma" },
//       { name: "Sketch", icon: "Sketch" },
//       { name: "Adobe XD", icon: "Adobe" },
//       { name: "Principle", icon: "Clapperboard" },
//     ],
//     "Frontend Development": [
//       { name: "React", icon: "React" },
//       { name: "Next.js", icon: "Nextjs" },
//       { name: "TypeScript", icon: "Type" },
//       { name: "Tailwind CSS", icon: "Wind" },
//       { name: "Framer Motion", icon: "Move" },
//     ],
//     "User Research": [
//         { name: "Interviews", icon: "MessageSquare" },
//         { name: "Surveys", icon: "ClipboardList" },
//         { name: "Usability Testing", icon: "Beaker" },
//         { name: "Persona Creation", icon: "Users" },
//     ]
//   },
//   projects: [
//     {
//       title: "Project Alpha",
//       description: "A mobile app designed to streamline team collaboration and project management.",
//       image: "https://placehold.co/600x400.png",
//       hint: "abstract gradients",
//       tags: ["UX Design", "Mobile App", "Productivity"],
//       link: "#"
//     },
//     {
//       title: "Project Beta",
//       description: "A responsive website for a sustainable fashion brand, focusing on e-commerce.",
//       image: "https://placehold.co/600x400.png",
//       hint: "fashion website",
//       tags: ["UI Design", "E-commerce", "Web"],
//       link: "#"
//     },
//      {
//       title: "Project Gamma",
//       description: "An internal dashboard for data visualization and analytics.",
//       image: "https://placehold.co/600x400.png",
//       hint: "data dashboard",
//       tags: ["Data Viz", "Web App", "SaaS"],
//       link: "#"
//     }
//   ],
//    blogs: [
//     {
//       title: "The Art of User-Centric Design",
//       description: "Exploring the principles of creating products that resonate with users.",
//       image: "https://placehold.co/600x400.png",
//       hint: "design process",
//       tags: ["UX Design", "Methodology"],
//       link: "#"
//     },
//     {
//       title: "Prototyping with Framer Motion",
//       description: "A deep dive into creating high-fidelity animations and interactions.",
//       image: "https://placehold.co/600x400.png",
//       hint: "code animation",
//       tags: ["Framer Motion", "Prototyping", "Tutorial"],
//       link: "#"
//     }
//   ],
//   experience: [
//     {
//       role: "Lead UX Designer",
//       company: "Innovate Inc.",
//       period: "2020 - Present",
//       description: "Leading the design team to create user-centric products for a variety of clients."
//     },
//     {
//       role: "Senior UI/UX Designer",
//       company: "Creative Solutions",
//       period: "2018 - 2020",
//       description: "Designed and prototyped interfaces for web and mobile applications."
//     },
//     {
//       role: "UX Intern",
//       company: "Tech Forward",
//       period: "2017 - 2018",
//       description: "Assisted with user research and usability testing for a major SaaS product."
//     }
//   ],
//   tweets: [
//     { tweetId: '1940106960919306313' },
//     { tweetId: '1946296571756412944' },
//     { tweetId: '1813583561653375396' }
//   ],
//   contact: {
//     socialLinks: [
//       { name: "LinkedIn", url: "#" },
//       { name: "Twitter", url: "#" },
//       { name: "Dribbble", url: "#" }
//     ]
//   }
// };
