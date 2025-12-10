import type { ResumeContent } from "@/types/resume";

interface MainContentProps {
    data: ResumeContent;
}

export function MainContent({ data }: MainContentProps) {
    return (
        <div className="flex-1 p-8 bg-white">
            {/* Profile Summary */}
            {data.profile && (
                <section className="mb-8">
                    <SectionHeader title="Profile" />
                    <p className="text-sm text-zinc-600 leading-relaxed text-justify mt-4">
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
                            <div key={exp.id}>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-bold text-zinc-800">
                                            {exp.company || "Company Name"}
                                        </h3>
                                        <p className="text-sm text-zinc-500 italic">
                                            {exp.position || "Position"}
                                        </p>
                                    </div>
                                    <span className="text-sm text-zinc-500 whitespace-nowrap font-medium">
                                        {exp.startDate} - {exp.current ? "PRESENT" : exp.endDate}
                                    </span>
                                </div>
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
                            <div key={edu.id} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-zinc-800">
                                        {edu.degree || "Degree"}
                                    </h3>
                                    <p className="text-sm text-zinc-500">
                                        {edu.institution || "Institution"}
                                    </p>
                                    {edu.gpa && (
                                        <p className="text-sm text-zinc-500">
                                            GPA: <span className="font-semibold text-blue-600">{edu.gpa}</span>
                                        </p>
                                    )}
                                </div>
                                <span className="text-sm text-zinc-500 whitespace-nowrap font-medium">
                                    {edu.startYear} - {edu.endYear}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

// Section Header with icon square
function SectionHeader({ title }: { title: string }) {
    return (
        <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-wide flex items-center gap-3">
            <span className="w-3 h-3 bg-[#2c3e50]" />
            {title}
        </h2>
    );
}
