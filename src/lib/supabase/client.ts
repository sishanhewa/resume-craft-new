import { createBrowserClient } from "@supabase/ssr";

// We execute the function and export the resulting client constant directly.
export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);