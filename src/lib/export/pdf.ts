import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

// A4 dimensions in mm and pixels (at 96 DPI)
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export async function exportToPdf(elementId: string, filename: string = "resume.pdf") {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error("Element not found:", elementId);
        alert("Could not find resume content. Please try again.");
        return;
    }

    // Find the actual resume content using data attribute
    const resumeContent = element.querySelector('[data-resume-content="true"]') as HTMLElement;
    if (!resumeContent) {
        console.error("Resume content not found");
        alert("Could not find resume content. Please try again.");
        return;
    }

    try {
        // Wait a bit for images to load
        await new Promise(resolve => setTimeout(resolve, 500));

        // Add class to hide shadows during capture
        resumeContent.classList.add('pdf-export-mode');

        // Add temporary style to remove ALL shadows
        const style = document.createElement('style');
        style.id = 'pdf-export-style';
        style.textContent = `
            .pdf-export-mode,
            .pdf-export-mode * {
                box-shadow: none !important;
                text-shadow: none !important;
            }
        `;
        document.head.appendChild(style);

        // Wait for style to apply
        await new Promise(resolve => setTimeout(resolve, 100));

        // Capture the resume as PNG using html-to-image
        const dataUrl = await toPng(resumeContent, {
            quality: 1.0,
            pixelRatio: 2, // Higher quality
            backgroundColor: "#ffffff",
            cacheBust: true, // Force reload images
            // Don't skip fonts - we need them for proper rendering
            skipFonts: false,
            // Handle image loading properly
            imagePlaceholder: undefined,
            // Filter out elements that cause issues
            filter: (node) => {
                // Skip page number footer
                if (node instanceof HTMLElement) {
                    const classes = node.className;
                    if (typeof classes === 'string' && classes.includes('text-zinc-400')) {
                        return false; // Skip page numbers
                    }
                }
                return true;
            },
        });

        // Remove the temporary class and style
        resumeContent.classList.remove('pdf-export-mode');
        document.getElementById('pdf-export-style')?.remove();


        // Create PDF with A4 dimensions
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Get actual content dimensions
        const contentHeight = resumeContent.scrollHeight;

        // Calculate how many pages we need
        const pageCount = Math.ceil(contentHeight / A4_HEIGHT_PX);

        // For single page CV, just fit to A4
        if (pageCount === 1 || contentHeight <= A4_HEIGHT_PX) {
            // Single page - fit exactly to A4
            pdf.addImage(
                dataUrl,
                "PNG",
                0,
                0,
                A4_WIDTH_MM,
                A4_HEIGHT_MM
            );
        } else {
            // Multi-page - this shouldn't happen for 1-page CV
            // Calculate the proper height ratio
            const imgWidth = A4_WIDTH_MM;
            const imgHeight = (contentHeight / A4_WIDTH_PX) * A4_WIDTH_MM;

            pdf.addImage(
                dataUrl,
                "PNG",
                0,
                0,
                imgWidth,
                imgHeight
            );
        }

        // Download the PDF
        pdf.save(filename);
    } catch (error) {
        // Clean up even on error
        resumeContent.classList.remove('pdf-export-mode');
        document.getElementById('pdf-export-style')?.remove();

        console.error("PDF generation error:", error);
        alert("PDF generation failed. Please try the browser's print function (Ctrl/Cmd + P) and select 'Save as PDF'.");
    }
}

