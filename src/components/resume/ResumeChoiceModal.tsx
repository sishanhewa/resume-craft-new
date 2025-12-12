"use client";

import { useState, useRef, useEffect } from "react";
import { PenLine, Upload, Sparkles, Loader2 } from "lucide-react";
import { parseDocx, parsePdf } from "@/lib/import";
import type { ResumeContent } from "@/types/resume";

import { checkImportLimit, logImportAttempt } from "@/actions/imports";
import { toast } from "sonner";

interface ResumeChoiceModalProps {
    isOpen: boolean;
    onStartFromScratch: () => void;
    onImport: (data: Partial<ResumeContent>) => void;
    isAuthenticated: boolean;
    onAuthRequested: () => void;
}

export function ResumeChoiceModal({
    isOpen,
    onStartFromScratch,
    onImport,
    isAuthenticated,
    onAuthRequested
}: ResumeChoiceModalProps) {
    const [isCheckingLimit, setIsCheckingLimit] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quotaInfo, setQuotaInfo] = useState<{ remaining: number; resetTime: Date | null } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch quota info when modal opens and user is authenticated
    useEffect(() => {
        if (isOpen && isAuthenticated && !quotaInfo) {
            checkImportLimit().then((result) => {
                if ('remaining' in result) {
                    setQuotaInfo({
                        remaining: result.remaining!,
                        resetTime: result.resetTime ? new Date(result.resetTime) : null
                    });
                }
            });
        }
    }, [isOpen, isAuthenticated]);

    if (!isOpen) return null;

    const handleImportClick = () => {
        // 1. Check Auth Sync
        if (!isAuthenticated) {
            toast.info("Please login to import an existing resume");
            onAuthRequested();
            return;
        }

        // 2. Open Dialog Immediately (Sync)
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset error
        setError(null);

        // 3. Check Limit First
        setIsCheckingLimit(true);
        try {
            const result = await checkImportLimit();

            // Update quota info with latest result
            if ('remaining' in result) {
                setQuotaInfo({
                    remaining: result.remaining!,
                    resetTime: result.resetTime ? new Date(result.resetTime) : null
                });
            }

            if (!result.allowed) {
                const errorMsg = result.error || "Import limit reached";
                toast.error(errorMsg);
                setError(errorMsg);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }
        } catch (err) {
            toast.error("Failed to check import limit");
            setError("Failed to check import limit");
            return;
        } finally {
            setIsCheckingLimit(false);
        }

        // 4. Start Import
        setIsImporting(true);
        try {
            let extractedData: Partial<ResumeContent>;
            const fileType = file.name.split('.').pop()?.toLowerCase() || 'unknown';

            if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
                extractedData = await parseDocx(file);
            } else if (file.name.endsWith(".pdf")) {
                extractedData = await parsePdf(file);
            } else {
                throw new Error("Unsupported file format. Please use PDF or DOCX.");
            }

            // 5. Log usage after successful parse
            await logImportAttempt(fileType);

            onImport(extractedData);

            // Refresh quota info after successful import
            checkImportLimit().then((result) => {
                if ('remaining' in result) {
                    setQuotaInfo({
                        remaining: result.remaining!,
                        resetTime: result.resetTime ? new Date(result.resetTime) : null
                    });
                }
            });

        } catch (err) {
            console.error("Import error:", err);
            setError(err instanceof Error ? err.message : "Failed to import file");
        } finally {
            setIsImporting(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const isLoading = isCheckingLimit || isImporting;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-2xl mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 text-center">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        How would you like to start?
                    </h2>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        Build your perfect resume your way
                    </p>
                </div>

                {/* Options */}
                <div className="px-8 pb-8">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Start from Scratch - RECOMMENDED */}
                        <button
                            onClick={onStartFromScratch}
                            className="group relative p-6 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all duration-200 text-left"
                        >
                            {/* Recommended Badge */}
                            <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Recommended
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
                                <PenLine className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                                Start from Scratch
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Build your resume step by step with our guided form. Best for creating a polished, professional resume.
                            </p>
                        </button>

                        {/* Import Existing */}
                        <button
                            onClick={handleImportClick}
                            disabled={isLoading}
                            className="group p-6 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 text-left disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.docx,.doc"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mb-4 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600 transition-colors">
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 text-zinc-600 dark:text-zinc-400 animate-spin" />
                                ) : (
                                    <Upload className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                                )}
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                                {isImporting ? "Importing..." : isCheckingLimit ? "Checking..." : "Import Existing Resume"}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Upload a PDF or Word document. AI will extract your information automatically.
                                <br />
                                <span className="text-xs text-zinc-500 mt-1 block">
                                    (Login required • Limit 2/5 min)
                                    {isAuthenticated && quotaInfo !== null && (
                                        <span className="block mt-0.5 font-medium text-zinc-600 dark:text-zinc-300">
                                            {quotaInfo.remaining} remaining
                                            {quotaInfo.resetTime && quotaInfo.remaining < 2 && (
                                                <> • resets {quotaInfo.resetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>
                                            )}
                                        </span>
                                    )}
                                </span>
                            </p>
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Helper Text */}
                    <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
                        You can always import or modify your resume later
                    </p>
                </div>
            </div>
        </div>
    );
}
