"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ResumeContent } from "@/types/resume";

// System prompt for resume parsing
const RESUME_PARSE_PROMPT = `You are a resume parser. Given the raw text extracted from a resume, convert it into a structured JSON format.

Return ONLY valid JSON matching this structure:
{
  "header": {
    "fullName": "string",
    "jobTitle": "string"
  },
  "contact": {
    "phone": "string",
    "email": "string",
    "address": "string",
    "website": "string (optional)"
  },
  "profile": "string (professional summary)",
  "skills": ["skill1", "skill2", ...],
  "languages": [
    {"name": "string", "proficiency": "Basic|Intermediate|Fluent|Native"}
  ],
  "experience": [
    {
      "company": "string",
      "position": "string",
      "startDate": "string",
      "endDate": "string",
      "current": boolean,
      "description": ["bullet point 1", "bullet point 2", ...]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "startYear": "string",
      "endYear": "string",
      "gpa": "string (optional)"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["tech1", "tech2"],
      "link": "string (optional)"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string"
    }
  ],
  "awards": [
    {
      "title": "string",
      "issuer": "string",
      "date": "string",
      "description": "string (optional)"
    }
  ],
  "volunteer": [
    {
      "organization": "string",
      "role": "string",
      "startDate": "string",
      "endDate": "string",
      "current": boolean,
      "description": ["bullet point 1", ...]
    }
  ],
  "publications": [
    {
      "title": "string",
      "publisher": "string",
      "date": "string",
      "link": "string (optional)"
    }
  ],
  "interests": ["interest1", "interest2", ...]
}

Rules:
- Extract as much information as possible
- Leave fields empty ("") if not found
- For arrays, return empty [] if no items found
- For dates, use the format found in the resume
- current should be true if "Present" or "Current" is mentioned
- proficiency should be one of: Basic, Intermediate, Fluent, Native
- Include certifications, awards, projects, and volunteer work if found`;

/**
 * Server Action to parse resume text using Gemini AI
 * Server-side only - keeps API key secure
 */
export async function parseResumeWithAI(rawText: string): Promise<Partial<ResumeContent> | { error: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Missing GEMINI_API_KEY");
    return { error: "Configuration Error: Missing GEMINI_API_KEY on server." };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // ... setup model ...
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const prompt = `${RESUME_PARSE_PROMPT}\n\nHere is the resume text to parse:\n\n${rawText}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let jsonText = response.text();

    // Cleanup: Remove markdown code blocks if present (common AI artifact)
    jsonText = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (parseError) {
      throw new Error(`Failed to parse AI response as JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }

    // ... addIds logic ...
    const addIds = (arr: any[]) => arr ? arr.map(item => ({
      ...item,
      id: crypto.randomUUID(),
    })) : [];

    return {
      header: parsed.header || { fullName: "", jobTitle: "" },
      contact: parsed.contact || { phone: "", email: "", address: "" },
      profile: parsed.profile || "",
      skills: parsed.skills || [],
      languages: addIds(parsed.languages),
      experience: addIds(parsed.experience),
      education: addIds(parsed.education),
      projects: addIds(parsed.projects),
      certifications: addIds(parsed.certifications),
      awards: addIds(parsed.awards),
      volunteer: addIds(parsed.volunteer),
      publications: addIds(parsed.publications),
      interests: parsed.interests || [],
    };
  } catch (error) {
    console.error("AI parsing error:", error);
    // SAFELY RETURN ERROR instead of throwing (bypasses Next.js masking)
    return { error: `Gemini API Usage Error: ${error instanceof Error ? error.message : String(error)}` };
  }
}