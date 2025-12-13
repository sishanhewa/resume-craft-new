import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Star, Award } from "lucide-react";
import type { TemplateProps } from "../types";
import { A4_DIMENSIONS } from "../../A4PageContainer";

export function CreativeTemplate({ data }: TemplateProps) {
    return (
        <div
            className="bg-white"
            style={{ width: `${A4_DIMENSIONS.width}px` }}
        >
            {/* Hero Header with Gradient */}
            <div className="relative overflow-hidden">
                {/* Gradient Background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                    }}
                />

                {/* Decorative Shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-yellow-400/30 rounded-full" />

                {/* Header Content */}
                <div className="relative px-10 py-12 text-white">
                    <div className="flex items-center gap-8">
                        {/* Large Profile Photo */}
                        <div className="w-36 h-36 rounded-2xl overflow-hidden bg-white/20 border-4 border-white/40 shadow-2xl flex-shrink-0 rotate-3 hover:rotate-0 transition-transform">
                            {data.header.photoUrl ? (
                                <img
                                    src={data.header.photoUrl}
                                    alt={data.header.fullName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/30 flex items-center justify-center">
                                    <span className="text-4xl font-black">
                                        {data.header.fullName
                                            ? data.header.fullName.split(" ").map(n => n[0]).join("").toUpperCase()
                                            : "?"}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Name & Title */}
                        <div className="flex-1">
                            <h1 className="text-5xl font-black tracking-tight leading-none mb-2">
                                {data.header.fullName || "YOUR NAME"}
                            </h1>
                            <div className="flex items-center gap-3">
                                <div className="h-1 w-16 bg-yellow-400 rounded-full" />
                                <p className="text-xl font-medium text-white/90 uppercase tracking-widest">
                                    {data.header.jobTitle || "Your Profession"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Bar */}
                    <div className="mt-8 flex flex-wrap gap-6 text-sm">
                        {data.contact.email && (
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                                <Mail className="w-4 h-4" />
                                <span>{data.contact.email}</span>
                            </div>
                        )}
                        {data.contact.phone && (
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                                <Phone className="w-4 h-4" />
                                <span>{data.contact.phone}</span>
                            </div>
                        )}
                        {data.contact.address && (
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                                <MapPin className="w-4 h-4" />
                                <span>{data.contact.address}</span>
                            </div>
                        )}
                        {data.contact.website && (
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                                <Globe className="w-4 h-4" />
                                <span>{data.contact.website}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-10 py-8">
                {/* Profile Summary */}
                {data.profile && (
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                                <Star className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide">About Me</h2>
                        </div>
                        <p className="text-zinc-600 leading-relaxed text-lg border-l-4 border-purple-400 pl-6 italic">
                            {data.profile}
                        </p>
                    </section>
                )}

                {/* Two Column Layout */}
                <div className="grid grid-cols-5 gap-8">
                    {/* Left Column - Skills & Languages */}
                    <div className="col-span-2 space-y-8">
                        {/* Skills */}
                        {data.skills.length > 0 && (
                            <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                                <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-purple-700 shadow-sm border border-purple-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {data.languages.length > 0 && (
                            <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                                <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                                    Languages
                                </h2>
                                <div className="space-y-3">
                                    {data.languages.map((lang, i) => (
                                        <div key={i} className="flex justify-between items-center bg-white rounded-xl px-4 py-3 shadow-sm">
                                            <span className="font-bold text-zinc-800">{lang.name}</span>
                                            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                                                {lang.proficiency}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {data.certifications && data.certifications.length > 0 && (
                            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                                <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                                    📜 Certifications
                                </h2>
                                <div className="space-y-3">
                                    {data.certifications.map((cert) => (
                                        <div key={cert.id} className="bg-white rounded-xl p-4 shadow-sm">
                                            <p className="font-bold text-zinc-800">{cert.name}</p>
                                            <p className="text-emerald-600 text-sm font-medium">{cert.issuer} • {cert.date}</p>
                                            {cert.credentialId && (
                                                <p className="text-zinc-500 text-xs mt-1">ID: {cert.credentialId}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Reference */}
                        {data.reference?.name && (
                            <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
                                <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                                    Reference
                                </h2>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <p className="font-bold text-zinc-800 text-lg">{data.reference.name}</p>
                                    <p className="text-amber-600 font-medium">{data.reference.role}</p>
                                    {data.reference.company && (
                                        <p className="text-zinc-500 text-sm">{data.reference.company}</p>
                                    )}
                                    {data.reference.phone && (
                                        <p className="text-zinc-600 text-sm mt-2">{data.reference.phone}</p>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Awards */}
                        {data.awards && data.awards.length > 0 && (
                            <section className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6">
                                <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full" />
                                    🏆 Awards
                                </h2>
                                <div className="space-y-3">
                                    {data.awards.map((award) => (
                                        <div key={award.id} className="bg-white rounded-xl p-4 shadow-sm">
                                            <p className="font-bold text-zinc-800">{award.title}</p>
                                            <p className="text-amber-600 text-sm font-medium">{award.issuer} • {award.date}</p>
                                            {award.description && (
                                                <p className="text-zinc-500 text-sm mt-1">{award.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Interests */}
                        {data.interests && data.interests.length > 0 && (
                            <section className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6">
                                <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full" />
                                    ⭐ Interests
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.interests.filter(Boolean).map((interest, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-rose-700 shadow-sm border border-rose-200"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Portfolio Links */}
                        {data.portfolio && data.portfolio.length > 0 && (
                            <section className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-6">
                                <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full" />
                                    🔗 Portfolio
                                </h2>
                                <div className="space-y-2">
                                    {data.portfolio.map((link) => (
                                        <div key={link.id} className="bg-white rounded-xl p-3 shadow-sm">
                                            <p className="font-bold text-zinc-800 text-sm">{link.label}</p>
                                            <p className="text-violet-600 text-xs break-all">{link.url}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column - Experience & Education */}
                    <div className="col-span-3 space-y-8">
                        {/* Work Experience */}
                        {data.experience.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide">Experience</h2>
                                </div>
                                <div className="space-y-6 border-l-4 border-gradient-to-b border-indigo-300 pl-6">
                                    {data.experience.map((exp, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-8 top-1 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white shadow" />
                                            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-black text-lg text-zinc-800">{exp.position || "Position"}</h3>
                                                    <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                                                        {exp.startDate || "Start"} - {exp.current ? "Present" : exp.endDate || "End"}
                                                    </span>
                                                </div>
                                                <p className="font-semibold text-purple-600 mb-2">{exp.company || "Company"}</p>
                                                {exp.description.length > 0 && (
                                                    <ul className="text-zinc-600 text-sm space-y-1">
                                                        {exp.description.filter(d => d).map((desc, j) => (
                                                            <li key={j} className="flex items-start gap-2">
                                                                <span className="text-purple-400 mt-1">▸</span>
                                                                {desc}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide">Education</h2>
                                </div>
                                <div className="grid gap-4">
                                    {data.education.map((edu, i) => (
                                        <div
                                            key={i}
                                            className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-black text-lg text-zinc-800">{edu.degree || "Degree"}</h3>
                                                    <p className="font-semibold text-emerald-600">{edu.institution || "Institution"}</p>
                                                    {edu.gpa && (
                                                        <span className="inline-block mt-2 text-sm font-bold text-white bg-emerald-500 px-3 py-1 rounded-full">
                                                            GPA: {edu.gpa}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-teal-700 bg-teal-200 px-3 py-1 rounded-full">
                                                    {edu.startYear || "Start"} - {edu.endYear || "End"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white">
                                        <span className="text-xl">🚀</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide">Projects</h2>
                                </div>
                                <div className="grid gap-4">
                                    {data.projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-5"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-black text-lg text-zinc-800">{project.name}</h3>
                                                {project.link && (
                                                    <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full break-all">
                                                        Link
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-zinc-600 text-sm mb-2">{project.description}</p>
                                            {project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {project.technologies.map((tech, i) => (
                                                        <span key={i} className="px-2 py-1 bg-white rounded-full text-xs font-medium text-orange-700 border border-orange-200">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {project.link && (
                                                <p className="text-orange-600 text-xs mt-2 break-all">{project.link}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Volunteer Experience */}
                        {data.volunteer && data.volunteer.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white">
                                        <span className="text-xl">❤️</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide">Volunteer</h2>
                                </div>
                                <div className="space-y-6 border-l-4 border-rose-300 pl-6">
                                    {data.volunteer.map((vol, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-8 top-1 w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow" />
                                            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-black text-lg text-zinc-800">{vol.role}</h3>
                                                    <span className="text-sm font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                                                        {vol.startDate} - {vol.current ? "Present" : vol.endDate}
                                                    </span>
                                                </div>
                                                <p className="font-semibold text-rose-600 mb-2">{vol.organization}</p>
                                                {vol.description.length > 0 && (
                                                    <ul className="text-zinc-600 text-sm space-y-1">
                                                        {vol.description.filter(d => d).map((desc, j) => (
                                                            <li key={j} className="flex items-start gap-2">
                                                                <span className="text-rose-400 mt-1">▸</span>
                                                                {desc}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Publications */}
                        {data.publications && data.publications.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white">
                                        <span className="text-xl">📰</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide">Publications</h2>
                                </div>
                                <div className="grid gap-4">
                                    {data.publications.map((pub, i) => (
                                        <div
                                            key={i}
                                            className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-5"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-black text-lg text-zinc-800">{pub.title}</h3>
                                                    <p className="font-semibold text-sky-600">{pub.publisher}</p>
                                                    {pub.description && (
                                                        <p className="text-zinc-500 text-sm mt-2">{pub.description}</p>
                                                    )}
                                                    {pub.link && (
                                                        <p className="text-blue-600 text-sm mt-1 break-all">{pub.link}</p>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-blue-700 bg-blue-200 px-3 py-1 rounded-full">
                                                    {pub.date}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Custom Sections */}
                        {data.customSections && data.customSections.length > 0 && (
                            <>
                                {data.customSections.map((section) => (
                                    <section key={section.id}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-500 to-slate-600 flex items-center justify-center text-white">
                                                <span className="text-xl">✏️</span>
                                            </div>
                                            <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-wide">{section.title}</h2>
                                        </div>
                                        <div className="bg-gradient-to-r from-zinc-50 to-slate-50 border border-zinc-200 rounded-xl p-5">
                                            <ul className="text-zinc-600 text-sm space-y-2">
                                                {section.items.filter(Boolean).map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-zinc-400 mt-1">▸</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </section>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
