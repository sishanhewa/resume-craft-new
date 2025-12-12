"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function checkImportLimit() {
    try {
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
            console.error("Auth error in checkImportLimit:", authError);
            return { allowed: false, error: "Unauthorized: Could not identify user" };
        }

        // Check imports in last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

        const { data: recentImports, error } = await supabase
            .from("import_logs")
            .select("imported_at")
            .eq("user_id", user.id)
            .gte("imported_at", fiveMinutesAgo)
            .order("imported_at", { ascending: true }); // Oldest first

        if (error) {
            console.error("Error checking import limit:", error);
            return { allowed: false, error: `Failed to check limit: ${error.message}` };
        }

        const count = recentImports?.length || 0;
        const limit = 2; // Hardcoded limit for now

        // Calculate reset time if any imports exist
        let resetTime: Date | null = null;
        if (count > 0 && recentImports[0].imported_at) {
            // Reset time is 5 minutes after the oldest import in the current window
            resetTime = new Date(new Date(recentImports[0].imported_at).getTime() + 5 * 60 * 1000);
        }

        if (count >= limit) {
            return {
                allowed: false,
                error: "Import limit reached (2 per 5 mins)",
                count,
                limit,
                remaining: 0,
                resetTime
            };
        }

        return {
            allowed: true,
            count,
            limit,
            remaining: limit - count,
            resetTime
        };
    } catch (e) {
        console.error("Critical error in checkImportLimit:", e);
        return { allowed: false, error: `Critical Server Error: ${e instanceof Error ? e.message : 'Unknown'}` };
    }
}

export async function logImportAttempt(fileType: string) {
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

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Unauthorized" };

    const { error } = await supabase.from("import_logs").insert({
        user_id: user.id,
        file_type: fileType
    });

    if (error) {
        console.error("Error logging import:", error);
        return { success: false, error: "Failed to log import" };
    }

    return { success: true };
}
