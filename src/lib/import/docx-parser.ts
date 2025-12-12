import mammoth from "mammoth";
import { extractResumeFromText } from "./resume-extractor";
import { parseResumeWithAI } from "./ai-parser";
import type { ResumeContent } from "@/types/resume";

/**
 * Parse a DOCX file and extract resume data
 * Uses Gemini AI if API key is available, falls back to regex parsing
 */
export async function parseDocx(file: File): Promise<Partial<ResumeContent>> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const rawText = result.value;

        // Try AI parsing first (Server Action has access to env vars)
        try {
            return await parseResumeWithAI(rawText);
        } catch (aiError) {
            console.error("AI parsing failed (Gemini):", aiError);
            throw new Error(`Gemini AI Error: ${aiError instanceof Error ? aiError.message : String(aiError)}`);
        }

        // Fallback to regex-based extraction
        return extractResumeFromText(rawText);
    } catch (error) {
        console.error("Error parsing DOCX:", error);
        throw new Error("Failed to parse DOCX file. Please ensure it's a valid Word document.");
    }
}
