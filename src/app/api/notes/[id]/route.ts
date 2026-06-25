import { NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';
import { db } from '@/lib/db';
import { notes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const noteId = parseInt(id);
    if (isNaN(noteId)) {
      return NextResponse.json({ error: 'Invalid note id' }, { status: 400 });
    }

    const { title, body } = await request.json();
    if (!title?.trim() || !body?.trim()) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
    }

    const sanitizedBody = DOMPurify.sanitize(body);
    const [updated] = await db
      .update(notes)
      .set({ title: title.trim(), body: sanitizedBody })
      .where(eq(notes.id, noteId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ ...updated, createdAt: updated.createdAt.toISOString() });
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const noteId = parseInt(id);
    if (isNaN(noteId)) {
      return NextResponse.json({ error: 'Invalid note id' }, { status: 400 });
    }

    await db.delete(notes).where(eq(notes.id, noteId));
    return NextResponse.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
