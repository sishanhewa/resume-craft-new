"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Link from "next/link";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { createEmptyResumeContent, type ResumeContent } from "@/types/resume";

export default function CreateResumePage() {
    const [view, setView] = useState<"form" | "preview">("form");
    const [resumeData, setResumeData] = useState<ResumeContent>(
        createEmptyResumeContent()
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-white/20 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                            ResumeCraft
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-full p-1">
                            <button
                                onClick={() => setView("form")}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === "form"
                                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white"
                                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                    }`}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setView("preview")}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === "preview"
                                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white"
                                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                    }`}
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                        {view === "form" ? "Create Your Resume" : "Resume Preview"}
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {view === "form"
                            ? "Fill in your details to generate a professional resume"
                            : "Here's how your resume will look"}
                    </p>
                </div>

                {view === "form" ? (
                    <ResumeForm
                        data={resumeData}
                        onChange={setResumeData}
                        onNext={() => setView("preview")}
                    />
                ) : (
                    <ResumePreview data={resumeData} onBack={() => setView("form")} />
                )}
            </main>
        </div>
    );
}
