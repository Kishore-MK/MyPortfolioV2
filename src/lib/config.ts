import { AboutSection } from "@/components/portfolio/AboutSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { TweetsSection } from "@/components/portfolio/TweetsSection";
import { NotesSection } from "@/components/portfolio/NotesSection";
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
  note: NotesSection,
  tweet: TweetsSection,
};

const baseSections: Omit<SectionConfig, 'coords' | 'size' | 'minHeight'>[] = [
  { id: 'about', title: 'About Me'},
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'contact', title: 'Contact' },
];

const sectionLayouts: {[key: string]: Omit<SectionConfig, 'id' | 'title' | 'minHeight'>} = {
  about:      { coords: { top: 150,  left: 1450 }, size: { width: 550, height: 450 } },
  skills:     { coords: { top: 750,  left: 100  }, size: { width: 700, height: 550 } },
  experience: { coords: { top: 750,  left: 950  }, size: { width: 550, height: 500 } },
  contact:    { coords: { top: 3100, left: 1400 }, size: { width: 450, height: 200 } },
}

// Deterministic jitter so positions are stable across renders.
// Returns a value in [-range, +range] based on a seed.
function jitter(seed: number, range: number): number {
  return ((seed * 127 + 31) % (range * 2 + 1)) - range;
}

export function generateSections(portfolioData: PortfolioData): Section[] {

    // ── Tweets: rows of 3, bottom-left zone (y:1550, x:100)
    const TWEET_W = 550;
    const TWEET_GAP = 100;
    const TWEET_COLS = 3;
    const TWEET_ROW_H = 600; // estimated max auto height + gap
    const TWEET_BASE_X = 100;
    const TWEET_BASE_Y = 1550;

    const tweetSections: Section[] = portfolioData.tweets.map((tweet, index) => {
        const col = index % TWEET_COLS;
        const row = Math.floor(index / TWEET_COLS);
        return {
            id: `tweet-${index}`,
            title: `Tweet`,
            coords: {
                top:  TWEET_BASE_Y + row * TWEET_ROW_H  + jitter(index * 3 + 1, 12),
                left: TWEET_BASE_X + col * (TWEET_W + TWEET_GAP) + jitter(index * 7, 12),
            },
            size: { width: TWEET_W, height: 'auto' },
            minHeight: 450,
            Component: componentMap['tweet'],
            props: { tweet },
        };
    });

    // ── Projects: 3-col grid, right zone (y:200, x:2200)
    const PROJ_W = 420;
    const PROJ_H = 530;
    const PROJ_GAP = 100;
    const PROJ_COLS = 3;
    const PROJ_BASE_X = 2200;
    const PROJ_BASE_Y = 200;

    const projectSections: Section[] = portfolioData.projects.map((project, index) => {
        const col = index % PROJ_COLS;
        const row = Math.floor(index / PROJ_COLS);
        return {
            id: `project-${index}`,
            title: project.title,
            coords: {
                top:  PROJ_BASE_Y + row * (PROJ_H + PROJ_GAP) + jitter(index * 5, 12),
                left: PROJ_BASE_X + col * (PROJ_W + PROJ_GAP) + jitter(index * 11, 12),
            },
            size: { width: PROJ_W, height: PROJ_H },
            Component: componentMap['project'],
            props: { project },
        };
    });

    // ── Notes: 2-col grid, right zone below tweets (y:1550, x:2200)
    const NOTE_W = 420;
    const NOTE_H = 450;
    const NOTE_GAP = 100;
    const NOTE_COLS = 2;
    const NOTE_BASE_X = 2200;
    const NOTE_BASE_Y = 1550;

    const noteSections: Section[] = portfolioData.notes.map((note, index) => {
        const col = index % NOTE_COLS;
        const row = Math.floor(index / NOTE_COLS);
        return {
            id: `note-${note.id}`,
            title: note.title,
            coords: {
                top:  NOTE_BASE_Y + row * (NOTE_H + NOTE_GAP) + jitter(note.id * 3 + 2, 12),
                left: NOTE_BASE_X + col * (NOTE_W + NOTE_GAP) + jitter(note.id * 7 + 4, 12),
            },
            size: { width: NOTE_W, height: NOTE_H },
            Component: componentMap['note'],
            props: { note },
        };
    });

    // ── Static sections: fixed positions, no jitter
    const finalBaseSections: Section[] = baseSections.map(sectionInfo => {
      let props = {};
      const layout = sectionLayouts[sectionInfo.id];

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
          Component: componentMap[sectionInfo.id],
          props,
      };
    })

    return [
        ...finalBaseSections,
        ...tweetSections,
        ...projectSections,
        ...noteSections,
    ];
}
