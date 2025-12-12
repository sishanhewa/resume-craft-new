"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreVertical, Trash2, Edit } from "lucide-react";
import { ResumeContent } from "@/types/resume";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ResumeCardProps {
    id: string;
    title: string;
    content: ResumeContent;
    templateId?: string;
    updatedAt: string;
}

export function ResumeCard({ id, title, content, templateId = "professional", updatedAt }: ResumeCardProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const supabase = createClient();

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        startTransition(async () => {
            try {
                const { error } = await supabase
                    .from("resumes")
                    .delete()
                    .eq("id", id);

                if (error) throw error;

                toast.success("Resume deleted");
                router.refresh();
            } catch (error) {
                toast.error("Error deleting resume");
                console.error(error);
            }
        });
    };

    return (
        <Link
            href={`/create-resume?id=${id}`}
            className="group relative block bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:border-blue-500/50 hover:shadow-lg transition-all"
        >
            {/* Mini Preview - properly scaled like homepage */}
            <div
                className="w-full aspect-[210/297] bg-white relative border-b border-zinc-100 dark:border-zinc-700"
                style={{ overflow: 'hidden' }}
            >
                {/* Container for centering scaled preview */}
                <div className="absolute inset-0 flex justify-center">
                    {/* Wrapper to clip to exact A4 scaled size */}
                    <div
                        className="relative mt-4"
                        style={{
                            // Calculate scale based on container width... 
                            // Actually, simpler to just fix scale like homepage
                            // Let's assume dashboard cards are ~250px wide. 
                            // 794 * 0.3 = 238px.
                            width: '238px',
                            height: '337px', // 1123 * 0.3
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    >
                        <div
                            className="origin-top-left pointer-events-none"
                            style={{
                                transform: "scale(0.3)",
                                width: "794px",
                                height: "1123px",
                            }}
                        >
                            <div style={{ width: '794px', height: '1123px', overflow: 'hidden' }}>
                                <ResumePreview
                                    data={content}
                                    // Using a default template or saved template ID if available
                                    // For now default to professional as template ID isn't in ResumeCardProps yet
                                    // TODO: Add templateId to ResumeCardProps and DB
                                    templateId={templateId}
                                    hideBackButton={true}
                                    isThumbnail={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-zinc-900 dark:text-white truncate">
                            {title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            Edited {new Date(updatedAt).toLocaleDateString()}
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 -mr-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                onClick={(e) => e.preventDefault()}
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/create-resume?id=${id}`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleDelete}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <span className="animate-spin mr-2">⏳</span>
                                ) : (
                                    <Trash2 className="mr-2 h-4 w-4" />
                                )}
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Link>
    );
}
