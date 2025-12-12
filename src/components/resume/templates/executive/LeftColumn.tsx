import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import type { ResumeContent } from "@/types/resume";

interface LeftColumnProps {
    data: ResumeContent;
}

export function LeftColumn({ data }: LeftColumnProps) {
    return (
        <div className="w-[280px] bg-zinc-50 px-8 py-8 border-r border-zinc-200 flex-shrink-0 self-stretch">
            {/* Contact Section */}
            <section className="mb-8">
                <SectionHeader title="Contact" />
                <div className="space-y-3 mt-4">
                    {data.contact.address && (
                        <ContactItem icon={<MapPin className="w-4 h-4" />}>
                            {data.contact.address}
                        </ContactItem>
                    )}
                    {data.contact.phone && (
                        <ContactItem icon={<Phone className="w-4 h-4" />}>
                            {data.contact.phone}
                        </ContactItem>
                    )}
                    {data.contact.email && (
                        <ContactItem icon={<Mail className="w-4 h-4" />}>
                            <span className="break-all">{data.contact.email}</span>
                        </ContactItem>
                    )}
                    {data.contact.website && (
                        <ContactItem icon={<Linkedin className="w-4 h-4" />}>
                            <span className="break-all">{data.contact.website}</span>
                        </ContactItem>
                    )}
                </div>
            </section>

            {/* Skills Section */}
            {data.skills.length > 0 && (
                <section className="mb-8">
                    <SectionHeader title="Skills" />
                    <ul className="mt-4 space-y-2">
                        {data.skills.filter(Boolean).map((skill, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-zinc-700">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
                                <span>{skill}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Languages Section */}
            {data.languages.length > 0 && (
                <section className="mb-8">
                    <SectionHeader title="Languages" />
                    <ul className="mt-4 space-y-2">
                        {data.languages.map((lang) => (
                            <li key={lang.id} className="flex items-start gap-2 text-sm text-zinc-700 resume-section-item">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
                                <span>
                                    {lang.name}{" "}
                                    <span className="text-zinc-500">| {lang.proficiency}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Reference Section */}
            {data.reference?.name && (
                <section>
                    <SectionHeader title="Reference" />
                    <div className="mt-4 text-sm space-y-1 text-zinc-700">
                        <p className="font-semibold">{data.reference.name}</p>
                        {(data.reference.company || data.reference.role) && (
                            <p className="text-zinc-500 text-xs">
                                {data.reference.company}
                                {data.reference.role && ` / ${data.reference.role}`}
                            </p>
                        )}
                        {data.reference.phone && (
                            <p className="text-zinc-500 text-xs">
                                Phone: {data.reference.phone}
                            </p>
                        )}
                        {data.reference.email && (
                            <p className="text-zinc-500 text-xs break-all">
                                Email: {data.reference.email}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
                <section className="mb-8">
                    <SectionHeader title="Certifications" />
                    <ul className="mt-4 space-y-2">
                        {data.certifications.map((cert) => (
                            <li key={cert.id} className="text-sm text-zinc-700 resume-section-item">
                                <p className="font-medium">{cert.name}</p>
                                <p className="text-zinc-500 text-xs">{cert.issuer} • {cert.date}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Awards */}
            {data.awards && data.awards.length > 0 && (
                <section className="mb-8">
                    <SectionHeader title="Awards" />
                    <ul className="mt-4 space-y-2">
                        {data.awards.map((award) => (
                            <li key={award.id} className="text-sm text-zinc-700 resume-section-item">
                                <p className="font-medium">{award.title}</p>
                                <p className="text-zinc-500 text-xs">{award.issuer} • {award.date}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
                <section className="mb-8">
                    <SectionHeader title="Interests" />
                    <ul className="mt-4 space-y-2">
                        {data.interests.filter(Boolean).map((interest, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-zinc-700">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
                                <span>{interest}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Portfolio Links */}
            {data.portfolio && data.portfolio.length > 0 && (
                <section className="mb-8">
                    <SectionHeader title="Portfolio" />
                    <ul className="mt-4 space-y-2">
                        {data.portfolio.map((link) => (
                            <li key={link.id} className="text-sm text-zinc-700">
                                <p className="font-medium">{link.label}</p>
                                <p className="text-zinc-500 text-xs break-all">{link.url}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
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

// Contact Item Component
function ContactItem({
    icon,
    children,
}: {
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-3 text-sm text-zinc-600">
            <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-zinc-500">
                {icon}
            </div>
            <span className="pt-0.5">{children}</span>
        </div>
    );
}

