import { extractResumeFromText } from "./resume-extractor";
import { parseResumeWithAI } from "./ai-parser";
import type { ResumeContent } from "@/types/resume";

/**
 * Parse a PDF file and extract resume data
 * Uses Gemini AI if API key is available, falls back to regex parsing
 */
export async function parsePdf(file: File): Promise<Partial<ResumeContent>> {
    try {
        // Import pdfjs-dist legacy build
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

        // Set worker from CDN - must match installed version (5.4.449)
        pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@5.4.449/legacy/build/pdf.worker.min.mjs";

        const arrayBuffer = await file.arrayBuffer();

        // Create loading task
        const loadingTask = pdfjs.getDocument({
            data: arrayBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
        });

        // Add timeout
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("PDF parsing timed out after 15 seconds")), 15000);
        });

        const pdf = await Promise.race([loadingTask.promise, timeoutPromise]);

        let fullText = "";

        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(" ");
            fullText += pageText + "\n";
        }

        if (!fullText.trim()) {
            throw new Error("No text could be extracted. The PDF might be scanned/image-based.");
        }

        // Try AI parsing first (Server Action has access to env vars)
        try {
            return await parseResumeWithAI(fullText);
        } catch (aiError) {
            console.error("AI parsing failed (Gemini):", aiError);
            // Debugging: Throw error to see it in UI
            throw new Error(`Gemini AI Error: ${aiError instanceof Error ? aiError.message : String(aiError)}`);
        }

        // Fallback to regex-based extraction (Unreachable while debugging)
        return extractResumeFromText(fullText);
    } catch (error) {
        console.error("Error parsing PDF:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`PDF import failed: ${message}`);
    }
}

