"use client";

import { useState } from "react";
import { FileText, Check, PenLine, Eye } from "lucide-react";
import Link from "next/link";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { createEmptyResumeContent, type ResumeContent } from "@/types/resume";
import { getTemplateList } from "@/components/resume/templates";

export default function CreateResumePage() {
    const [mobileView, setMobileView] = useState<"form" | "preview">("form");
    const [selectedTemplate, setSelectedTemplate] = useState("professional");
    const [resumeData, setResumeData] = useState<ResumeContent>(
        createEmptyResumeContent()
    );

    const templates = getTemplateList();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-white/20 dark:border-white/10">
                <div className="max-w-[1800px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                            ResumeCraft
                        </span>
                    </Link>

                    {/* Mobile Toggle - Only visible on mobile */}
                    <div className="flex lg:hidden bg-zinc-100 dark:bg-zinc-800 rounded-full p-1">
                        <button
                            onClick={() => setMobileView("form")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${mobileView === "form"
                                ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white"
                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                }`}
                        >
                            <PenLine className="w-4 h-4" />
                            Edit
                        </button>
                        <button
                            onClick={() => setMobileView("preview")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${mobileView === "preview"
                                ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white"
                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                }`}
                        >
                            <Eye className="w-4 h-4" />
                            Preview
                        </button>
                    </div>

                    {/* Desktop label */}
                    <div className="hidden lg:flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live Preview
                        </span>
                    </div>
                </div>
            </nav>

            {/* Split Screen Layout */}
            <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
                {/* Left Panel - Form (Desktop: always visible, Mobile: toggle) */}
                <div className={`lg:w-1/2 xl:w-[45%] lg:border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto ${mobileView === "form" ? "block" : "hidden lg:block"
                    }`}>
                    <div className="max-w-2xl mx-auto px-4 md:px-6 py-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                                Create Your Resume
                            </h1>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Fill in your details — preview updates live on the right
                            </p>
                        </div>

                        {/* Template Selection */}
                        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 mb-6">
                            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                                Choose Template
                            </h2>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {templates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`relative flex-shrink-0 w-24 p-2 rounded-lg border-2 transition-all ${selectedTemplate === template.id
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                                            : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                                            }`}
                                    >
                                        {/* Mini Template Preview */}
                                        <div className={`aspect-[3/4] rounded mb-2 ${template.id === "professional"
                                            ? "bg-gradient-to-br from-zinc-700 to-zinc-900"
                                            : "bg-gradient-to-br from-zinc-100 to-zinc-200"
                                            }`}>
                                            <div className={`w-full h-full flex ${template.id === "professional" ? "flex-row" : "flex-col"}`}>
                                                {template.id === "professional" ? (
                                                    <>
                                                        <div className="w-1/3 bg-zinc-800 h-full" />
                                                        <div className="flex-1 bg-white" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="h-1/5 bg-white" />
                                                        <div className="flex-1 flex">
                                                            <div className="w-1/3 bg-zinc-50" />
                                                            <div className="flex-1 bg-white" />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-xs font-medium text-zinc-900 dark:text-white text-center truncate">
                                            {template.name}
                                        </p>
                                        {selectedTemplate === template.id && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Resume Form */}
                        <ResumeForm
                            data={resumeData}
                            onChange={setResumeData}
                            onNext={() => setMobileView("preview")}
                        />
                    </div>
                </div>

                {/* Right Panel - Preview (Desktop: always visible, Mobile: toggle) */}
                <div className={`lg:w-1/2 xl:w-[55%] overflow-y-auto bg-zinc-100 dark:bg-zinc-900/50 ${mobileView === "preview" ? "block" : "hidden lg:block"
                    }`}>
                    <div className="p-4 md:p-6 lg:p-8">
                        {/* Preview Header - Mobile only */}
                        <div className="lg:hidden mb-4">
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                                Resume Preview
                            </h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Template: {templates.find(t => t.id === selectedTemplate)?.name}
                            </p>
                        </div>

                        {/* Resume Preview */}
                        <div className="lg:sticky lg:top-6">
                            <ResumePreview
                                data={resumeData}
                                templateId={selectedTemplate}
                                onBack={() => setMobileView("form")}
                                hideBackButton={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


