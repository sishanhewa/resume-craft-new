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

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section className="mb-8">
                        <SectionTitle>🚀 Projects</SectionTitle>
                        <div className="space-y-4">
                            {data.projects.map((project) => (
                                <div key={project.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold">{project.name}</h3>
                                        {project.link && (
                                            <span className="text-sm text-blue-600 break-all">{project.link}</span>
                                        )}
                                    </div>
                                    <p className="text-zinc-600 text-sm mb-1">{project.description}</p>
                                    {project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications && data.certifications.length > 0 && (
                    <section className="mb-8">
                        <SectionTitle>📜 Certifications</SectionTitle>
                        <div className="space-y-3">
                            {data.certifications.map((cert) => (
                                <div key={cert.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold">{cert.name}</h3>
                                        <span className="text-sm text-zinc-500">{cert.date}</span>
                                    </div>
                                    <p className="text-zinc-600 text-sm">{cert.issuer}</p>
                                    {cert.credentialId && (
                                        <p className="text-zinc-500 text-xs">ID: {cert.credentialId}</p>
                                    )}
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

                {/* Awards */}
                {data.awards && data.awards.length > 0 && (
                    <section className="mt-8">
                        <SectionTitle>🏆 Awards & Achievements</SectionTitle>
                        <div className="space-y-3">
                            {data.awards.map((award) => (
                                <div key={award.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold">{award.title}</h3>
                                        <span className="text-sm text-zinc-500">{award.date}</span>
                                    </div>
                                    <p className="text-zinc-600 text-sm">{award.issuer}</p>
                                    {award.description && (
                                        <p className="text-zinc-500 text-sm mt-1">{award.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer Experience */}
                {data.volunteer && data.volunteer.length > 0 && (
                    <section className="mt-8">
                        <SectionTitle>❤️ Volunteer Experience</SectionTitle>
                        <div className="space-y-4">
                            {data.volunteer.map((vol) => (
                                <div key={vol.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold">{vol.role}</h3>
                                        <span className="text-sm text-zinc-500">
                                            {vol.startDate} — {vol.current ? "Present" : vol.endDate}
                                        </span>
                                    </div>
                                    <p className="text-zinc-600 italic mb-2">{vol.organization}</p>
                                    {vol.description.length > 0 && (
                                        <ul className="list-disc list-outside ml-5 text-zinc-700 space-y-1 text-sm">
                                            {vol.description.filter(d => d).map((desc, j) => (
                                                <li key={j}>{desc}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications */}
                {data.publications && data.publications.length > 0 && (
                    <section className="mt-8">
                        <SectionTitle>📰 Publications</SectionTitle>
                        <div className="space-y-3">
                            {data.publications.map((pub) => (
                                <div key={pub.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold">{pub.title}</h3>
                                        <span className="text-sm text-zinc-500">{pub.date}</span>
                                    </div>
                                    <p className="text-zinc-600 text-sm">{pub.publisher}</p>
                                    {pub.description && (
                                        <p className="text-zinc-500 text-sm mt-1">{pub.description}</p>
                                    )}
                                    {pub.link && (
                                        <p className="text-blue-600 text-sm mt-1 break-all">{pub.link}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <section className="mt-8">
                        <SectionTitle>⭐ Interests</SectionTitle>
                        <div className="flex flex-wrap gap-2">
                            {data.interests.filter(Boolean).map((interest, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Portfolio / Links */}
                {data.portfolio && data.portfolio.length > 0 && (
                    <section className="mt-8">
                        <SectionTitle>🔗 Portfolio / Links</SectionTitle>
                        <div className="space-y-2">
                            {data.portfolio.map((link) => (
                                <div key={link.id} className="flex items-baseline gap-3">
                                    <span className="font-medium">{link.label}:</span>
                                    <span className="text-blue-600 text-sm break-all">{link.url}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Sections */}
                {data.customSections && data.customSections.length > 0 && (
                    <>
                        {data.customSections.map((section) => (
                            <section key={section.id} className="mt-8">
                                <SectionTitle>✏️ {section.title}</SectionTitle>
                                <ul className="list-disc list-outside ml-5 text-zinc-700 space-y-1 text-sm">
                                    {section.items.filter(Boolean).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </>
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
