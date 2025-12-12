import type { ResumeContent } from "@/types/resume";

interface RightColumnProps {
    data: ResumeContent;
}

export function RightColumn({ data }: RightColumnProps) {
    return (
        <div className="flex-1 px-8 py-8 bg-white">
            {/* Summary Section */}
            {data.profile && (
                <section className="mb-8">
                    <SectionHeader title="Summary" />
                    <p className="text-sm text-zinc-600 leading-relaxed mt-4 text-justify">
                        {data.profile}
                    </p>
                </section>
            )}

            {/* Work Experience */}
            {data.experience.length > 0 && (
                <section className="mb-8">
                    <SectionHeader title="Work Experience" />
                    <div className="mt-4 space-y-6">
                        {data.experience.map((exp) => (
                            <div key={exp.id} className="resume-section-item">
                                <h3 className="font-bold text-sm text-zinc-800 uppercase tracking-wide">
                                    {exp.position || "Position"}
                                </h3>
                                <p className="text-xs text-zinc-500 mt-0.5">
                                    <span className="font-medium text-zinc-600">{exp.company || "Company"}</span>
                                    {" . "}
                                    <span className="italic">
                                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                    </span>
                                </p>
                                {exp.description.filter(Boolean).length > 0 && (
                                    <ul className="text-sm text-zinc-600 space-y-1 mt-2">
                                        {exp.description.filter(Boolean).map((desc, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-zinc-400">•</span>
                                                <span className="text-justify">{desc}</span>
                                            </li>
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
                <section>
                    <SectionHeader title="Education" />
                    <div className="mt-4 space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id} className="resume-section-item">
                                <h3 className="font-bold text-sm text-zinc-800 uppercase tracking-wide">
                                    {edu.degree || "Degree"}
                                </h3>
                                <p className="text-xs text-zinc-500 mt-0.5">
                                    <span className="font-medium text-zinc-600">{edu.institution || "Institution"}</span>
                                    {" . "}
                                    <span className="italic">
                                        {edu.startYear} - {edu.endYear}
                                    </span>
                                </p>
                                {edu.gpa && (
                                    <p className="text-sm text-zinc-600 mt-1">
                                        GPA: <span className="font-medium">{edu.gpa}</span>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <section className="mt-8">
                    <SectionHeader title="Projects" />
                    <div className="mt-4 space-y-4">
                        {data.projects.map((project) => (
                            <div key={project.id} className="resume-section-item">
                                <h3 className="font-bold text-sm text-zinc-800 uppercase tracking-wide">
                                    {project.name}
                                </h3>
                                {project.link && (
                                    <p className="text-xs text-zinc-500 mt-0.5 break-all">{project.link}</p>
                                )}
                                <p className="text-sm text-zinc-600 mt-1">{project.description}</p>
                                {project.technologies.length > 0 && (
                                    <p className="text-xs text-zinc-500 mt-1">
                                        <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Volunteer Experience */}
            {data.volunteer && data.volunteer.length > 0 && (
                <section className="mt-8">
                    <SectionHeader title="Volunteer Experience" />
                    <div className="mt-4 space-y-6">
                        {data.volunteer.map((vol) => (
                            <div key={vol.id} className="resume-section-item">
                                <h3 className="font-bold text-sm text-zinc-800 uppercase tracking-wide">
                                    {vol.role}
                                </h3>
                                <p className="text-xs text-zinc-500 mt-0.5">
                                    <span className="font-medium text-zinc-600">{vol.organization}</span>
                                    {" . "}
                                    <span className="italic">
                                        {vol.startDate} - {vol.current ? "Present" : vol.endDate}
                                    </span>
                                </p>
                                {vol.description.filter(Boolean).length > 0 && (
                                    <ul className="text-sm text-zinc-600 space-y-1 mt-2">
                                        {vol.description.filter(Boolean).map((desc, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-zinc-400">•</span>
                                                <span className="text-justify">{desc}</span>
                                            </li>
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
                    <SectionHeader title="Publications" />
                    <div className="mt-4 space-y-3">
                        {data.publications.map((pub) => (
                            <div key={pub.id} className="resume-section-item">
                                <h3 className="font-bold text-sm text-zinc-800">{pub.title}</h3>
                                <p className="text-xs text-zinc-500">{pub.publisher} • {pub.date}</p>
                                {pub.link && <p className="text-xs text-zinc-500 break-all">{pub.link}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Custom Sections */}
            {data.customSections && data.customSections.map((section) => (
                section.title && section.items.length > 0 && (
                    <section key={section.id} className="mt-8">
                        <SectionHeader title={section.title} />
                        <ul className="mt-4 space-y-1">
                            {section.items.filter(Boolean).map((item, i) => (
                                <li key={i} className="flex gap-2 text-sm text-zinc-600">
                                    <span className="text-zinc-400">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )
            ))}
        </div>
    );
}

// Section Header Component
function SectionHeader({ title }: { title: string }) {
    return (
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-800 pb-2 border-b border-zinc-300">
            {title}
        </h2>
    );
}
