"use client";

import { getTemplate } from "./templates";
import { PaginatedResume } from "./A4PageContainer";
import type { ResumeContent } from "@/types/resume";

interface ResumePreviewProps {
    data: ResumeContent;
    templateId?: string;
    onBack?: () => void;
    hideBackButton?: boolean;
}

export function ResumePreview({
    data,
    templateId = "professional",
    onBack,
    hideBackButton = false,
}: ResumePreviewProps) {
    const template = getTemplate(templateId);
    const TemplateComponent = template.component;

    // Get sidebar config from template registry (global config)
    const sidebarConfig = template.sidebar;

    return (
        <div className="space-y-6">
            {/* Back Button - only show if not hidden and onBack is provided */}
            {!hideBackButton && onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Editor
                </button>
            )}

            {/* Template Name - only show if back button is visible */}
            {!hideBackButton && (
                <div className="text-center">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        Template: <span className="font-medium">{template.name}</span>
                    </span>
                </div>
            )}

            {/* Paginated Resume Preview - sidebar config comes from template registry */}
            <PaginatedResume
                sidebarWidth={sidebarConfig?.width}
                sidebarColor={sidebarConfig?.color}
            >
                <TemplateComponent data={data} />
            </PaginatedResume>
        </div>
    );
}




