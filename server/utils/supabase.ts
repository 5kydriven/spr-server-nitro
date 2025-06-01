import { createClient } from '@supabase/supabase-js';
import { Database } from 'firebase-admin/database';

const config = useRuntimeConfig();

export const supabase = createClient<Database>(
	config.supabaseUrl,
	config.supabaseAnonKey,
);
