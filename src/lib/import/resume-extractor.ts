import type { ResumeContent, Experience, Education, Language } from "@/types/resume";

// Common section headers to look for
const SECTION_PATTERNS = {
    experience: /^(experience|work\s*experience|employment|work\s*history|professional\s*experience)/i,
    education: /^(education|academic|qualifications|degrees)/i,
    skills: /^(skills|technical\s*skills|competencies|expertise|core\s*competencies)/i,
    languages: /^(languages|language\s*skills)/i,
    profile: /^(profile|summary|objective|about|professional\s*summary|career\s*objective)/i,
    contact: /^(contact|contact\s*information|personal\s*info)/i,
    reference: /^(reference|references)/i,
};

// Date patterns for experience/education
const DATE_PATTERNS = [
    /(\d{1,2}\/\d{4})\s*[-–—to]\s*(\d{1,2}\/\d{4}|present|current)/i,
    /(\w+\s+\d{4})\s*[-–—to]\s*(\w+\s+\d{4}|present|current)/i,
    /(\d{4})\s*[-–—to]\s*(\d{4}|present|current)/i,
];

// Email pattern
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

// Phone pattern
const PHONE_PATTERN = /[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{7,}/;

// URL pattern
const URL_PATTERN = /https?:\/\/[^\s]+|www\.[^\s]+/i;

interface ParsedSection {
    name: string;
    content: string[];
}

// Split text into sections based on common headers
function splitIntoSections(text: string): ParsedSection[] {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    const sections: ParsedSection[] = [];
    let currentSection: ParsedSection | null = null;

    for (const line of lines) {
        // Check if this line is a section header
        let isHeader = false;
        for (const [sectionName, pattern] of Object.entries(SECTION_PATTERNS)) {
            if (pattern.test(line)) {
                if (currentSection) {
                    sections.push(currentSection);
                }
                currentSection = { name: sectionName, content: [] };
                isHeader = true;
                break;
            }
        }

        if (!isHeader && currentSection) {
            currentSection.content.push(line);
        } else if (!isHeader && !currentSection) {
            // Content before any section - likely header info
            if (!sections.find(s => s.name === 'header')) {
                sections.unshift({ name: 'header', content: [line] });
            } else {
                sections[0].content.push(line);
            }
        }
    }

    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
}

// Extract contact info from text
function extractContactInfo(text: string): { email: string; phone: string; website: string; address: string } {
    const email = text.match(EMAIL_PATTERN)?.[0] || "";
    const phone = text.match(PHONE_PATTERN)?.[0] || "";
    const website = text.match(URL_PATTERN)?.[0] || "";

    // Address is harder - just get remaining text after removing email/phone/url
    let address = text
        .replace(EMAIL_PATTERN, "")
        .replace(PHONE_PATTERN, "")
        .replace(URL_PATTERN, "")
        .replace(/[|•·,]/g, " ")
        .trim();

    // Take first 100 chars max
    address = address.substring(0, 100);

    return { email, phone, website, address };
}

// Parse experience entries
function parseExperience(content: string[]): Experience[] {
    const experiences: Experience[] = [];
    let currentExp: Partial<Experience> | null = null;

    for (const line of content) {
        // Check for date range
        let dateMatch = null;
        for (const pattern of DATE_PATTERNS) {
            dateMatch = line.match(pattern);
            if (dateMatch) break;
        }

        if (dateMatch) {
            if (currentExp && currentExp.position) {
                experiences.push({
                    id: crypto.randomUUID(),
                    company: currentExp.company || "",
                    position: currentExp.position || "",
                    startDate: dateMatch[1] || "",
                    endDate: dateMatch[2] || "",
                    current: /present|current/i.test(dateMatch[2] || ""),
                    description: currentExp.description || [],
                });
            }
            currentExp = {
                startDate: dateMatch[1],
                endDate: dateMatch[2],
                current: /present|current/i.test(dateMatch[2] || ""),
                description: [],
            };
        } else if (currentExp) {
            // First non-date line after date is likely position/company
            if (!currentExp.position && line.length > 3) {
                currentExp.position = line;
            } else if (!currentExp.company && line.length > 3) {
                currentExp.company = line;
            } else if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*")) {
                currentExp.description = currentExp.description || [];
                currentExp.description.push(line.replace(/^[•\-*]\s*/, ""));
            }
        } else {
            // No date yet - might be position/company first
            if (!currentExp) {
                currentExp = { position: line, description: [] };
            }
        }
    }

    // Don't forget the last entry
    if (currentExp && currentExp.position) {
        experiences.push({
            id: crypto.randomUUID(),
            company: currentExp.company || "",
            position: currentExp.position || "",
            startDate: currentExp.startDate || "",
            endDate: currentExp.endDate || "",
            current: currentExp.current || false,
            description: currentExp.description || [],
        });
    }

    return experiences;
}

