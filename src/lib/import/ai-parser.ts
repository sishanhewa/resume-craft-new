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
export async function parseResumeWithAI(rawText: string): Promise<Partial<ResumeContent>> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured in environment variables.");
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
    });

    // LOG: Raw text being sent to AI
    console.log("=== AI PARSER INPUT ===");
    console.log("Raw text length:", rawText.length);
    console.log("First 500 chars:", rawText.substring(0, 500));
    console.log("========================");

    const prompt = `${RESUME_PARSE_PROMPT}\n\nHere is the resume text to parse:\n\n${rawText}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonText = response.text();

    // LOG: AI response
    console.log("=== AI PARSER OUTPUT ===");
    console.log("JSON response:", jsonText);
    console.log("=========================");

    const parsed = JSON.parse(jsonText);

    // LOG: Parsed object
    console.log("=== PARSED OBJECT ===");
    console.log(JSON.stringify(parsed, null, 2));
    console.log("=====================");

    // Add IDs to arrays
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
    throw error;
  }
}