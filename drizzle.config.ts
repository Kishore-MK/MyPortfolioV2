import type { Config } from 'drizzle-kit';
import 'dotenv/config';
import { connection } from 'next/server';

console.log('Drizzle config loaded with DATABASE_URL:', process.env.NEXT_PUBLIC_DATABASE_URL);

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file');
}

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
};
