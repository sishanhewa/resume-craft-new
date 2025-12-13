import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Privacy Policy | ResumeCraft",
    description: "Privacy Policy for ResumeCraft - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-white/20 dark:border-white/10">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                            ResumeCraft
                        </span>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" className="rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <main className="pt-32 pb-20 px-6">
                <article className="max-w-3xl mx-auto prose prose-zinc dark:prose-invert">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                        Last updated: December 13, 2025
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            1. Introduction
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            ResumeCraft (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your
                            information when you use our resume building service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            2. Information We Collect
                        </h2>

                        <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
                            Personal Information You Provide
                        </h3>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Account information (email address, password)</li>
                            <li>Resume content (name, contact details, work history, education, skills)</li>
                            <li>Profile photos (stored as Base64 in your account)</li>
                        </ul>

                        <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
                            Automatically Collected Information
                        </h3>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>Usage patterns and feature interactions</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            3. How We Use Your Information
                        </h2>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>To provide and maintain our resume building service</li>
                            <li>To save and sync your resumes across devices</li>
                            <li>To process resume imports using AI (Gemini)</li>
                            <li>To generate PDF exports of your resumes</li>
                            <li>To improve our service and user experience</li>
                            <li>To enforce rate limits and prevent abuse</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            4. AI Processing
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            When you import a resume, we use Google&apos;s Gemini AI to extract and structure
                            your resume data. This processing is:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li><strong>Transient:</strong> Your resume text is not stored by the AI</li>
                            <li><strong>Server-side:</strong> Processing happens securely on our servers</li>
                            <li><strong>Purpose-limited:</strong> Used only to parse resume structure</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            5. Data Storage & Security
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            Your data is stored securely using Supabase with the following protections:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Row-Level Security (RLS) ensures you can only access your own data</li>
                            <li>All data is encrypted in transit (HTTPS/TLS)</li>
                            <li>Authentication via secure HTTP-only cookies</li>
                            <li>API keys are stored server-side and never exposed to clients</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            6. Data Sharing
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            We do not sell, trade, or rent your personal information to third parties.
                            Your resume data is only shared with:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mt-4">
                            <li><strong>Supabase:</strong> Our database provider (for storage)</li>
                            <li><strong>Google AI:</strong> For resume import parsing (transient only)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            7. Your Rights
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Access your personal data</li>
                            <li>Edit or update your information</li>
                            <li>Delete your account and all associated data</li>
                            <li>Export your resumes in PDF format</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            8. Cookies
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            We use essential cookies for authentication and session management.
                            These cookies are necessary for the service to function and cannot be disabled.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            9. Children&apos;s Privacy
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Our service is not intended for children under 13 years of age.
                            We do not knowingly collect personal information from children.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            10. Changes to This Policy
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of
                            any changes by posting the new Privacy Policy on this page and updating the
                            &quot;Last updated&quot; date.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            11. Contact Us
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p className="text-blue-600 dark:text-blue-400 mt-2">
                            privacy@resumecraft.app
                        </p>
                    </section>
                </article>
            </main>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                            <FileText className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            ResumeCraft
                        </span>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        © 2025 ResumeCraft. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
