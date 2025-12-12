"use server";

export async function testAction() {
    return {
        success: true,
        message: "Server Action is working!",
        timestamp: new Date().toISOString(),
        env: {
            hasGemini: !!process.env.GEMINI_API_KEY,
            hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
    };
}
