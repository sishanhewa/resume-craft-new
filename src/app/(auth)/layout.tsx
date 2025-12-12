"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLogin = pathname === "/login";

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Form Side */}
            <div className="flex items-center justify-center p-8 bg-white dark:bg-black">
                <div className="w-full max-w-sm space-y-8">
                    <div className="space-y-2 text-center">
                        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <FileText className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                                ResumeCraft
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            {isLogin ? "Welcome back" : "Create an account"}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            {isLogin
                                ? "Enter your email to sign in to your account"
                                : "Enter your email below to create your account"}
                        </p>
                    </div>

                    {children}

                    <div className="px-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        {isLogin ? (
                            <>
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                By clicking continue, you agree to our{" "}
                                <Link
                                    href="/terms"
                                    className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    Terms
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                .
                                <div className="mt-4">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Feature Showcase */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-8 border-l border-zinc-200 dark:border-zinc-800">
                <div className="w-full max-w-lg aspect-square relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="relative z-10 text-center space-y-4">
                        <div className="inline-flex p-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl mb-4">
                            <FileText className="w-12 h-12 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            Build your resume in minutes
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                            Join thousands of job seekers who have landed their dream jobs with our AI-powered resume builder.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
