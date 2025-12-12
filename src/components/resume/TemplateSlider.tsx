"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { sampleResumeData } from "@/lib/sample-data";
import { getTemplateList } from "@/components/resume/templates";

export function TemplateSlider() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 320; // card width + gap
            const newScrollLeft = direction === "left"
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    const templates = getTemplateList();

    return (
        <div className="relative group">
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm border-zinc-200 shadow-lg"
                    onClick={() => scroll("left")}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>

            <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm border-zinc-200 shadow-lg"
                    onClick={() => scroll("right")}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Slider Container */}
            <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory scrollbar-hide -mx-4 items-center"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {templates.map((template) => (
                    <div key={template.id} className="snap-center flex-shrink-0">
                        <Link
                            href="/create-resume"
                            className="block group/card relative bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
                        >
                            {/* Template Preview - First page only */}
                            <div
                                className="w-[280px] h-[393px] bg-white relative"
                                style={{
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Clip wrapper */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '280px',
                                        height: '393px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        className="origin-top-left pointer-events-none"
                                        style={{
                                            transform: "scale(0.35)",
                                            width: "794px",
                                            height: "1123px",
                                        }}
                                    >
                                        <div style={{ width: '794px', height: '1123px', overflow: 'hidden' }}>
                                            <ResumePreview
                                                data={sampleResumeData}
                                                templateId={template.id}
                                                hideBackButton={true}
                                                isThumbnail={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Template Info */}
                            <div className="p-4 border-t border-zinc-100 dark:border-zinc-700">
                                <h3 className="font-semibold text-zinc-900 dark:text-white group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    Clean & Professional
                                </p>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-end justify-center pb-20 pointer-events-none">
                                <span className="text-white font-medium px-6 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                                    Use This Template →
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}

                {/* Coming Soon Card to show horizontal scrolling implies more */}
                <div className="snap-center flex-shrink-0">
                    <div className="w-[280px] h-[480px] rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center p-6 text-center bg-zinc-50/50 dark:bg-zinc-900/50">
                        <span className="text-4xl mb-4 opacity-50">✨</span>
                        <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">More Coming Soon</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            We're crafting more professional templates for you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
