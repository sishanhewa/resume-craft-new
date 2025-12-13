"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

// A4 dimensions at 96 DPI
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;

// Page break padding configuration
const PAGE_PADDING = 32; // Padding at top/bottom of page breaks (px)
const ORPHAN_THRESHOLD = 80; // If section header is within this many px of page bottom, move it

// For scaled preview display
const DESKTOP_SCALE = 0.75;
const MOBILE_PADDING = 32; // px

// Export the dimensions
export const A4_DIMENSIONS = {
    width: A4_WIDTH_PX,
    height: A4_HEIGHT_PX,
    widthMm: 210,
    heightMm: 297,
};

interface PaginatedResumeProps {
    children: ReactNode;
    sidebarWidth?: number;
    sidebarColor?: string;
    isThumbnail?: boolean;
}

interface PageInfo {
    offset: number;      // Content Y offset for this page
    viewHeight: number;  // Visible content height for this page
}

export function PaginatedResume({
    children,
    sidebarWidth = 280,
    sidebarColor,
    isThumbnail = false,
}: PaginatedResumeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(isThumbnail ? 1 : DESKTOP_SCALE);
    const [pages, setPages] = useState<PageInfo[]>([]);
    const [isCalculating, setIsCalculating] = useState(true);

    // Visible content height per page
    const visibleHeightFirstPage = A4_HEIGHT_PX - PAGE_PADDING; // Bottom padding only
    const visibleHeightOtherPages = A4_HEIGHT_PX - (PAGE_PADDING * 2); // Top and bottom padding

    // Calculate pages with smart section detection
    useEffect(() => {
        if (!measureRef.current || isThumbnail) {
            setIsCalculating(false);
            return;
        }

        const calculatePages = () => {
            const measureContainer = measureRef.current;
            if (!measureContainer) return;

            const totalHeight = measureContainer.scrollHeight;
            const containerRect = measureContainer.getBoundingClientRect();

            // Get all section headers for orphan detection
            const sectionHeaders = measureContainer.querySelectorAll('section > h2, section > div > h2, [data-section-header]');

            const pageInfos: PageInfo[] = [];
            let currentOffset = 0;
            let isFirstPage = true;

            while (currentOffset < totalHeight) {
                const maxVisibleHeight = isFirstPage ? visibleHeightFirstPage : visibleHeightOtherPages;
                let actualViewHeight = maxVisibleHeight;

                // Don't exceed remaining content
                const remainingContent = totalHeight - currentOffset;
                if (remainingContent <= 0) break;
                actualViewHeight = Math.min(actualViewHeight, remainingContent);

                // Check if any section header falls in the "danger zone" near bottom of this page
                const pageBottomY = currentOffset + actualViewHeight;
                const dangerZoneStart = pageBottomY - ORPHAN_THRESHOLD;

                sectionHeaders.forEach((header) => {
                    const headerRect = header.getBoundingClientRect();
                    const headerTop = headerRect.top - containerRect.top;

                    // If header starts in the danger zone (near bottom of page)
                    if (headerTop > dangerZoneStart && headerTop < pageBottomY) {
                        // Reduce this page's view height to end before this header
                        const reducedHeight = headerTop - currentOffset;
                        if (reducedHeight > 100) { // Only if it leaves meaningful content
                            actualViewHeight = Math.min(actualViewHeight, reducedHeight);
                        }
                    }
                });

                // Only add page if it has content
                if (actualViewHeight > 0) {
                    pageInfos.push({
                        offset: currentOffset,
                        viewHeight: actualViewHeight,
                    });
                }

                currentOffset += actualViewHeight;
                isFirstPage = false;
            }

            // Ensure at least one page
            if (pageInfos.length === 0) {
                pageInfos.push({
                    offset: 0,
                    viewHeight: Math.min(totalHeight, visibleHeightFirstPage),
                });
            }

            setPages(pageInfos);
            setIsCalculating(false);
        };

        const timer = setTimeout(calculatePages, 100);
        const observer = new ResizeObserver(() => {
            setTimeout(calculatePages, 50);
        });

        observer.observe(measureRef.current);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [children, visibleHeightFirstPage, visibleHeightOtherPages, isThumbnail]);

    // Responsive scaling logic
    useEffect(() => {
        if (isThumbnail) return;

        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const maxAvailableWidth = containerWidth - MOBILE_PADDING;
                const targetScale = Math.min(
                    DESKTOP_SCALE,
                    maxAvailableWidth / A4_WIDTH_PX
                );
                setScale(targetScale);
            }
        };

        updateScale();
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

    const currentScale = isThumbnail ? 1 : scale;
    const pageCount = pages.length;

    // For thumbnails, render simple preview
    if (isThumbnail) {
        return (
            <div ref={containerRef} className="flex flex-col items-center w-full">
                <div
                    style={{
                        width: `${A4_WIDTH_PX}px`,
                        height: `${A4_HEIGHT_PX}px`,
                        overflow: "hidden",
                        backgroundColor: "white",
                        position: "relative",
                    }}
                    data-resume-content="true"
                >
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
                    <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="flex flex-col items-center w-full">
            {/* Hidden measurement container */}
            <div
                ref={measureRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    width: `${A4_WIDTH_PX}px`,
                    left: "-9999px",
                    pointerEvents: "none",
                }}
                aria-hidden="true"
            >
                {children}
            </div>

            {/* Page count indicator */}
            {!isCalculating && pageCount > 0 && (
                <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {pageCount} page{pageCount > 1 ? "s" : ""} • A4 Format
                </div>
            )}

            {/* Scaled pages container */}
            <div
                style={{
                    transform: `scale(${currentScale})`,
                    transformOrigin: "top center",
                    width: `${A4_WIDTH_PX}px`,
                }}
                className="transition-transform duration-200 ease-out"
            >
                {/* Render each page */}
                {pages.map((page, pageIndex) => {
                    const isFirstPage = pageIndex === 0;
                    const topPadding = isFirstPage ? 0 : PAGE_PADDING;

                    return (
                        <div
                            key={pageIndex}
                            className="mb-8 last:mb-0 relative"
                            style={{
                                width: `${A4_WIDTH_PX}px`,
                                height: `${A4_HEIGHT_PX}px`,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                borderRadius: "4px",
                                overflow: "hidden",
                                backgroundColor: "white",
                            }}
                            data-resume-content="true"
                        >
                            {/* Sidebar background */}
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

                            {/* Content viewport */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: topPadding,
                                    left: 0,
                                    right: 0,
                                    height: `${page.viewHeight}px`,
                                    overflow: "hidden",
                                    zIndex: 2,
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: `${A4_WIDTH_PX}px`,
                                        transform: `translateY(-${page.offset}px)`,
                                    }}
                                >
                                    {children}
                                </div>
                            </div>

                            {/* Page number */}
                            <div
                                className="absolute bottom-2 left-0 right-0 text-center text-xs text-zinc-400"
                                style={{ zIndex: 10 }}
                            >
                                Page {pageIndex + 1}{pageCount > 1 ? ` of ${pageCount}` : ""}
                            </div>
                        </div>
                    );
                })}

                {/* Loading placeholder */}
                {isCalculating && (
                    <div
                        className="relative"
                        style={{
                            width: `${A4_WIDTH_PX}px`,
                            minHeight: `${A4_HEIGHT_PX}px`,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            borderRadius: "4px",
                            backgroundColor: "white",
                        }}
                        data-resume-content="true"
                    >
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
                        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
                    </div>
                )}
            </div>

            {/* Compensate for scaling */}
            {!isCalculating && pageCount > 0 && (
                <div
                    style={{
                        marginTop: `-${(A4_HEIGHT_PX * pageCount + 32 * (pageCount - 1)) * (1 - currentScale)}px`,
                    }}
                />
            )}
        </div>
    );
}
