"use client";

import { Plus, Trash2, X, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
    ResumeContent,
    Project,
    Certification,
    Award,
    Volunteer,
    Publication,
    PortfolioLink,
    CustomSection,
} from "@/types/resume";

// Available optional sections
export const OPTIONAL_SECTIONS = [
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "certifications", label: "Certifications", icon: "📜" },
    { id: "awards", label: "Awards & Achievements", icon: "🏆" },
    { id: "volunteer", label: "Volunteer Experience", icon: "❤️" },
    { id: "publications", label: "Publications", icon: "📰" },
    { id: "interests", label: "Interests", icon: "⭐" },
    { id: "portfolio", label: "Portfolio / Links", icon: "🔗" },
    { id: "customSections", label: "Custom Section", icon: "✏️" },
] as const;

export type OptionalSectionKey = typeof OPTIONAL_SECTIONS[number]["id"];

interface OptionalSectionsFormProps {
    data: ResumeContent;
    onChange: (data: ResumeContent) => void;
}

export function OptionalSectionsForm({ data, onChange }: OptionalSectionsFormProps) {
    // Check which sections are enabled (have data)
    const enabledSections = OPTIONAL_SECTIONS.filter(
        (section) => data[section.id] !== undefined && data[section.id] !== null
    );

    const availableSections = OPTIONAL_SECTIONS.filter(
        (section) => data[section.id] === undefined || data[section.id] === null
    );

    const addSection = (sectionId: OptionalSectionKey) => {
        const newData = { ...data };
        switch (sectionId) {
            case "projects":
                newData.projects = [];
                break;
            case "certifications":
                newData.certifications = [];
                break;
            case "awards":
                newData.awards = [];
                break;
            case "volunteer":
                newData.volunteer = [];
                break;
            case "publications":
                newData.publications = [];
                break;
            case "interests":
                newData.interests = [];
                break;
            case "portfolio":
                newData.portfolio = [];
                break;
            case "customSections":
                newData.customSections = [
                    ...(newData.customSections || []),
                    { id: crypto.randomUUID(), title: "", items: [] },
                ];
                break;
        }
        onChange(newData);
    };

    const removeSection = (sectionId: OptionalSectionKey) => {
        const newData = { ...data };
        newData[sectionId] = undefined;
        onChange(newData);
    };

    return (
        <div className="space-y-4">
            {/* Add Section Button */}
            {availableSections.length > 0 && (
                <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                        Add optional sections to your resume
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {availableSections.map((section) => (
                            <Button
                                key={section.id}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addSection(section.id)}
                                className="text-xs"
                            >
                                <span className="mr-1">{section.icon}</span>
                                {section.label}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Render enabled sections */}
            {data.projects !== undefined && (
                <ProjectsSection
                    projects={data.projects}
                    onChange={(projects) => onChange({ ...data, projects })}
                    onRemove={() => removeSection("projects")}
                />
            )}

            {data.certifications !== undefined && (
                <CertificationsSection
                    certifications={data.certifications}
                    onChange={(certifications) => onChange({ ...data, certifications })}
                    onRemove={() => removeSection("certifications")}
                />
            )}

            {data.awards !== undefined && (
                <AwardsSection
                    awards={data.awards}
                    onChange={(awards) => onChange({ ...data, awards })}
                    onRemove={() => removeSection("awards")}
                />
            )}

            {data.volunteer !== undefined && (
                <VolunteerSection
                    volunteer={data.volunteer}
                    onChange={(volunteer) => onChange({ ...data, volunteer })}
                    onRemove={() => removeSection("volunteer")}
                />
            )}

            {data.publications !== undefined && (
                <PublicationsSection
                    publications={data.publications}
                    onChange={(publications) => onChange({ ...data, publications })}
                    onRemove={() => removeSection("publications")}
                />
            )}

            {data.interests !== undefined && (
                <InterestsSection
                    interests={data.interests}
                    onChange={(interests) => onChange({ ...data, interests })}
                    onRemove={() => removeSection("interests")}
                />
            )}

            {data.portfolio !== undefined && (
                <PortfolioSection
                    portfolio={data.portfolio}
                    onChange={(portfolio) => onChange({ ...data, portfolio })}
                    onRemove={() => removeSection("portfolio")}
                />
            )}

            {data.customSections !== undefined && data.customSections.map((section, index) => (
                <CustomSectionForm
                    key={section.id}
                    section={section}
                    onChange={(updated) => {
                        const newSections = [...(data.customSections || [])];
                        newSections[index] = updated;
                        onChange({ ...data, customSections: newSections });
                    }}
                    onRemove={() => {
                        const newSections = (data.customSections || []).filter((_, i) => i !== index);
                        onChange({ ...data, customSections: newSections.length > 0 ? newSections : undefined });
                    }}
                />
            ))}
        </div>
    );
}

// Section Header with remove button
function SectionHeaderWithRemove({
    title,
    icon,
    onRemove,
}: {
    title: string;
    icon: string;
    onRemove: () => void;
}) {
    return (
        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-t-xl">
            <span className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>{icon}</span>
                {title}
            </span>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
                <X className="w-4 h-4" />
            </Button>
        </div>
    );
}

// Projects Section
function ProjectsSection({
    projects,
    onChange,
    onRemove,
}: {
    projects: Project[];
    onChange: (projects: Project[]) => void;
    onRemove: () => void;
}) {
    const addProject = () => {
        onChange([
            ...projects,
            {
                id: crypto.randomUUID(),
                name: "",
                description: "",
                technologies: [],
                link: "",
            },
        ]);
    };

    const updateProject = (id: string, field: keyof Project, value: unknown) => {
        onChange(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    const removeProject = (id: string) => {
        onChange(projects.filter((p) => p.id !== id));
    };

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <SectionHeaderWithRemove title="Projects" icon="🚀" onRemove={onRemove} />
            <div className="p-4 space-y-4">
                {projects.map((project, index) => (
                    <div key={project.id} className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
                                Project {index + 1}
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeProject(project.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Project Name</Label>
                                <Input
                                    placeholder="My Awesome Project"
                                    value={project.name}
                                    onChange={(e) => updateProject(project.id, "name", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Link (optional)</Label>
                                <Input
                                    placeholder="https://github.com/..."
                                    value={project.link || ""}
                                    onChange={(e) => updateProject(project.id, "link", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Describe the project..."
                                value={project.description}
                                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                                className="min-h-[80px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Technologies (comma-separated)</Label>
                            <Input
                                placeholder="React, TypeScript, Node.js"
                                value={project.technologies.join(", ")}
                                onChange={(e) =>
                                    updateProject(
                                        project.id,
                                        "technologies",
                                        e.target.value.split(",").map((t) => t.trim())
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addProject} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>
        </div>
    );
}

// Certifications Section
function CertificationsSection({
    certifications,
    onChange,
    onRemove,
}: {
    certifications: Certification[];
    onChange: (certifications: Certification[]) => void;
    onRemove: () => void;
}) {
    const addCertification = () => {
        onChange([
            ...certifications,
            { id: crypto.randomUUID(), name: "", issuer: "", date: "" },
        ]);
    };

    const updateCert = (id: string, field: keyof Certification, value: string) => {
        onChange(certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    };

    const removeCert = (id: string) => {
        onChange(certifications.filter((c) => c.id !== id));
    };

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <SectionHeaderWithRemove title="Certifications" icon="📜" onRemove={onRemove} />
            <div className="p-4 space-y-3">
                {certifications.map((cert, index) => (
                    <div key={cert.id} className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
                                Certification {index + 1}
                            </span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeCert(cert.id)} className="text-red-500">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Certification Name</Label>
                                <Input placeholder="AWS Solutions Architect" value={cert.name} onChange={(e) => updateCert(cert.id, "name", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Issuing Organization</Label>
                                <Input placeholder="Amazon Web Services" value={cert.issuer} onChange={(e) => updateCert(cert.id, "issuer", e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Date Obtained</Label>
                                <Input placeholder="2023" value={cert.date} onChange={(e) => updateCert(cert.id, "date", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Credential ID (optional)</Label>
                                <Input placeholder="ABC123XYZ" value={cert.credentialId || ""} onChange={(e) => updateCert(cert.id, "credentialId", e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addCertification} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certification
                </Button>
            </div>
        </div>
    );
}

// Awards Section
function AwardsSection({
    awards,
    onChange,
    onRemove,
}: {
    awards: Award[];
    onChange: (awards: Award[]) => void;
    onRemove: () => void;
}) {
    const addAward = () => {
        onChange([...awards, { id: crypto.randomUUID(), title: "", issuer: "", date: "" }]);
    };

    const updateAward = (id: string, field: keyof Award, value: string) => {
        onChange(awards.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
    };

    const removeAward = (id: string) => {
        onChange(awards.filter((a) => a.id !== id));
    };

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <SectionHeaderWithRemove title="Awards & Achievements" icon="🏆" onRemove={onRemove} />
            <div className="p-4 space-y-3">
                {awards.map((award, index) => (
                    <div key={award.id} className="flex gap-2 items-start">
                        <div className="flex-1 grid gap-2 sm:grid-cols-3">
                            <Input placeholder="Award Title" value={award.title} onChange={(e) => updateAward(award.id, "title", e.target.value)} />
                            <Input placeholder="Issuer" value={award.issuer} onChange={(e) => updateAward(award.id, "issuer", e.target.value)} />
                            <Input placeholder="Year" value={award.date} onChange={(e) => updateAward(award.id, "date", e.target.value)} />
                        </div>
                        <Button type="button" variant="outline" size="icon" onClick={() => removeAward(award.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addAward} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Award
                </Button>
            </div>
        </div>
    );
}

// Volunteer Section (similar to Experience)
function VolunteerSection({
    volunteer,
    onChange,
    onRemove,
}: {
    volunteer: Volunteer[];
    onChange: (volunteer: Volunteer[]) => void;
    onRemove: () => void;
}) {
    const addVolunteer = () => {
        onChange([
            ...volunteer,
            { id: crypto.randomUUID(), organization: "", role: "", startDate: "", endDate: "", current: false, description: [] },
        ]);
    };

    const updateVolunteer = (id: string, field: keyof Volunteer, value: unknown) => {
        onChange(volunteer.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
    };

    const removeVolunteer = (id: string) => {
        onChange(volunteer.filter((v) => v.id !== id));
    };

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <SectionHeaderWithRemove title="Volunteer Experience" icon="❤️" onRemove={onRemove} />
            <div className="p-4 space-y-4">
                {volunteer.map((vol, index) => (
                    <div key={vol.id} className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">Volunteer {index + 1}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeVolunteer(vol.id)} className="text-red-500">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Organization</Label>
                                <Input placeholder="Red Cross" value={vol.organization} onChange={(e) => updateVolunteer(vol.id, "organization", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Input placeholder="Volunteer Coordinator" value={vol.role} onChange={(e) => updateVolunteer(vol.id, "role", e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input placeholder="Start Date" value={vol.startDate} onChange={(e) => updateVolunteer(vol.id, "startDate", e.target.value)} />
                            <Input placeholder="End Date" value={vol.endDate} onChange={(e) => updateVolunteer(vol.id, "endDate", e.target.value)} disabled={vol.current} />
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addVolunteer} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Volunteer Experience
                </Button>
            </div>
        </div>
    );
}

// Publications Section
function PublicationsSection({
    publications,
    onChange,
    onRemove,
}: {
    publications: Publication[];
    onChange: (publications: Publication[]) => void;
    onRemove: () => void;
}) {
    const addPublication = () => {
        onChange([...publications, { id: crypto.randomUUID(), title: "", publisher: "", date: "" }]);
    };

    const updatePub = (id: string, field: keyof Publication, value: string) => {
        onChange(publications.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    const removePub = (id: string) => {
        onChange(publications.filter((p) => p.id !== id));
    };

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <SectionHeaderWithRemove title="Publications" icon="📰" onRemove={onRemove} />
            <div className="p-4 space-y-3">
                {publications.map((pub, index) => (
                    <div key={pub.id} className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">Publication {index + 1}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removePub(pub.id)} className="text-red-500">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input placeholder="Research Paper Title" value={pub.title} onChange={(e) => updatePub(pub.id, "title", e.target.value)} />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Publisher / Journal</Label>
                                <Input placeholder="IEEE" value={pub.publisher} onChange={(e) => updatePub(pub.id, "publisher", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <Input placeholder="2023" value={pub.date} onChange={(e) => updatePub(pub.id, "date", e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Link (optional)</Label>
                            <Input placeholder="https://doi.org/..." value={pub.link || ""} onChange={(e) => updatePub(pub.id, "link", e.target.value)} />
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addPublication} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Publication
                </Button>
            </div>
        </div>
    );
}

// Interests Section (simple list)
function InterestsSection({
    interests,
    onChange,
    onRemove,
}: {
    interests: string[];
    onChange: (interests: string[]) => void;
    onRemove: () => void;
}) {
    const addInterest = () => onChange([...interests, ""]);
    const updateInterest = (index: number, value: string) => {
        const newInterests = [...interests];
        newInterests[index] = value;
        onChange(newInterests);
    };
    const removeInterest = (index: number) => onChange(interests.filter((_, i) => i !== index));

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <SectionHeaderWithRemove title="Interests" icon="⭐" onRemove={onRemove} />
            <div className="p-4 space-y-3">
                {interests.map((interest, index) => (
                    <div key={index} className="flex gap-2">
                        <Input placeholder="e.g., Photography" value={interest} onChange={(e) => updateInterest(index, e.target.value)} />
                        <Button type="button" variant="outline" size="icon" onClick={() => removeInterest(index)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addInterest} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Interest
                </Button>
            </div>
        </div>
    );
}

// Portfolio Section
function PortfolioSection({
    portfolio,
    onChange,
    onRemove,
}: {
    portfolio: PortfolioLink[];
    onChange: (portfolio: PortfolioLink[]) => void;
    onRemove: () => void;
}) {
    const addLink = () => onChange([...portfolio, { id: crypto.randomUUID(), label: "", url: "" }]);
    const updateLink = (id: string, field: keyof PortfolioLink, value: string) => {
        onChange(portfolio.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };
    const removeLink = (id: string) => onChange(portfolio.filter((p) => p.id !== id));

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <SectionHeaderWithRemove title="Portfolio / Links" icon="🔗" onRemove={onRemove} />
            <div className="p-4 space-y-3">
                {portfolio.map((link) => (
                    <div key={link.id} className="flex gap-2">
                        <Input placeholder="Label (e.g., GitHub)" value={link.label} onChange={(e) => updateLink(link.id, "label", e.target.value)} className="w-1/3" />
                        <Input placeholder="https://..." value={link.url} onChange={(e) => updateLink(link.id, "url", e.target.value)} className="flex-1" />
                        <Button type="button" variant="outline" size="icon" onClick={() => removeLink(link.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addLink} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                </Button>
            </div>
        </div>
    );
}

// Custom Section
function CustomSectionForm({
    section,
    onChange,
    onRemove,
}: {
    section: CustomSection;
    onChange: (section: CustomSection) => void;
    onRemove: () => void;
}) {
    const addItem = () => onChange({ ...section, items: [...section.items, ""] });
    const updateItem = (index: number, value: string) => {
        const newItems = [...section.items];
        newItems[index] = value;
        onChange({ ...section, items: newItems });
    };
    const removeItem = (index: number) => onChange({ ...section, items: section.items.filter((_, i) => i !== index) });

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <SectionHeaderWithRemove title={section.title || "Custom Section"} icon="✏️" onRemove={onRemove} />
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input placeholder="e.g., Hobbies, Achievements" value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label>Items</Label>
                    {section.items.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <Input placeholder="Item..." value={item} onChange={(e) => updateItem(index, e.target.value)} />
                            <Button type="button" variant="outline" size="icon" onClick={() => removeItem(index)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="ghost" size="sm" onClick={addItem} className="text-blue-600">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Item
                    </Button>
                </div>
            </div>
        </div>
    );
}
