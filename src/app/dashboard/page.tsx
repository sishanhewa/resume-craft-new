import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
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
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            My Resumes
                        </h1>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${process.env.NEXT_RUNTIME === 'edge'
                                ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                                : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20"
                            }`}>
                            {process.env.NEXT_RUNTIME === 'edge' ? 'Edge Runtime' : 'Node Runtime'}
                        </span>
                    </div>
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
