import { Note } from '@/lib/portfolio-data';

export function NotesSection({ note }: { note: Note }) {
  if (!note) return null;

  const date = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="p-6 h-full flex flex-col gap-3 overflow-auto">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-headline text-xl font-semibold leading-tight">{note.title}</h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap pt-1 font-code">{date}</span>
      </div>
      <div
        className="prose prose-sm dark:prose-invert max-w-none flex-grow
          [&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-2
          [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-3
          [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2
          [&_pre]:bg-muted [&_pre]:rounded [&_pre]:text-xs
          [&_blockquote]:border-primary [&_blockquote]:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: note.body }}
      />
    </div>
  );
}
