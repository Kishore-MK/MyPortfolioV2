'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Loader2, PenLine } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortfolioData, Note } from '@/lib/portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';
import { NoteEditor } from './NoteEditor';

function EditableSection<T>({
  title,
  data,
  renderItem,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  data: T[];
  renderItem: (item: T, index: number, onChange: (index: number, field: keyof T, value: any) => void) => React.ReactNode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof T, value: any) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex justify-between items-center">
          {title}
          <Button onClick={onAdd} size="sm">Add New</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg relative bg-background/50">
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7"
              onClick={() => onRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            {renderItem(item, index, onChange)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function NotesTab() {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Compose / edit state — null means composing new, a number means editing that note's id
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/notes')
      .then(r => r.json())
      .then(data => { setNotesList(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setBody('');
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setBody(note.body);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!title.trim() || !body.trim() || body === '<p></p>') {
      alert('Please add a title and some content.');
      return;
    }
    setSaving(true);
    try {
      if (editingId !== null) {
        // Update existing note
        const res = await fetch(`/api/notes/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body }),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        const updated = await res.json();
        setNotesList(prev => prev.map(n => n.id === editingId ? updated : n));
      } else {
        // Create new note
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body }),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        const newNote = await res.json();
        setNotesList(prev => [newNote, ...prev]);
      }
      resetForm();
    } catch (err) {
      alert('Failed to save: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setNotesList(prev => prev.filter(n => n.id !== id));
      if (editingId === id) resetForm();
    } catch {
      alert('Failed to delete note.');
    } finally {
      setDeletingId(null);
    }
  };

  const isEditing = editingId !== null;

  return (
    <div className="space-y-8">
      {/* Compose / Edit form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <PenLine className="w-5 h-5" />
              {isEditing ? 'Edit Note' : 'New Note'}
            </span>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="note-title">Title</Label>
            <Input
              id="note-title"
              placeholder="Give your note a title…"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Body</Label>
            <div className="mt-1">
              <NoteEditor key={editingId ?? 'new'} content={body} onChange={setBody} />
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving
              ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isEditing ? 'Saving…' : 'Publishing…'}</>
              : isEditing ? 'Save Changes' : 'Publish Note'}
          </Button>
        </CardContent>
      </Card>

      {/* Published notes list */}
      <Card>
        <CardHeader>
          <CardTitle>Published Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading && <Skeleton className="h-16 w-full" />}
          {!loading && notesList.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No notes yet.</p>
          )}
          {notesList.map(note => (
            <div
              key={note.id}
              className={`flex items-start justify-between gap-4 border rounded-lg p-4 transition-colors ${
                editingId === note.id ? 'border-primary bg-primary/5' : 'bg-background/50'
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{note.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  disabled={editingId === note.id}
                  onClick={() => startEdit(note)}
                  title="Edit"
                >
                  <PenLine className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-7 w-7"
                  disabled={deletingId === note.id}
                  onClick={() => handleDelete(note.id)}
                  title="Delete"
                >
                  {deletingId === note.id
                    ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    : <Trash2 className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function EditSections() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => { setPortfolioData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!portfolioData) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioData),
      });
      if (!res.ok) throw new Error('Failed to save data');
      alert('Saved successfully!');
    } catch (err) {
      alert('Failed to save.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSimpleChange = (section: keyof PortfolioData, field: string, value: any) => {
    if (!portfolioData) return;
    setPortfolioData(prev => ({
      ...prev!,
      [section]: { ...(prev![section] as any), [field]: value },
    }));
  };

  const handleNestedChange = (section: keyof PortfolioData, index: number, field: string, value: any) => {
    if (!portfolioData) return;
    setPortfolioData(prev => ({
      ...prev!,
      [section]: (prev![section] as any[]).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddItem = (section: keyof PortfolioData, newItem: any) => {
    if (!portfolioData) return;
    setPortfolioData(prev => ({
      ...prev!,
      [section]: [...(prev![section] as any[]), newItem],
    }));
  };

  const handleRemoveItem = (section: keyof PortfolioData, index: number) => {
    if (!portfolioData) return;
    setPortfolioData(prev => ({
      ...prev!,
      [section]: (prev![section] as any[]).filter((_, i) => i !== index),
    }));
  };

  if (loading || !portfolioData) {
    return (
      <div className="container mx-auto py-10 px-6 space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-muted/40 min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-10 px-6">
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="tweets">Tweets</TabsTrigger>
          </TabsList>

          <TabsContent value="notes">
            <NotesTab />
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader><CardTitle>About Section</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Paragraph 1</Label>
                  <Textarea
                    value={portfolioData.about.paragraphs[0]}
                    onChange={e => handleSimpleChange('about', 'paragraphs', [e.target.value, portfolioData.about.paragraphs[1]])}
                  />
                </div>
                <div>
                  <Label>Paragraph 2</Label>
                  <Textarea
                    value={portfolioData.about.paragraphs[1]}
                    onChange={e => handleSimpleChange('about', 'paragraphs', [portfolioData.about.paragraphs[0], e.target.value])}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Avatar Image URL</Label>
                    <Input value={portfolioData.about.avatar.src} onChange={e => handleSimpleChange('about', 'avatar', { ...portfolioData.about.avatar, src: e.target.value })} />
                  </div>
                  <div>
                    <Label>Avatar Alt Text</Label>
                    <Input value={portfolioData.about.avatar.alt} onChange={e => handleSimpleChange('about', 'avatar', { ...portfolioData.about.avatar, alt: e.target.value })} />
                  </div>
                  <div>
                    <Label>Avatar AI Hint</Label>
                    <Input value={portfolioData.about.avatar.hint} onChange={e => handleSimpleChange('about', 'avatar', { ...portfolioData.about.avatar, hint: e.target.value })} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <EditableSection
              title="Projects"
              data={portfolioData.projects}
              onAdd={() => handleAddItem('projects', { title: '', description: '', image: 'https://placehold.co/600x400.png', hint: '', tags: [], link: '#' })}
              onRemove={i => handleRemoveItem('projects', i)}
              onChange={(i, field, value) => handleNestedChange('projects', i, field as string, value)}
              renderItem={(item, index, onChange) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label><Input value={item.title} onChange={e => onChange(index, 'title', e.target.value)} />
                    <Label>Description</Label><Textarea value={item.description} onChange={e => onChange(index, 'description', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label><Input value={item.image} onChange={e => onChange(index, 'image', e.target.value)} />
                    <Label>AI Hint</Label><Input value={item.hint} onChange={e => onChange(index, 'hint', e.target.value)} />
                    <Label>Tags (comma separated)</Label><Input value={item.tags.join(', ')} onChange={e => onChange(index, 'tags', e.target.value.split(',').map(s => s.trim()))} />
                    <Label>Link</Label><Input value={item.link} onChange={e => onChange(index, 'link', e.target.value)} />
                  </div>
                </div>
              )}
            />
          </TabsContent>

          <TabsContent value="experience">
            <EditableSection
              title="Experience"
              data={portfolioData.experience}
              onAdd={() => handleAddItem('experience', { role: '', company: '', period: '', description: '' })}
              onRemove={i => handleRemoveItem('experience', i)}
              onChange={(i, field, value) => handleNestedChange('experience', i, field as string, value)}
              renderItem={(item, index, onChange) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role</Label><Input value={item.role} onChange={e => onChange(index, 'role', e.target.value)} />
                    <Label>Company</Label><Input value={item.company} onChange={e => onChange(index, 'company', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label><Input value={item.period} onChange={e => onChange(index, 'period', e.target.value)} />
                    <Label>Description</Label><Textarea value={item.description} onChange={e => onChange(index, 'description', e.target.value)} />
                  </div>
                </div>
              )}
            />
          </TabsContent>

          <TabsContent value="tweets">
            <EditableSection
              title="Tweets"
              data={portfolioData.tweets}
              onAdd={() => handleAddItem('tweets', { tweetId: '' })}
              onRemove={i => handleRemoveItem('tweets', i)}
              onChange={(i, field, value) => handleNestedChange('tweets', i, field as string, value)}
              renderItem={(item, index, onChange) => (
                <div className="space-y-2">
                  <Label>Tweet ID</Label>
                  <Input value={item.tweetId} onChange={e => onChange(index, 'tweetId', e.target.value)} />
                </div>
              )}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
