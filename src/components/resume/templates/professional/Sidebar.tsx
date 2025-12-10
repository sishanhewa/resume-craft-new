import { Mail, Phone, Globe, MapPin } from "lucide-react";
import type { ResumeContent } from "@/types/resume";

interface SidebarProps {
    data: ResumeContent;
}

export function Sidebar({ data }: SidebarProps) {
    return (
        <div className="w-[280px] bg-[#2c3e50] text-white flex-shrink-0 self-stretch">
            {/* Header with Photo */}
            <div className="bg-[#34495e] px-6 pt-8 pb-6 text-center">
                {/* Profile Photo */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-sm overflow-hidden bg-zinc-400 border-4 border-white/10">
                    {data.header.photoUrl ? (
                        <img
                            src={data.header.photoUrl}
                            alt={data.header.fullName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-500 flex items-center justify-center">
                            <span className="text-3xl text-white font-bold">
                                {data.header.fullName
                                    ? data.header.fullName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()
                                    : "?"}
                            </span>
                        </div>
                    )}
                </div>
                {/* Name */}
                <h1 className="text-2xl font-bold tracking-wide uppercase leading-tight">
                    {data.header.fullName || "Your Name"}
                </h1>
                {/* Job Title */}
                <p className="text-sm text-zinc-300 mt-2 tracking-widest uppercase">
                    {data.header.jobTitle || "Job Title"}
                </p>
            </div>

            {/* Sidebar Content */}
            <div className="px-6 py-6 space-y-6">
                {/* Contact Section */}
                <section>
                    <SectionHeader title="Contact" />
                    <div className="space-y-3 mt-4">
                        {data.contact.phone && (
                            <ContactItem icon={<Phone className="w-3.5 h-3.5" />}>
                                {data.contact.phone}
                            </ContactItem>
                        )}
                        {data.contact.email && (
                            <ContactItem icon={<Mail className="w-3.5 h-3.5" />}>
                                <span className="break-all">{data.contact.email}</span>
                            </ContactItem>
                        )}
                        {data.contact.address && (
                            <ContactItem icon={<MapPin className="w-3.5 h-3.5" />}>
                                {data.contact.address}
                            </ContactItem>
                        )}
                        {data.contact.website && (
                            <ContactItem icon={<Globe className="w-3.5 h-3.5" />}>
                                <span className="break-all">{data.contact.website}</span>
                            </ContactItem>
                        )}
                    </div>
                </section>

                {/* Skills Section */}
                {data.skills.length > 0 && (
                    <section>
                        <SectionHeader title="Skills" />
                        <ul className="mt-4 space-y-2">
                            {data.skills.filter(Boolean).map((skill, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5 flex-shrink-0" />
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Languages Section */}
                {data.languages.length > 0 && (
                    <section>
                        <SectionHeader title="Languages" />
                        <ul className="mt-4 space-y-2">
                            {data.languages.map((lang) => (
                                <li key={lang.id} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5 flex-shrink-0" />
                                    <span>
                                        {lang.name}{" "}
                                        <span className="text-zinc-400">({lang.proficiency})</span>
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
                        <div className="mt-4 text-sm space-y-1">
                            <p className="font-semibold">{data.reference.name}</p>
                            {(data.reference.company || data.reference.role) && (
                                <p className="text-zinc-300 text-xs">
                                    {data.reference.company}
                                    {data.reference.role && ` / ${data.reference.role}`}
                                </p>
                            )}
                            {data.reference.phone && (
                                <p className="text-zinc-400 text-xs flex items-center gap-2">
                                    <span className="font-medium">Phone:</span>
                                    {data.reference.phone}
                                </p>
                            )}
                            {data.reference.email && (
                                <p className="text-zinc-400 text-xs flex items-center gap-2">
                                    <span className="font-medium">Email:</span>
                                    <span className="break-all">{data.reference.email}</span>
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications && data.certifications.length > 0 && (
                    <section>
                        <SectionHeader title="Certifications" />
                        <ul className="mt-4 space-y-2">
                            {data.certifications.map((cert) => (
                                <li key={cert.id} className="text-sm">
                                    <p className="font-medium">{cert.name}</p>
                                    <p className="text-zinc-400 text-xs">{cert.issuer} • {cert.date}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Awards */}
                {data.awards && data.awards.length > 0 && (
                    <section>
                        <SectionHeader title="Awards" />
                        <ul className="mt-4 space-y-2">
                            {data.awards.map((award) => (
                                <li key={award.id} className="text-sm">
                                    <p className="font-medium">{award.title}</p>
                                    <p className="text-zinc-400 text-xs">{award.issuer} • {award.date}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <section>
                        <SectionHeader title="Interests" />
                        <ul className="mt-4 space-y-2">
                            {data.interests.filter(Boolean).map((interest, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5 flex-shrink-0" />
                                    <span>{interest}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Portfolio Links */}
                {data.portfolio && data.portfolio.length > 0 && (
                    <section>
                        <SectionHeader title="Portfolio" />
                        <ul className="mt-4 space-y-2">
                            {data.portfolio.map((link) => (
                                <li key={link.id} className="text-sm">
                                    <p className="font-medium">{link.label}</p>
                                    <p className="text-zinc-400 text-xs break-all">{link.url}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
}

// Section Header Component
function SectionHeader({ title }: { title: string }) {
    return (
        <h2 className="text-sm font-bold tracking-wider uppercase pb-2 border-b border-zinc-500">
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
        <div className="flex items-start gap-3 text-sm">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                {icon}
            </div>
            <span className="pt-0.5">{children}</span>
        </div>
    );
}
