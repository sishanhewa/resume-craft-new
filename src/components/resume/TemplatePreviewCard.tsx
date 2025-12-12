"use client";

import { Check } from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import { sampleResumeData } from "@/lib/sample-data";

interface TemplatePreviewCardProps {
    templateId: string;
    templateName: string;
    isSelected: boolean;
    onSelect: () => void;
}

export function TemplatePreviewCard({
    templateId,
    templateName,
    isSelected,
    onSelect,
}: TemplatePreviewCardProps) {
    return (
        <button
            onClick={onSelect}
            className={`relative flex-shrink-0 w-36 p-2 rounded-xl border-2 transition-all duration-200 group hover:shadow-lg ${isSelected
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg"
                : "border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-zinc-800"
                }`}
        >
            {/* Mini Preview Container - First page only */}
            <div
                className="rounded-lg mb-2 bg-white shadow-inner relative"
                style={{
                    width: '128px',
                    height: '157px', /* 1123 * 0.14 ≈ 157 */
                    overflow: 'hidden',
                }}
            >
                {/* Clip wrapper */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '128px',
                        height: '157px',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        className="origin-top-left pointer-events-none"
                        style={{
                            transform: "scale(0.14)",
                            width: "794px",
                            height: "1123px",
                        }}
                    >
                        <div style={{ width: '794px', height: '1123px', overflow: 'hidden' }}>
                            <ResumePreview
                                data={sampleResumeData}
                                templateId={templateId}
                                hideBackButton={true}
                                isThumbnail={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Name */}
            <p className={`text-xs font-medium text-center truncate ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-zinc-700 dark:text-zinc-300"
                }`}>
                {templateName}
            </p>

            {/* Selected Checkmark */}
            {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 text-white" />
                </div>
            )}
        </button>
    );
}
