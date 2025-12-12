import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { FileText, LogOut, User, Home } from "lucide-react";
import Link from "next/link";
import { ResumeCard } from "@/components/dashboard/ResumeCard";
import { CreateNewButton } from "@/components/dashboard/CreateNewButton";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
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
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch user's resumes
    const { data: resumes } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                            ResumeCraft
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900">
                                <Home className="w-4 h-4 mr-2" />
                                Home
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <User className="w-4 h-4" />
                            <span className="hidden sm:inline">{user.email}</span>
                        </div>
                        <form action="/auth/signout" method="post">
                            <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign out
                            </Button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        My Resumes
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Manage and edit your saved resumes
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <CreateNewButton />
                    {resumes?.map((resume) => (
                        <ResumeCard
                            key={resume.id}
                            id={resume.id}
                            title={resume.title}
                            content={resume.content}
                            templateId={resume.template_id}
                            updatedAt={resume.updated_at}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
