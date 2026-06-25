import { NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';
import { db } from '@/lib/db';
import { notes } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db.select().from(notes).orderBy(desc(notes.createdAt));
    return NextResponse.json(
      data.map(n => ({ ...n, createdAt: n.createdAt.toISOString() }))
    );
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, body } = await request.json();

    if (!title?.trim() || !body?.trim()) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
    }

    const sanitizedBody = DOMPurify.sanitize(body);
    const [note] = await db.insert(notes).values({ title: title.trim(), body: sanitizedBody }).returning();
    return NextResponse.json({ ...note, createdAt: note.createdAt.toISOString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}
