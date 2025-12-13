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

    // Find ALL resume pages
    const pages = element.querySelectorAll('[data-resume-content="true"]');
    if (!pages || pages.length === 0) {
        console.error("Resume content not found");
        alert("Could not find resume content. Please try again.");
        return;
    }

    try {
        // Wait a bit for images to load
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create PDF with A4 dimensions
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Loop through each page to add the class
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            // Add class to hide shadows during capture
            page.classList.add('pdf-export-mode');
        }

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

        // Loop through each page to capture and add to PDF
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;

            // Capture page
            const dataUrl = await toPng(page, {
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

            // Add to PDF
            if (i > 0) {
                pdf.addPage();
            }

            pdf.addImage(
                dataUrl,
                "PNG",
                0,
                0,
                A4_WIDTH_MM,
                A4_HEIGHT_MM
            );
        }

        // Cleanup
        pages.forEach(p => p.classList.remove('pdf-export-mode'));
        document.getElementById('pdf-export-style')?.remove();


        // Download the PDF
        pdf.save(filename);
    } catch (error) {
        // Clean up even on error
        const pages = element.querySelectorAll('[data-resume-content="true"]');
        pages.forEach(p => p.classList.remove('pdf-export-mode'));
        document.getElementById('pdf-export-style')?.remove();

        console.error("PDF generation error:", error);
        alert("PDF generation failed. Please try the browser's print function (Ctrl/Cmd + P) and select 'Save as PDF'.");
    }
}
