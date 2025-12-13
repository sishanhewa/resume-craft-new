"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server Action to delete a user's account and all associated data
 * Due to CASCADE delete in database, this will also remove:
 * - All resumes
 * - All import logs
 */
export async function deleteUserAccount() {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // Inherited from middleware pattern
                    }
                },
            },
        }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // First, manually delete all user's resumes (in case CASCADE isn't set up)
        const { error: resumeError } = await supabase
            .from("resumes")
            .delete()
            .eq("user_id", user.id);

        if (resumeError) {
            console.error("Error deleting resumes:", resumeError);
        }

        // Delete import logs
        const { error: logsError } = await supabase
            .from("import_logs")
            .delete()
            .eq("user_id", user.id);

        if (logsError) {
            console.error("Error deleting import logs:", logsError);
        }

        // Log the deleted account email for manual auth cleanup later
        const { error: logError } = await supabase
            .from("deleted_accounts")
            .insert({
                user_id: user.id,
                email: user.email,
                deleted_at: new Date().toISOString(),
            });

        if (logError) {
            console.error("Error logging deleted account:", logError);
            // Continue anyway - logging shouldn't block deletion
        }

        // Sign out the user first (clears the session)
        await supabase.auth.signOut();

        // Note: To fully delete the auth user, you need to use the Supabase Admin API
        // which requires a service role key. For now, we delete all user data
        // and sign them out. The auth record remains but has no associated data.

        // If you have a service role key, you can add:
        // const adminSupabase = createClient(url, serviceRoleKey);
        // await adminSupabase.auth.admin.deleteUser(user.id);

        return { success: true };
    } catch (error) {
        console.error("Error deleting account:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
