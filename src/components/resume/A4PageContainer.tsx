"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

// A4 dimensions at 96 DPI
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;

// For scaled preview display
const PREVIEW_SCALE = 0.75;

interface PaginatedResumeProps {
    children: ReactNode;
    sidebarWidth?: number;
    sidebarColor?: string;
    isThumbnail?: boolean;
}

export function PaginatedResume({
    children,
    sidebarWidth = 280,
    sidebarColor,
    isThumbnail = false,
}: PaginatedResumeProps) {
    const measureRef = useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        const calculatePages = () => {
            if (measureRef.current) {
                const contentHeight = measureRef.current.scrollHeight;
                // Only add more pages if content actually exceeds one A4 page
                const pages = Math.max(1, Math.ceil(contentHeight / A4_HEIGHT_PX));
                setPageCount(pages);
            }
        };

        // Calculate on mount with delay for render
        const timer = setTimeout(calculatePages, 100);

        // Recalculate on resize
        const observer = new ResizeObserver(() => {
            setTimeout(calculatePages, 50);
        });

        if (measureRef.current) {
            observer.observe(measureRef.current);
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [children]);

    // In thumbnail mode, we only show first page, no scale (handled externally), no spacers
    const displayPageCount = isThumbnail ? 1 : pageCount;
    const currentScale = isThumbnail ? 1 : PREVIEW_SCALE;

    return (
        <div className={`flex flex-col items-center ${isThumbnail ? '' : 'gap-4'}`}>
            {/* Page indicator - Hide in thumbnail mode */}
            {!isThumbnail && (
                <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {pageCount} page{pageCount > 1 ? "s" : ""} • A4 Format
                </div>
            )}

            {/* Scaled container for all pages */}
            <div
                style={{
                    transform: `scale(${currentScale})`,
                    transformOrigin: "top left", // Changed to top-left for easier positioning
                    width: `${A4_WIDTH_PX}px`,
                    // Remove height usage for thumbnail to avoid massive gaps
                }}
            >
                {/* Render each page */}
                {Array.from({ length: displayPageCount }).map((_, pageIndex) => (
                    <div
                        key={pageIndex}
                        className={`${isThumbnail ? '' : 'mb-8'} last:mb-0 relative`}
                        style={{
                            width: `${A4_WIDTH_PX}px`,
                            height: `${A4_HEIGHT_PX}px`,
                            boxShadow: isThumbnail ? "none" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            borderRadius: isThumbnail ? "0" : "4px",
                            overflow: "hidden",
                            backgroundColor: "white",
                        }}
                        data-resume-content="true"
                    >
                        {/* Sidebar background - renders on EVERY page to fill full height */}
                        {sidebarColor && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: `${sidebarWidth}px`,
                                    height: "100%",
                                    backgroundColor: sidebarColor,
                                    zIndex: 1,
                                }}
                            />
                        )}

                        {/* Content window - shifts up for each page */}
                        <div
                            ref={pageIndex === 0 ? measureRef : undefined}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: `${A4_WIDTH_PX}px`,
                                minHeight: `${A4_HEIGHT_PX}px`,
                                transform: `translateY(-${pageIndex * A4_HEIGHT_PX}px)`,
                                zIndex: 2,
                            }}
                        >
                            {children}
                        </div>

                        {/* Page number footer - Hide in thumbnail */}
                        {!isThumbnail && (
                            <div
                                className="absolute bottom-2 left-0 right-0 text-center text-xs text-zinc-400"
                                style={{ zIndex: 10 }}
                            >
                                Page {pageIndex + 1}{pageCount > 1 ? ` of ${pageCount}` : ""}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Spacer to account for scale transform - Hide in thumbnail */}
            {!isThumbnail && (
                <div style={{ height: `${(1 - PREVIEW_SCALE) * A4_HEIGHT_PX * pageCount * -1 + 100}px` }} />
            )}
        </div>
    );
}

// Export the dimensions
export const A4_DIMENSIONS = {
    width: A4_WIDTH_PX,
    height: A4_HEIGHT_PX,
    widthMm: 210,
    heightMm: 297,
};

