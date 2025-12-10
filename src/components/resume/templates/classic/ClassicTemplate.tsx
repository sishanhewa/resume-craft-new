import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { TemplateProps } from "../types";
import { A4_DIMENSIONS } from "../../A4PageContainer";

export function ClassicTemplate({ data }: TemplateProps) {
    return (
        <div
            className="bg-white text-zinc-800"
            style={{ width: `${A4_DIMENSIONS.width}px` }}
        >
            {/* Header - Clean centered layout */}
            <header className="text-center py-10 border-b-2 border-zinc-800">
                <h1 className="text-4xl font-bold tracking-tight uppercase mb-1">
                    {data.header.fullName || "Your Name"}
                </h1>
                <p className="text-lg text-zinc-600 mb-4">
                    {data.header.jobTitle || "Professional Title"}
                </p>

                {/* Contact Row */}
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
                    {data.contact.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="w-4 h-4" />
                            <span>{data.contact.email}</span>
                        </div>
                    )}
                    {data.contact.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="w-4 h-4" />
                            <span>{data.contact.phone}</span>
                        </div>
                    )}
                    {data.contact.address && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{data.contact.address}</span>
                        </div>
                    )}
                    {data.contact.website && (
                        <div className="flex items-center gap-1.5">
                            <Globe className="w-4 h-4" />
                            <span>{data.contact.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="px-12 py-8">
                {/* Professional Summary */}
                {data.profile && (
                    <section className="mb-8">
                        <SectionTitle>Professional Summary</SectionTitle>
                        <p className="text-zinc-700 leading-relaxed">
                            {data.profile}
                        </p>
                    </section>
                )}

                {/* Work Experience */}
                {data.experience.length > 0 && (
                    <section className="mb-8">
                        <SectionTitle>Professional Experience</SectionTitle>
                        <div className="space-y-6">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg">{exp.position || "Position"}</h3>
                                        <span className="text-sm text-zinc-500">
                                            {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-zinc-600 italic mb-2">{exp.company || "Company Name"}</p>
                                    {exp.description.length > 0 && (
                                        <ul className="list-disc list-outside ml-5 text-zinc-700 space-y-1 text-sm">
                                            {exp.description.filter(d => d).map((desc, j) => (
                                                <li key={j}>{desc}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section className="mb-8">
                        <SectionTitle>Education</SectionTitle>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="font-bold">{edu.degree || "Degree"}</h3>
                                        <p className="text-zinc-600">{edu.institution || "Institution"}</p>
                                        {edu.gpa && <p className="text-sm text-zinc-500">GPA: {edu.gpa}</p>}
                                    </div>
                                    <span className="text-sm text-zinc-500">
                                        {edu.startYear} — {edu.endYear}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two Column Footer */}
                <div className="grid grid-cols-2 gap-12">
                    {/* Skills */}
                    {data.skills.length > 0 && (
                        <section>
                            <SectionTitle>Skills</SectionTitle>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages.length > 0 && (
                        <section>
                            <SectionTitle>Languages</SectionTitle>
                            <div className="space-y-1">
                                {data.languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span className="font-medium">{lang.name}</span>
                                        <span className="text-zinc-500">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Reference */}
                {data.reference?.name && (
                    <section className="mt-8 pt-6 border-t border-zinc-200">
                        <SectionTitle>Reference</SectionTitle>
                        <div className="text-sm">
                            <p className="font-semibold">{data.reference.name}</p>
                            <p className="text-zinc-600">{data.reference.role} at {data.reference.company}</p>
                            <p className="text-zinc-500 mt-1">
                                {data.reference.phone} • {data.reference.email}
                            </p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

// Reusable Section Title Component
function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-800 border-b border-zinc-300 pb-2 mb-4">
            {children}
        </h2>
    );
}
