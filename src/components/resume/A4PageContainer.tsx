"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

// A4 dimensions at 96 DPI
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;

// For scaled preview display
const DESKTOP_SCALE = 0.75;
const MOBILE_PADDING = 32; // px

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
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState(1);
    const [scale, setScale] = useState(isThumbnail ? 1 : DESKTOP_SCALE);

    // Calculate pages logic
    useEffect(() => {
        const calculatePages = () => {
            if (measureRef.current) {
                const contentHeight = measureRef.current.scrollHeight;
                const pages = Math.max(1, Math.ceil(contentHeight / A4_HEIGHT_PX));
                setPageCount(pages);
            }
        };

        const timer = setTimeout(calculatePages, 100);
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

    // Responsive scaling logic
    useEffect(() => {
        if (isThumbnail) return;

        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                // Calculate max available width including some padding
                const maxAvailableWidth = containerWidth - MOBILE_PADDING;

                // If container is smaller than scaled A4, shrink it
                // Default to DESKTOP_SCALE on larger screens
                const targetScale = Math.min(
                    DESKTOP_SCALE,
                    maxAvailableWidth / A4_WIDTH_PX
                );

                setScale(targetScale);
            }
        };

        // Initial calculation
        updateScale();

        // Listen for resize
        const resizeObserver = new ResizeObserver(updateScale);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener('resize', updateScale);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateScale);
        };
    }, [isThumbnail]);

    // In thumbnail mode, we only show first page, no scale (handled externally), no spacers
    const displayPageCount = isThumbnail ? 1 : pageCount;
    // For thumbnail, keep scale 1 (handled by parent typically) or let it fit
    // But usually thumbnails are just fixed scale or transform-origin center
    // The previous code kept scale 1 for thumbnail.
    const currentScale = isThumbnail ? 1 : scale;

    return (
        <div
            ref={containerRef}
            className={`flex flex-col items-center w-full ${isThumbnail ? '' : 'gap-4'}`}
        >
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
                    transformOrigin: "top center", // Center transform for better mobile alignment
                    width: `${A4_WIDTH_PX}px`,
                }}
                className="transition-transform duration-200 ease-out"
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
                <div style={{
                    // Calculate height based on number of pages + margins * scale difference
                    height: `${(A4_HEIGHT_PX * pageCount * currentScale) + (32 * (pageCount - 1) * currentScale) - (A4_HEIGHT_PX * pageCount) + 100}px`,
                    display: 'none' // We can probably just rely on the transformed height if we handle it differently, 
                    // but usually scaling keeps original layout flow size. 
                    // Let's try simpler spacer logic or just margin-bottom compensation.
                }} />
            )}
            {/* 
                Since we transform-origin: top center, the element takes up its original space in the flow.
                We need to "pull up" the content below it.
                The visual height is: (TotalHeight * scale)
                The layout height is: TotalHeight
                So we need negative margin of: TotalHeight * (1 - scale)
             */}
            {!isThumbnail && (
                <div style={{ marginTop: `-${(A4_HEIGHT_PX * pageCount + (32 * (pageCount - 1))) * (1 - currentScale)}px` }} />
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

