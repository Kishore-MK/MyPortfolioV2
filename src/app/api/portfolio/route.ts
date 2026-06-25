import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { PortfolioData } from '@/lib/portfolio-data';

export async function GET() {
  try {
    const [aboutData, skillsData, projectsData, experienceData, tweetsData, contactData, socialLinksData, notesData] =
      await Promise.all([
        db.query.about.findFirst(),
        db.query.skills.findMany(),
        db.query.projects.findMany(),
        db.query.experience.findMany(),
        db.query.tweets.findMany(),
        db.query.contact.findFirst(),
        db.query.socialLinks.findMany(),
        db.query.notes.findMany({ orderBy: [desc(schema.notes.createdAt)] }),
      ]);

    if (!aboutData || !contactData) {
      throw new Error('Core portfolio data (about, contact) is missing.');
    }

    const groupedSkills = skillsData.reduce((acc, skill) => {
      const { category, ...rest } = skill;
      if (!acc[category]) acc[category] = [];
      acc[category].push(rest);
      return acc;
    }, {} as PortfolioData['skills']);

    const portfolioData: PortfolioData = {
      about: {
        paragraphs: aboutData.paragraphs,
        avatar: {
          src: aboutData.avatarSrc,
          alt: aboutData.avatarAlt,
          hint: aboutData.avatarHint,
        },
      },
      skills: groupedSkills,
      projects: projectsData,
      experience: experienceData,
      tweets: tweetsData,
      contact: { ...contactData, socialLinks: socialLinksData },
      notes: notesData.map(n => ({
        id: n.id,
        title: n.title,
        body: n.body,
        createdAt: n.createdAt.toISOString(),
      })),
    };

    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const portfolioData: PortfolioData = await request.json();

  try {
    await db.transaction(async (tx) => {
      const { about, projects, experience, tweets, skills, contact } = portfolioData;

      const existingAbout = await tx.query.about.findFirst({ where: eq(schema.about.id, 1) });
      if (!existingAbout) {
        await tx.insert(schema.about).values({
          id: 1,
          paragraphs: about.paragraphs,
          avatarSrc: about.avatar.src,
          avatarAlt: about.avatar.alt,
          avatarHint: about.avatar.hint,
        });
      } else {
        await tx.update(schema.about)
          .set({
            paragraphs: about.paragraphs,
            avatarSrc: about.avatar.src,
            avatarAlt: about.avatar.alt,
            avatarHint: about.avatar.hint,
          })
          .where(eq(schema.about.id, 1));
      }

      await tx.delete(schema.projects);
      if (projects.length > 0) await tx.insert(schema.projects).values(projects);

      await tx.delete(schema.experience);
      if (experience.length > 0) await tx.insert(schema.experience).values(experience);

      await tx.delete(schema.tweets);
      if (tweets.length > 0) await tx.insert(schema.tweets).values(tweets);

      await tx.delete(schema.skills);
      const skillsToInsert = Object.entries(skills).flatMap(([category, skillItems]) =>
        skillItems.map(skill => ({ ...skill, category }))
      );
      if (skillsToInsert.length > 0) await tx.insert(schema.skills).values(skillsToInsert);

      const existingContact = await tx.query.contact.findFirst({ where: eq(schema.contact.id, 1) });
      if (!existingContact) await tx.insert(schema.contact).values({ id: 1 });

      await tx.delete(schema.socialLinks);
      if (contact.socialLinks.length > 0) {
        await tx.insert(schema.socialLinks).values(
          contact.socialLinks.map(link => ({ ...link, contactId: 1 }))
        );
      }
    });

    return NextResponse.json({ message: 'Portfolio data saved successfully' });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
  }
}
