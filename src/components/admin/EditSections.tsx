
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortfolioData } from '@/lib/portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';
 

// Helper component for repeatable sections like projects, skills, etc.
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

export function EditSections() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Set this to true to use Supabase
  const useLiveData = true;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3001';
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      if (useLiveData) {
        const res = await fetch(`${baseUrl}/api/portfolio`);
        const data = await res.json();
        setPortfolioData(data);
      } 
      // else {
      //   setPortfolioData(mockPortfolioData);
      // }
      setLoading(false);
    }
    loadData();
  }, [useLiveData])

  const handleSave = async () => {
    if (!portfolioData) return;
    setIsSaving(true);
    
    if (true) {
      try {
        const response = await fetch(`${baseUrl}/api/portfolio`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(portfolioData),
        });

        if (!response.ok) {
          throw new Error('Failed to save data');
        }
        
        alert('Data saved successfully!');
      } catch (error) {
        console.error('Error saving data:', error);
        alert('Failed to save data.');
      } finally {
        setIsSaving(false);
      }
    } 
  };

  const handleSimpleChange = (section: keyof PortfolioData, field: string, value: string | string[] | { src: string; alt: string; hint: string; }) => {
    if (!portfolioData) return;
    setPortfolioData(prev => ({
      ...prev!,
      [section]: {
        ...(prev![section] as any),
        [field]: value,
      },
    }));
  };
  
  const handleNestedChange = (section: keyof PortfolioData, index: number, field: string, value: any) => {
    if (!portfolioData) return;
    setPortfolioData(prev => {
        const list = (prev![section] as any[]).map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        return { ...prev!, [section]: list };
    });
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
        <div className="container mx-auto py-10 px-6">
            <div className="space-y-4">
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      )
  }

  return (
    <div className="bg-muted/40 min-h-screen">
        <header className="bg-background border-b">
            <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </header>
        
        <main className="container mx-auto py-10 px-6">
           <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="tweets">Tweets</TabsTrigger>
                <TabsTrigger value="blogs">Blogs</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card>
                    <CardHeader>
                        <CardTitle>About Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="about-p1">Paragraph 1</Label>
                            <Textarea id="about-p1" value={portfolioData.about.paragraphs[0]} onChange={e => handleSimpleChange('about', 'paragraphs', [e.target.value, portfolioData.about.paragraphs[1]])} />
                        </div>
                        <div>
                            <Label htmlFor="about-p2">Paragraph 2</Label>
                            <Textarea id="about-p2" value={portfolioData.about.paragraphs[1]} onChange={e => handleSimpleChange('about', 'paragraphs', [portfolioData.about.paragraphs[0], e.target.value])} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="avatar-src">Avatar Image URL</Label>
                                <Input id="avatar-src" value={portfolioData.about.avatar.src} onChange={e => handleSimpleChange('about', 'avatar', {...portfolioData.about.avatar, src: e.target.value})} />
                            </div>
                            <div>
                                <Label htmlFor="avatar-alt">Avatar Alt Text</Label>
                                <Input id="avatar-alt" value={portfolioData.about.avatar.alt} onChange={e => handleSimpleChange('about', 'avatar', {...portfolioData.about.avatar, alt: e.target.value})} />
                            </div>
                            <div>
                                <Label htmlFor="avatar-hint">Avatar AI Hint</Label>
                                <Input id="avatar-hint" value={portfolioData.about.avatar.hint} onChange={e => handleSimpleChange('about', 'avatar', {...portfolioData.about.avatar, hint: e.target.value})} />
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
                    onRemove={(index) => handleRemoveItem('projects', index)}
                    onChange={(index, field, value) => handleNestedChange('projects', index, field as string, value)}
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
                    onRemove={(index) => handleRemoveItem('experience', index)}
                    onChange={(index, field, value) => handleNestedChange('experience', index, field as string, value)}
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
                    onRemove={index => handleRemoveItem('tweets', index)}
                    onChange={(index, field, value) => handleNestedChange('tweets', index, field as string, value)}
                    renderItem={(item, index, onChange) => (
                        <div className="space-y-2">
                            <Label>Tweet ID</Label><Input value={item.tweetId} onChange={e => onChange(index, 'tweetId', e.target.value)} />
                        </div>
                    )}
                />
              </TabsContent>

               <TabsContent value="blogs">
                <EditableSection
                    title="Blogs"
                    data={portfolioData.blogs}
                    onAdd={() => handleAddItem('blogs', { title: '', description: '', image: 'https://placehold.co/600x400.png', hint: '', tags: [], link: '#' })}
                    onRemove={(index) => handleRemoveItem('blogs', index)}
                    onChange={(index, field, value) => handleNestedChange('blogs', index, field as string, value)}
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
            </Tabs>
        </main>
    </div>
  );
}