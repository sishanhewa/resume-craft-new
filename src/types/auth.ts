export type { User, Session } from "@supabase/supabase-js";

export type AuthState = {
    user: import("@supabase/supabase-js").User | null;
    session: import("@supabase/supabase-js").Session | null;
    loading: boolean;
};
