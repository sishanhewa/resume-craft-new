import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Terms of Service | ResumeCraft",
    description: "Terms of Service for ResumeCraft - Read about our terms and conditions for using our resume building service.",
};

export default function TermsOfService() {
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
                        Terms of Service
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                        Last updated: December 13, 2025
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            By accessing or using ResumeCraft (&quot;the Service&quot;), you agree to be bound by
                            these Terms of Service. If you do not agree to these terms, please do not use
                            our Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            2. Description of Service
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            ResumeCraft is an online resume building platform that allows users to:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mt-4">
                            <li>Create and edit professional resumes</li>
                            <li>Import existing resumes from PDF or DOCX formats</li>
                            <li>Export resumes to PDF format</li>
                            <li>Choose from multiple professional templates</li>
                            <li>Store and manage multiple resumes</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            3. User Accounts
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            To access certain features, you must create an account. You agree to:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Provide accurate and complete registration information</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Notify us immediately of any unauthorized access</li>
                            <li>Accept responsibility for all activities under your account</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            4. Acceptable Use
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            You agree NOT to use the Service to:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Create resumes with false or misleading information</li>
                            <li>Impersonate another person or entity</li>
                            <li>Upload malicious content or attempt to compromise the Service</li>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Abuse the AI import feature or attempt to bypass rate limits</li>
                            <li>Scrape, crawl, or harvest data from the Service</li>
                            <li>Interfere with the proper functioning of the Service</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            5. Intellectual Property
                        </h2>

                        <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
                            Your Content
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            You retain all rights to the resume content you create. By using our Service,
                            you grant us a limited license to store, process, and display your content
                            solely for the purpose of providing the Service.
                        </p>

                        <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
                            Our Content
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            The Service, including templates, design elements, code, and branding, is owned
                            by ResumeCraft and protected by intellectual property laws. You may not copy,
                            modify, or distribute our proprietary content without permission.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            6. Service Limitations
                        </h2>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li><strong>Import Limits:</strong> 2 resume imports per 5 minutes per user</li>
                            <li><strong>Storage:</strong> Reasonable limits on resume storage per account</li>
                            <li><strong>AI Processing:</strong> Subject to third-party API availability</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            7. Third-Party Services
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Our Service integrates with:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mt-4">
                            <li><strong>Supabase:</strong> For authentication and data storage</li>
                            <li><strong>Google Gemini AI:</strong> For resume import parsing</li>
                        </ul>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
                            Your use of these services is subject to their respective terms and policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            8. Disclaimer of Warranties
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
                            IMPLIED. WE DO NOT GUARANTEE THAT:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mt-4">
                            <li>The Service will be uninterrupted or error-free</li>
                            <li>AI-parsed resume data will be 100% accurate</li>
                            <li>Resumes will guarantee job placement or interviews</li>
                            <li>The Service will meet all your requirements</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            9. Limitation of Liability
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, RESUMECRAFT SHALL NOT BE LIABLE FOR
                            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                            LOSS OF DATA, BUSINESS OPPORTUNITIES, OR PROFITS, ARISING FROM YOUR USE OF THE SERVICE.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            10. Account Termination
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            We reserve the right to suspend or terminate your account if you:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Violate these Terms of Service</li>
                            <li>Engage in abusive behavior</li>
                            <li>Attempt to compromise system security</li>
                        </ul>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
                            You may delete your account at any time through your dashboard settings.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            11. Modifications to Terms
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            We may modify these Terms at any time. Material changes will be communicated
                            through the Service or via email. Continued use of the Service after changes
                            constitutes acceptance of the modified Terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            12. Governing Law
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with applicable laws,
                            without regard to conflict of law principles.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                            13. Contact Information
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            For questions about these Terms, please contact us at:
                        </p>
                        <p className="text-blue-600 dark:text-blue-400 mt-2">
                            legal@resumecraft.app
                        </p>
                    </section>

                    <section className="p-6 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl mt-8">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            By creating an account or using ResumeCraft, you acknowledge that you have
                            read, understood, and agree to be bound by these Terms of Service.
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
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        © 2025 ResumeCraft. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
