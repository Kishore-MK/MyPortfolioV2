import { pgTable, serial, text, varchar, integer, boolean, jsonb, primaryKey } from 'drizzle-orm/pg-core';

export const about = pgTable('about', {
  id: serial('id').primaryKey(),
  paragraphs: text('paragraphs').array().notNull(),
  avatarSrc: varchar('avatar_src', { length: 256 }).notNull(),
  avatarAlt: varchar('avatar_alt', { length: 256 }).notNull(),
  avatarHint: varchar('avatar_hint', { length: 256 }).notNull(),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  icon: varchar('icon', { length: 256 }).notNull(),
  category: varchar('category', { length: 256 }).notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 256 }).notNull(),
  hint: varchar('hint', { length: 256 }).notNull(),
  tags: text('tags').array().notNull(),
  link: varchar('link', { length: 256 }).notNull(),
});

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 256 }).notNull(),
  hint: varchar('hint', { length: 256 }).notNull(),
  tags: text('tags').array().notNull(),
  link: varchar('link', { length: 256 }).notNull(),
});

export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  role: varchar('role', { length: 256 }).notNull(),
  company: varchar('company', { length: 256 }).notNull(),
  period: varchar('period', { length: 256 }).notNull(),
  description: text('description').notNull(),
});

export const tweets = pgTable('tweets', {
    id: serial('id').primaryKey(),
    tweetId: varchar('tweetId', { length: 256 }).notNull(),
});

export const contact = pgTable('contact', {
    id: serial('id').primaryKey(),
});

export const socialLinks = pgTable('social_links', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    url: varchar('url', { length: 256 }).notNull(),
    contactId: integer('contact_id').references(() => contact.id),
});
