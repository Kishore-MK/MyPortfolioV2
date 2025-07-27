import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { PortfolioData } from '@/lib/portfolio-data';

export async function GET() {
  try {
    const aboutData = await db.query.about.findFirst();
    const skillsData = await db.query.skills.findMany();
    const projectsData = await db.query.projects.findMany();
    const blogsData = await db.query.blogs.findMany();
    const experienceData = await db.query.experience.findMany();
    const tweetsData = await db.query.tweets.findMany();
    const contactData = await db.query.contact.findFirst();
    const socialLinksData = await db.query.socialLinks.findMany();

    if (!aboutData || !contactData) {
      throw new Error('Core portfolio data (about, contact) is missing.');
    }
    
    // Drizzle returns a flat list of skills, but the frontend expects them grouped by category.
    const groupedSkills = skillsData.reduce((acc, skill) => {
        const { category, ...rest } = skill;
        if (!acc[category]) {
            acc[category] = [];
        }
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
      blogs: blogsData,
      experience: experienceData,
      tweets: tweetsData,
      contact: { ...contactData, socialLinks: socialLinksData },
    };

    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error('Error fetching portfolio data with Drizzle:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const portfolioData: PortfolioData = await request.json();

  try {
    await db.transaction(async (tx) => {
      const { about, projects, experience, tweets, blogs, skills, contact } = portfolioData;
      console.log(about);
      
      // Upsert 'about' section
      const existingAbout = await tx.query.about.findFirst({ where: eq(schema.about.id, 1) });
      if (!existingAbout) {
        await tx.insert(schema.about).values({ 
            id: 1, 
            paragraphs: about.paragraphs,
            avatarSrc: about.avatar.src,
            avatarAlt: about.avatar.alt,
            avatarHint: about.avatar.hint
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
      
      // Clear and re-insert 'projects'
      await tx.delete(schema.projects);
      if (projects.length > 0) {
        await tx.insert(schema.projects).values(projects);
      }

      // Clear and re-insert 'experience'
      await tx.delete(schema.experience);
       if (experience.length > 0) {
        await tx.insert(schema.experience).values(experience);
      }

      // Clear and re-insert 'tweets'
      await tx.delete(schema.tweets);
       if (tweets.length > 0) {
        await tx.insert(schema.tweets).values(tweets);
      }

      // Clear and re-insert 'blogs'
      await tx.delete(schema.blogs);
      if (blogs.length > 0) {
        await tx.insert(schema.blogs).values(blogs);
      }

      // Clear and re-insert 'skills'
      await tx.delete(schema.skills);
      const skillsToInsert = Object.entries(skills).flatMap(([category, skillItems]) => 
        skillItems.map(skill => ({ ...skill, category }))
      );
      if (skillsToInsert.length > 0) {
        await tx.insert(schema.skills).values(skillsToInsert);
      }

      // Upsert 'contact' and then handle 'socialLinks'
      const existingContact = await tx.query.contact.findFirst({ where: eq(schema.contact.id, 1) });
      if (!existingContact) {
        await tx.insert(schema.contact).values({ id: 1 });
      }
      
      await tx.delete(schema.socialLinks);
      if (contact.socialLinks.length > 0) {
        await tx.insert(schema.socialLinks).values(contact.socialLinks.map(link => ({...link, contactId: 1})));
      }

    });

    return NextResponse.json({ message: 'Portfolio data saved successfully' });
  } catch (error) {
    console.error('Error saving portfolio data with Drizzle:', error);
    return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
  }
}
