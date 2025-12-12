import type { ResumeContent } from "@/types/resume";

/**
 * Sample resume data for template previews
 */
export const sampleResumeData: ResumeContent = {
    header: {
        fullName: "Alex Johnson",
        jobTitle: "Senior Software Engineer",
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "alex.johnson@email.com",
        address: "San Francisco, CA",
        website: "github.com/alexj",
    },
    profile: "Passionate software engineer with 8+ years of experience building scalable web applications. Specialized in full-stack development with a focus on React, Node.js, and cloud technologies.",
    skills: [
        "React", "TypeScript", "Node.js", "Python",
        "AWS", "Docker", "PostgreSQL", "GraphQL"
    ],
    languages: [
        { id: "1", name: "English", proficiency: "Native" },
        { id: "2", name: "Spanish", proficiency: "Intermediate" },
    ],
    experience: [
        {
            id: "1",
            company: "TechCorp Inc.",
            position: "Senior Software Engineer",
            startDate: "Jan 2021",
            endDate: "Present",
            current: true,
            description: [
                "Led development of core platform features",
                "Mentored team of 5 junior developers",
            ],
        },
        {
            id: "2",
            company: "StartupXYZ",
            position: "Full Stack Developer",
            startDate: "Mar 2018",
            endDate: "Dec 2020",
            current: false,
            description: [
                "Built customer-facing web applications",
                "Implemented CI/CD pipelines",
            ],
        },
    ],
    education: [
        {
            id: "1",
            degree: "B.S. Computer Science",
            institution: "Stanford University",
            startYear: "2014",
            endYear: "2018",
        },
    ],
    projects: [],
    certifications: [
        {
            id: "1",
            name: "AWS Solutions Architect",
            issuer: "Amazon",
            date: "2022",
        },
    ],
    awards: [],
    volunteer: [],
    publications: [],
    interests: ["Open Source", "Machine Learning", "Hiking"],
};
