"use client";

import { useState, useEffect, useCallback } from "react";
import { FileText, Check, PenLine, Eye, Save, Loader2, Home } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";
import { debounce } from "lodash";

import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ExportButtons } from "@/components/resume/ExportButtons";
import { Button } from "@/components/ui/button";

import { ResumeChoiceModal } from "@/components/resume/ResumeChoiceModal";
import { TemplatePreviewCard } from "@/components/resume/TemplatePreviewCard";
import { createEmptyResumeContent, type ResumeContent } from "@/types/resume";
import { getTemplateList } from "@/components/resume/templates";

// Define debounce at module level outside component to prevent recreation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEBOUNCE_DELAY = 2000;

import { AuthModal } from "@/components/auth/AuthModal";

export default function CreateResumePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const resumeId = searchParams.get("id");

    const [showChoiceModal, setShowChoiceModal] = useState(!resumeId);
    const [showAuthModal, setShowAuthModal] = useState(false); // State for Auth Modal
    const [mobileView, setMobileView] = useState<"form" | "preview">("form");
    const [selectedTemplate, setSelectedTemplate] = useState("professional");
    const [resumeData, setResumeData] = useState<ResumeContent>(
        createEmptyResumeContent()
    );

    // Saving state
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);
    const [userId, setUserId] = useState<string | null>(null);

    const templates = getTemplateList();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Check auth on mount and handle localStorage
    useEffect(() => {
        // 1. Check User
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUserId(session.user.id);
            }
        });

        // 2. Load from LocalStorage if creating new resume (no ID yet)
        if (!resumeId) {
            const savedData = localStorage.getItem("resume-craft-autosave");
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    setResumeData(parsed.resumeData);
                    setSelectedTemplate(parsed.selectedTemplate || "professional");
                    toast.info("Restored your unsaved progress");
                } catch (e) {
                    console.error("Failed to parse autosave", e);
                }
            }
        }

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, resumeId]);

    // Autosave to LocalStorage
    useEffect(() => {
        if (!resumeId) {
            const debouncedSave = setTimeout(() => {
                localStorage.setItem("resume-craft-autosave", JSON.stringify({
                    resumeData,
                    selectedTemplate
                }));
            }, 1000);
            return () => clearTimeout(debouncedSave);
        }
    }, [resumeData, selectedTemplate, resumeId]);

    // Load resume if ID exists
    useEffect(() => {
        if (resumeId) {
            const fetchResume = async () => {
                const { data, error } = await supabase
                    .from("resumes")
                    .select("*")
                    .eq("id", resumeId)
                    .single();

                if (data) {
                    setResumeData(data.content as ResumeContent);
                    setCurrentResumeId(data.id);
                    if (data.template_id) {
                        setSelectedTemplate(data.template_id);
                    }
                }

                if (error) {
                    toast.error("Error loading resume");
                    console.error(error);
                }
            };
            fetchResume();
        }
    }, [resumeId, supabase]);

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

    const saveResume = async () => {
        if (!userId) {
            // Show Auth Modal instead of redirecting
            setShowAuthModal(true);
            return;
        }

        setIsSaving(true);
        try {
            const title = resumeData.header.fullName
                ? `${resumeData.header.fullName}'s Resume`
                : "Untitled Resume";

            const payload = {
                user_id: userId,
                title,
                content: resumeData,
                template_id: selectedTemplate,
                updated_at: new Date().toISOString(),
            };

            const { data, error } = await supabase
                .from("resumes")
                .upsert(
                    currentResumeId ? { id: currentResumeId, ...payload } : payload
                )
                .select()
                .single();

            if (error) throw error;

            if (data) {
                setCurrentResumeId(data.id);
                setLastSaved(new Date());

                // Clear autosave as we have successfully persisted to DB
                localStorage.removeItem("resume-craft-autosave");

                if (!currentResumeId) {
                    // Update URL without refresh if creating new
                    window.history.replaceState(null, "", `/create-resume?id=${data.id}`);
                }
            }
        } catch (error) {
            console.error("Error saving resume:", error);
            toast.error("Failed to save resume");
        } finally {
            setIsSaving(false);
        }
    };

    // Manual Save Button
    const handleManualSave = () => {
        if (!userId) {
            toast.info("Please sign in to save your resume");
            setShowAuthModal(true);
            return;
        }
        saveResume();
        toast.success("Resume saved successfully");
    };

    return (
        <>
            {/* Resume Creation Choice Modal */}
            <ResumeChoiceModal
                isOpen={showChoiceModal}
                onStartFromScratch={handleStartFromScratch}
                onImport={handleImport}
                isAuthenticated={!!userId}
                onAuthRequested={() => setShowAuthModal(true)}
            />

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-white/20 dark:border-white/10">
                    <div className="max-w-[1800px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                        <Link href={userId ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                            {userId ? <Home className="w-5 h-5 text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white transition-colors" /> : (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                                {userId ? "Dashboard" : "ResumeCraft"}
                            </span>
                        </Link>

                        {/* Save Info & Actions */}
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex flex-col items-end mr-2">
                                <span className="text-xs text-zinc-400 font-medium">
                                    {isSaving ? "Saving..." : lastSaved ? `Saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : userId ? "Unsaved changes" : ""}
                                </span>
                            </div>

                            <Button
                                onClick={handleManualSave}
                                variant="outline"
                                size="sm"
                                disabled={isSaving}
                                className="hidden sm:flex"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                {userId ? "Save" : "Login to Save"}
                            </Button>

                            {/* Mobile Toggle */}
                            <div className="flex lg:hidden bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 ml-2">
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
