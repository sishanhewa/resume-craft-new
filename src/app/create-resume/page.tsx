"use client";

import { useState } from "react";
import { FileText, Check, PenLine, Eye } from "lucide-react";
import Link from "next/link";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ExportButtons } from "@/components/resume/ExportButtons";

import { ResumeChoiceModal } from "@/components/resume/ResumeChoiceModal";
import { TemplatePreviewCard } from "@/components/resume/TemplatePreviewCard";
import { createEmptyResumeContent, type ResumeContent } from "@/types/resume";
import { getTemplateList } from "@/components/resume/templates";

export default function CreateResumePage() {
    const [showChoiceModal, setShowChoiceModal] = useState(true);
    const [mobileView, setMobileView] = useState<"form" | "preview">("form");
    const [selectedTemplate, setSelectedTemplate] = useState("professional");
    const [resumeData, setResumeData] = useState<ResumeContent>(
        createEmptyResumeContent()
    );

    const templates = getTemplateList();

    // Handle imported resume data
    const handleImport = (importedData: Partial<ResumeContent>) => {
        setResumeData(prev => ({
            ...prev,
            header: { ...prev.header, ...importedData.header },
            contact: { ...prev.contact, ...importedData.contact },
            profile: importedData.profile || prev.profile,
            skills: importedData.skills?.length ? importedData.skills : prev.skills,
            languages: importedData.languages?.length ? importedData.languages : prev.languages,
            experience: importedData.experience?.length ? importedData.experience : prev.experience,
            education: importedData.education?.length ? importedData.education : prev.education,
            projects: importedData.projects?.length ? importedData.projects : prev.projects,
            certifications: importedData.certifications?.length ? importedData.certifications : prev.certifications,
            awards: importedData.awards?.length ? importedData.awards : prev.awards,
            volunteer: importedData.volunteer?.length ? importedData.volunteer : prev.volunteer,
            publications: importedData.publications?.length ? importedData.publications : prev.publications,
            interests: importedData.interests?.length ? importedData.interests : prev.interests,
        }));
        setShowChoiceModal(false);
    };

    const handleStartFromScratch = () => {
        setShowChoiceModal(false);
    };

    return (
        <>
            {/* Resume Creation Choice Modal */}
            <ResumeChoiceModal
                isOpen={showChoiceModal}
                onStartFromScratch={handleStartFromScratch}
                onImport={handleImport}
            />

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
                                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                                    Create Your Resume
                                </h1>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Fill in your details — preview updates live
                                </p>
                            </div>

                            {/* Template Selection */}
                            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 mb-6">
                                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                                    Choose Template
                                </h2>
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {templates.map((template) => (
                                        <TemplatePreviewCard
                                            key={template.id}
                                            templateId={template.id}
                                            templateName={template.name}
                                            isSelected={selectedTemplate === template.id}
                                            onSelect={() => setSelectedTemplate(template.id)}
                                        />
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

                            {/* Export Buttons */}
                            <div className="flex justify-center mb-6">
                                <ExportButtons
                                    filename={resumeData.header.fullName || "resume"}
                                />
                            </div>

                            {/* Resume Preview */}
                            <div id="resume-print-area" className="lg:sticky lg:top-6">
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
        </>
    );
}
