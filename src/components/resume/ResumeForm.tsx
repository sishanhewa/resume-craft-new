"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeContent, Experience, Education, Language } from "@/types/resume";

interface ResumeFormProps {
    data: ResumeContent;
    onChange: (data: ResumeContent) => void;
    onNext: () => void;
}

type SectionKey = "header" | "contact" | "profile" | "skills" | "languages" | "experience" | "education" | "reference";

export function ResumeForm({ data, onChange, onNext }: ResumeFormProps) {
    const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(
        new Set(["header", "contact"])
    );

    const toggleSection = (section: SectionKey) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(section)) {
            newExpanded.delete(section);
        } else {
            newExpanded.add(section);
        }
        setExpandedSections(newExpanded);
    };

    const updateHeader = (field: keyof typeof data.header, value: string) => {
        onChange({
            ...data,
            header: { ...data.header, [field]: value },
        });
    };

    const updateContact = (field: keyof typeof data.contact, value: string) => {
        onChange({
            ...data,
            contact: { ...data.contact, [field]: value },
        });
    };

    const updateProfile = (value: string) => {
        onChange({ ...data, profile: value });
    };

    // Skills
    const addSkill = () => {
        onChange({ ...data, skills: [...data.skills, ""] });
    };

    const updateSkill = (index: number, value: string) => {
        const newSkills = [...data.skills];
        newSkills[index] = value;
        onChange({ ...data, skills: newSkills });
    };

    const removeSkill = (index: number) => {
        onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) });
    };

    // Languages
    const addLanguage = () => {
        const newLanguage: Language = {
            id: crypto.randomUUID(),
            name: "",
            proficiency: "Intermediate",
        };
        onChange({ ...data, languages: [...data.languages, newLanguage] });
    };

    const updateLanguage = (id: string, field: keyof Language, value: string) => {
        onChange({
            ...data,
            languages: data.languages.map((lang) =>
                lang.id === id ? { ...lang, [field]: value } : lang
            ),
        });
    };

    const removeLanguage = (id: string) => {
        onChange({
            ...data,
            languages: data.languages.filter((lang) => lang.id !== id),
        });
    };

    // Experience
    const addExperience = () => {
        const newExp: Experience = {
            id: crypto.randomUUID(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            description: [""],
        };
        onChange({ ...data, experience: [...data.experience, newExp] });
    };

    const updateExperience = (id: string, field: keyof Experience, value: unknown) => {
        onChange({
            ...data,
            experience: data.experience.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            ),
        });
    };

    const removeExperience = (id: string) => {
        onChange({
            ...data,
            experience: data.experience.filter((exp) => exp.id !== id),
        });
    };

    const addExpDescription = (expId: string) => {
        onChange({
            ...data,
            experience: data.experience.map((exp) =>
                exp.id === expId ? { ...exp, description: [...exp.description, ""] } : exp
            ),
        });
    };

    const updateExpDescription = (expId: string, index: number, value: string) => {
        onChange({
            ...data,
            experience: data.experience.map((exp) =>
                exp.id === expId
                    ? {
                        ...exp,
                        description: exp.description.map((d, i) => (i === index ? value : d)),
                    }
                    : exp
            ),
        });
    };

    const removeExpDescription = (expId: string, index: number) => {
        onChange({
            ...data,
            experience: data.experience.map((exp) =>
                exp.id === expId
                    ? { ...exp, description: exp.description.filter((_, i) => i !== index) }
                    : exp
            ),
        });
    };

    // Education
    const addEducation = () => {
        const newEdu: Education = {
            id: crypto.randomUUID(),
            degree: "",
            institution: "",
            startYear: "",
            endYear: "",
            gpa: "",
        };
        onChange({ ...data, education: [...data.education, newEdu] });
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        onChange({
            ...data,
            education: data.education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            ),
        });
    };

    const removeEducation = (id: string) => {
        onChange({
            ...data,
            education: data.education.filter((edu) => edu.id !== id),
        });
    };

    // Reference
    const updateReference = (field: string, value: string) => {
        onChange({
            ...data,
            reference: {
                name: data.reference?.name || "",
                role: data.reference?.role || "",
                company: data.reference?.company || "",
                phone: data.reference?.phone || "",
                email: data.reference?.email || "",
                [field]: value,
            },
        });
    };

    const SectionHeader = ({
        title,
        section,
    }: {
        title: string;
        section: SectionKey;
    }) => (
        <button
            type="button"
            onClick={() => toggleSection(section)}
            className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
            <span className="font-semibold text-zinc-900 dark:text-white">{title}</span>
            {expandedSections.has(section) ? (
                <ChevronUp className="w-5 h-5 text-zinc-500" />
            ) : (
                <ChevronDown className="w-5 h-5 text-zinc-500" />
            )}
        </button>
    );

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateHeader("photoUrl", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <SectionHeader title="Header" section="header" />
                {expandedSections.has("header") && (
                    <div className="p-4 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Richard Sanchez"
                                    value={data.header.fullName}
                                    onChange={(e) => updateHeader("fullName", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">Job Title</Label>
                                <Input
                                    id="jobTitle"
                                    placeholder="Marketing Manager"
                                    value={data.header.jobTitle}
                                    onChange={(e) => updateHeader("jobTitle", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="photo">Profile Photo</Label>
                            <Input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="cursor-pointer"
                            />
                            {data.header.photoUrl && (
                                <div className="mt-2">
                                    <img
                                        src={data.header.photoUrl}
                                        alt="Profile preview"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <SectionHeader title="Contact" section="contact" />
                {expandedSections.has("contact") && (
                    <div className="p-4 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    placeholder="+123-456-7890"
                                    value={data.contact.phone}
                                    onChange={(e) => updateContact("phone", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="hello@example.com"
                                    value={data.contact.email}
                                    onChange={(e) => updateContact("email", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                placeholder="123 Anywhere St., Any City"
                                value={data.contact.address}
                                onChange={(e) => updateContact("address", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                placeholder="www.yourwebsite.com"
                                value={data.contact.website || ""}
                                onChange={(e) => updateContact("website", e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Profile Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <SectionHeader title="Profile / Summary" section="profile" />
                {expandedSections.has("profile") && (
                    <div className="p-4">
                        <Textarea
                            placeholder="Write a brief professional introduction..."
                            value={data.profile}
                            onChange={(e) => updateProfile(e.target.value)}
                            className="min-h-[120px]"
                        />
                    </div>
                )}
            </div>

            {/* Skills Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <SectionHeader title="Skills" section="skills" />
                {expandedSections.has("skills") && (
                    <div className="p-4 space-y-3">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    placeholder="e.g., Project Management"
                                    value={skill}
                                    onChange={(e) => updateSkill(index, e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeSkill(index)}
                                    className="shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addSkill}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Skill
                        </Button>
                    </div>
                )}
            </div>

            {/* Languages Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <SectionHeader title="Languages" section="languages" />
                {expandedSections.has("languages") && (
                    <div className="p-4 space-y-3">
                        {data.languages.map((lang) => (
                            <div key={lang.id} className="flex gap-2">
                                <Input
                                    placeholder="Language"
                                    value={lang.name}
                                    onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                                    className="flex-1"
                                />
                                <select
                                    value={lang.proficiency}
                                    onChange={(e) =>
                                        updateLanguage(lang.id, "proficiency", e.target.value)
                                    }
                                    className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm"
                                >
                                    <option value="Basic">Basic</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Native">Native</option>
                                </select>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeLanguage(lang.id)}
                                    className="shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addLanguage}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Language
                        </Button>
                    </div>
                )}
            </div>

            {/* Experience Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <SectionHeader title="Work Experience" section="experience" />
                {expandedSections.has("experience") && (
                    <div className="p-4 space-y-4">
                        {data.experience.map((exp, expIndex) => (
                            <div
                                key={exp.id}
                                className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
                                        Position {expIndex + 1}
                                    </span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeExperience(exp.id)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Company</Label>
                                        <Input
                                            placeholder="Company Name"
                                            value={exp.company}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "company", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Position</Label>
                                        <Input
                                            placeholder="Job Title"
                                            value={exp.position}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "position", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Start Date</Label>
                                        <Input
                                            placeholder="2020"
                                            value={exp.startDate}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "startDate", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Date</Label>
                                        <Input
                                            placeholder="Present"
                                            value={exp.endDate}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "endDate", e.target.value)
                                            }
                                            disabled={exp.current}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`current-${exp.id}`}
                                        checked={exp.current}
                                        onChange={(e) =>
                                            updateExperience(exp.id, "current", e.target.checked)
                                        }
                                        className="rounded border-zinc-300"
                                    />
                                    <Label htmlFor={`current-${exp.id}`} className="text-sm">
                                        I currently work here
                                    </Label>
                                </div>
                                <div className="space-y-2">
                                    <Label>Description Points</Label>
                                    {exp.description.map((desc, descIndex) => (
                                        <div key={descIndex} className="flex gap-2">
                                            <Input
                                                placeholder="Describe your responsibilities..."
                                                value={desc}
                                                onChange={(e) =>
                                                    updateExpDescription(exp.id, descIndex, e.target.value)
                                                }
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => removeExpDescription(exp.id, descIndex)}
                                                className="shrink-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => addExpDescription(exp.id)}
                                        className="text-blue-600"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Point
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addExperience}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Experience
                        </Button>
                    </div>
                )}
            </div>

            {/* Education Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <SectionHeader title="Education" section="education" />
                {expandedSections.has("education") && (
                    <div className="p-4 space-y-4">
                        {data.education.map((edu, eduIndex) => (
                            <div
                                key={edu.id}
                                className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
                                        Education {eduIndex + 1}
                                    </span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeEducation(edu.id)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Degree</Label>
                                        <Input
                                            placeholder="Master of Business Management"
                                            value={edu.degree}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "degree", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Institution</Label>
                                        <Input
                                            placeholder="University Name"
                                            value={edu.institution}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "institution", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Start Year</Label>
                                        <Input
                                            placeholder="2020"
                                            value={edu.startYear}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "startYear", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Year</Label>
                                        <Input
                                            placeholder="2024"
                                            value={edu.endYear}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "endYear", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>GPA</Label>
                                        <Input
                                            placeholder="3.8 / 4.0"
                                            value={edu.gpa || ""}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "gpa", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addEducation}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Education
                        </Button>
                    </div>
                )}
            </div>

            {/* Reference Section */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <SectionHeader title="Reference" section="reference" />
                {expandedSections.has("reference") && (
                    <div className="p-4 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="refName">Name</Label>
                                <Input
                                    id="refName"
                                    placeholder="Reference Name"
                                    value={data.reference?.name || ""}
                                    onChange={(e) => updateReference("name", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="refRole">Role / Title</Label>
                                <Input
                                    id="refRole"
                                    placeholder="CTO"
                                    value={data.reference?.role || ""}
                                    onChange={(e) => updateReference("role", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="refCompany">Company</Label>
                            <Input
                                id="refCompany"
                                placeholder="Company Name"
                                value={data.reference?.company || ""}
                                onChange={(e) => updateReference("company", e.target.value)}
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="refPhone">Phone</Label>
                                <Input
                                    id="refPhone"
                                    placeholder="+123-456-7890"
                                    value={data.reference?.phone || ""}
                                    onChange={(e) => updateReference("phone", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="refEmail">Email</Label>
                                <Input
                                    id="refEmail"
                                    type="email"
                                    placeholder="reference@example.com"
                                    value={data.reference?.email || ""}
                                    onChange={(e) => updateReference("email", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Next Button */}
            <div className="pt-4">
                <Button
                    onClick={onNext}
                    className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                >
                    Preview Resume
                </Button>
            </div>
        </div>
    );
}