// Parse education entries
function parseEducation(content: string[]): Education[] {
    const education: Education[] = [];
    let currentEdu: Partial<Education> | null = null;

    for (const line of content) {
        // Check for year range
        const yearMatch = line.match(/(\d{4})\s*[-–—to]\s*(\d{4}|present|current)/i);

        if (yearMatch) {
            if (currentEdu && currentEdu.degree) {
                education.push({
                    id: crypto.randomUUID(),
                    degree: currentEdu.degree || "",
                    institution: currentEdu.institution || "",
                    startYear: yearMatch[1] || "",
                    endYear: yearMatch[2] || "",
                    gpa: currentEdu.gpa,
                });
            }
            currentEdu = {
                startYear: yearMatch[1],
                endYear: yearMatch[2],
            };
        } else if (currentEdu) {
            if (!currentEdu.degree && line.length > 3) {
                currentEdu.degree = line;
            } else if (!currentEdu.institution && line.length > 3) {
                currentEdu.institution = line;
            }
            // Check for GPA
            const gpaMatch = line.match(/GPA[:\s]*([0-9.]+)/i);
            if (gpaMatch) {
                currentEdu.gpa = gpaMatch[1];
            }
        } else {
            currentEdu = { degree: line };
        }
    }

    if (currentEdu && currentEdu.degree) {
        education.push({
            id: crypto.randomUUID(),
            degree: currentEdu.degree || "",
            institution: currentEdu.institution || "",
            startYear: currentEdu.startYear || "",
            endYear: currentEdu.endYear || "",
            gpa: currentEdu.gpa,
        });
    }

    return education;
}

// Parse skills (usually comma or bullet separated)
function parseSkills(content: string[]): string[] {
    const skills: string[] = [];

    for (const line of content) {
        // Split by common separators
        const parts = line.split(/[,;•·|]/).map(s => s.trim()).filter(s => s && s.length > 1);
        skills.push(...parts);
    }

    return skills.slice(0, 20); // Limit to 20 skills
}

// Parse languages
function parseLanguages(content: string[]): Language[] {
    const languages: Language[] = [];
    const proficiencyMap: Record<string, Language["proficiency"]> = {
        native: "Native",
        fluent: "Fluent",
        advanced: "Fluent",
        intermediate: "Intermediate",
        basic: "Basic",
        beginner: "Basic",
    };

    for (const line of content) {
        // Try to extract language and proficiency
        const parts = line.split(/[-–—:,()]/);
        if (parts[0]) {
            const name = parts[0].trim();
            let proficiency: Language["proficiency"] = "Intermediate";

            if (parts[1]) {
                const level = parts[1].toLowerCase().trim();
                for (const [key, value] of Object.entries(proficiencyMap)) {
                    if (level.includes(key)) {
                        proficiency = value;
                        break;
                    }
                }
            }

            if (name.length > 1) {
                languages.push({
                    id: crypto.randomUUID(),
                    name,
                    proficiency,
                });
            }
        }
    }

    return languages;
}

// Main extraction function
export function extractResumeFromText(rawText: string): Partial<ResumeContent> {
    const sections = splitIntoSections(rawText);
    const result: Partial<ResumeContent> = {
        header: { fullName: "", jobTitle: "" },
        contact: { phone: "", email: "", address: "" },
        profile: "",
        skills: [],
        languages: [],
        experience: [],
        education: [],
    };

    // Process header section first (usually name and title at top)
    const headerSection = sections.find(s => s.name === 'header');
    if (headerSection && headerSection.content.length > 0) {
        result.header!.fullName = headerSection.content[0] || "";
        if (headerSection.content.length > 1) {
            result.header!.jobTitle = headerSection.content[1] || "";
        }
        // Extract contact info from header
        const headerText = headerSection.content.join(" ");
        const contactFromHeader = extractContactInfo(headerText);
        result.contact = { ...result.contact!, ...contactFromHeader };
    }

    // Process each section
    for (const section of sections) {
        switch (section.name) {
            case 'contact':
                const contactInfo = extractContactInfo(section.content.join(" "));
                result.contact = { ...result.contact!, ...contactInfo };
                break;
            case 'profile':
                result.profile = section.content.join(" ");
                break;
            case 'experience':
                result.experience = parseExperience(section.content);
                break;
            case 'education':
                result.education = parseEducation(section.content);
                break;
            case 'skills':
                result.skills = parseSkills(section.content);
                break;
            case 'languages':
                result.languages = parseLanguages(section.content);
                break;
        }
    }

    return result;
}
