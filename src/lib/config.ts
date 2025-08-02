import { AboutSection } from "@/components/portfolio/AboutSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { TweetsSection } from "@/components/portfolio/TweetsSection";
import { BlogsSection } from "@/components/portfolio/BlogsSection";
import { SectionConfig, PortfolioData } from "./portfolio-data";
import React from "react";

export const CANVAS_SIZE = { width: 4000, height: 4000 };

type SectionComponent = {
  Component: React.FC<any>;
  props?: { [key: string]: any };
};

export type Section = SectionConfig & SectionComponent;

const componentMap: { [key: string]: React.FC<any> } = {
  about: AboutSection,
  skills: SkillsSection,
  project: ProjectsSection,
  experience: ExperienceSection,
  contact: ContactSection,
  blog: BlogsSection,
  tweet: TweetsSection,
};

const baseSections: Omit<SectionConfig, 'coords' | 'size' | 'minHeight'>[] = [
  { id: 'about', title: 'About Me'},
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'contact', title: 'Contact' },
];

const sectionLayouts: {[key: string]: Omit<SectionConfig, 'id' | 'title' | 'minHeight'>} = {
  about: { coords: { top: 50, left: 1725 }, size: { width: 550, height: 450 } },
  skills: { coords: { top: 750, left: 250 }, size: { width: 700, height: 550 } },
  experience: { coords: { top: 750, left: 1100 }, size: { width: 550, height: 450 } },
  contact: { coords: { top: 2800, left: 1350 }, size: { width: 450, height: 200 } },
}


export function generateSections(portfolioData: PortfolioData): Section[] {

    const TWEET_CARD_WIDTH = 550;
    const HORIZONTAL_GAP = 50;
    const BASE_X_TWEETS = 250;
    const BASE_Y_TWEETS = 1500;
    const PROJECT_CARD_HEIGHT = 450;

    const tweetSections: Section[] = portfolioData.tweets.map((tweet, index) => {
        const offsetX = Math.random() * 100 - 50;
        const offsetY = Math.random() * 100 - 50;

        return {
            id: `tweet-${index}`,
            title: `Tweet`,
            coords: { 
                top: BASE_Y_TWEETS + offsetY,
                left: BASE_X_TWEETS + index * (TWEET_CARD_WIDTH + HORIZONTAL_GAP) + offsetX
            },
            size: { width: TWEET_CARD_WIDTH, height: 'auto' },
            minHeight: PROJECT_CARD_HEIGHT,
            Component: componentMap['tweet'],
            props: { tweet: tweet }
        }
    });

    const projectSections: Section[] = portfolioData.projects.map((project, index) => {
        const CARD_WIDTH = 400;
        const CARD_HEIGHT = 530;
        const GAP = 50;
        const COLS = 3;
        const BASE_X = 1800;
        const BASE_Y = 750;

        const col = index % COLS;
        const row = Math.floor(index / COLS);
        
        const offsetX = Math.random() * 100 - 50;
        const offsetY = Math.random() * 100 - 50;
        
        return {
            id: `project-${index}`,
            title: project.title,
            coords: { 
                top: BASE_Y + row * (CARD_HEIGHT + GAP) + offsetY,
                left: BASE_X + col * (CARD_WIDTH + GAP) + offsetX,
            },
            size: { width: CARD_WIDTH, height: CARD_HEIGHT },
            Component: componentMap['project'],
            props: { project }
        }
    });

    const blogSections: Section[] = portfolioData.blogs.map((blog, index) => {
        const CARD_WIDTH = 450;
        const CARD_HEIGHT = 500;
        const GAP = 50;
        const COLS = 2;
        const BASE_X = 2500;
        const BASE_Y = 1800;

        const col = index % COLS;
        const row = Math.floor(index / COLS);
        
        const offsetX = Math.random() * 100 - 50;
        const offsetY = Math.random() * 100 - 50;
        
        return {
            id: `blog-${index}`,
            title: blog.title,
            coords: { 
                top: BASE_Y + row * (CARD_HEIGHT + GAP) + offsetY,
                left: BASE_X + col * (CARD_WIDTH + GAP) + offsetX,
            },
            size: { width: CARD_WIDTH, height: CARD_HEIGHT },
            Component: componentMap['blog'],
            props: { blog }
        }
    });


    const finalBaseSections: Section[] = baseSections.map(sectionInfo => {
      let props = {};
      const layout = sectionLayouts[sectionInfo.id];
      const offsetX = Math.random() * 100 - 50;
      const offsetY = Math.random() * 100 - 50;

      switch (sectionInfo.id) {
        case 'about':
          props = { about: portfolioData.about };
          break;
        case 'skills':
          props = { skills: portfolioData.skills };
          break;
        case 'experience':
          props = { experiences: portfolioData.experience };
          break;
        case 'contact':
          props = { contact: portfolioData.contact };
          break;
      }

      return {
          ...sectionInfo,
          ...layout,
          coords: {
            top: layout.coords.top + offsetY,
            left: layout.coords.left + offsetX,
          },
          Component: componentMap[sectionInfo.id],
          props
      }
    })

    return [
        ...finalBaseSections,
        ...tweetSections,
        ...projectSections,
        ...blogSections,
    ];
}
