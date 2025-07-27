import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is not set in .env.local");
}

if (!supabaseAnonKey) {
    throw new Error("SUPABASE_ANON_KEY is not set in .env.local");
}
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey)