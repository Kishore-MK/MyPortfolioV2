import React from 'react';
import { Card } from '@/components/ui/card';
import { PortfolioData } from '@/lib/portfolio-data';
import { TweetsSection } from './TweetsSection';
import { ProjectsSection } from './ProjectsSection';
import { NotesSection } from './NotesSection';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperienceSection';
import { ContactSection } from './ContactSection';

export function MobileView({ portfolioData }: { portfolioData: PortfolioData }) {

  const regularSections = [
      { id: 'about', title: 'About Me', Component: AboutSection, props: { about: portfolioData.about } },
      { id: 'skills', title: 'Skills', Component: SkillsSection, props: { skills: portfolioData.skills } },
      { id: 'experience', title: 'Experience', Component: ExperienceSection, props: { experiences: portfolioData.experience } },
      { id: 'contact', title: 'Contact', Component: ContactSection, props: { contact: portfolioData.contact } },
  ];
  const tweetSections = portfolioData.tweets;
  const projectSections = portfolioData.projects;
  const noteSections = portfolioData.notes;

  return (
    <div className="w-full min-h-screen bg-background overflow-y-auto">
      <div className="flex flex-col gap-12 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="py-8 text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">I'm Kishore</h1>
        </header>

        {regularSections.map(({ id, title, Component, props }) => (
          <section key={id} id={id} className="w-full">
            <h2 className="font-headline text-3xl font-semibold mb-6 border-b-2 border-primary pb-2">{title}</h2>
            <Card className="bg-card/80 backdrop-blur-sm border-none shadow-lg">
                <Component {...(props as any)} />
            </Card>
          </section>
        ))}

         <section id="projects" className="w-full">
            <h2 className="font-headline text-3xl font-semibold mb-6 border-b-2 border-primary pb-2">Projects</h2>
             <div className="space-y-6">
                {projectSections.map((project, index) => (
                    <Card key={index} className="bg-card/80 backdrop-blur-sm border-none shadow-lg">
                        <ProjectsSection project={project} />
                    </Card>
                ))}
            </div>
         </section>

         <section id="notes" className="w-full">
            <h2 className="font-headline text-3xl font-semibold mb-6 border-b-2 border-primary pb-2">Notes</h2>
             <div className="space-y-6">
                {noteSections.map((note) => (
                    <Card key={note.id} className="bg-card/80 backdrop-blur-sm border-none shadow-lg">
                        <NotesSection note={note} />
                    </Card>
                ))}
            </div>
         </section>

         <section id="tweets" className="w-full">
            <h2 className="font-headline text-3xl font-semibold mb-6 border-b-2 border-primary pb-2">Tweets</h2>
             <div className="space-y-6">
                {tweetSections.map((tweet, index) => (
                    <Card key={index} className="bg-card/80 backdrop-blur-sm border-none shadow-lg">
                        <TweetsSection tweet={tweet} />
                    </Card>
                ))}
            </div>
         </section>
      </div>
    </div>
  );
}
