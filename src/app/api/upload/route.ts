import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const BUCKET = 'note-images';
const MAX_SIZE_MB = 5;

// Allowlist of safe raster formats only — SVG excluded (can contain scripts)
const ALLOWED: Record<string, { ext: string; magic: number[][] }> = {
  'image/jpeg': { ext: 'jpg',  magic: [[0xFF, 0xD8, 0xFF]] },
  'image/png':  { ext: 'png',  magic: [[0x89, 0x50, 0x4E, 0x47]] },
  'image/gif':  { ext: 'gif',  magic: [[0x47, 0x49, 0x46, 0x38]] },
  'image/webp': { ext: 'webp', magic: [[0x52, 0x49, 0x46, 0x46]] },
};

function matchesMagic(bytes: Uint8Array, magic: number[][]): boolean {
  return magic.some(sig => sig.every((b, i) => bytes[i] === b));
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const format = ALLOWED[file.type];
    if (!format) {
      return NextResponse.json(
        { error: 'Unsupported file type. Allowed: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `Image must be under ${MAX_SIZE_MB}MB` }, { status: 400 });
    }

    // Read the file and validate magic bytes — client-declared Content-Type is not trusted
    const buffer = await file.arrayBuffer();
    const header = new Uint8Array(buffer.slice(0, 12));
    if (!matchesMagic(header, format.magic)) {
      return NextResponse.json({ error: 'File content does not match declared type' }, { status: 400 });
    }

    // Filename is fully server-generated — no client input used
    const filename = `${crypto.randomUUID()}.${format.ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(filename);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
