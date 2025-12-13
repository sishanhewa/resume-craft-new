"use client";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Sparkles, Download, ArrowRight, LayoutDashboard, Palette, Zap, Cloud, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { TemplateSlider } from "@/components/resume/TemplateSlider";
import { AuthModal } from "@/components/auth/AuthModal";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setLoading(false);
    };
    checkUser();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="login"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              ResumeCraft
            </span>
          </div>
          <div className="flex items-center gap-4">
            {!loading && (
              isAuthenticated ? (
                <Link href="/dashboard">
                  <Button variant="ghost" className="rounded-full font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setShowAuthModal(true)}
                  className="rounded-full font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  Sign In
                </Button>
              )
            )}
            {isAuthenticated ? (
              <Link href="/create-resume">
                <Button className="rounded-full px-5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                  New Resume
                </Button>
              </Link>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                className="rounded-full px-5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-500/10 border border-blue-200/50 dark:border-blue-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI-Powered Resume Builder
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Create stunning resumes
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
              in minutes
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Transform your career story into a beautifully designed, ATS-friendly resume.
            No design skills required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create-resume">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-base bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25"
              >
                Start Building
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-14 text-base border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Animated Stats & Visual Section */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Animated Glow Orbs */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="absolute top-1/2 right-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Glass Card Container */}
            <div className="relative backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl p-10 md:p-14 overflow-hidden">

              {/* Floating Icons Background */}
              <div className="absolute top-6 right-8 opacity-10 dark:opacity-5">
                <FileText className="w-32 h-32 text-blue-500" />
              </div>
              <div className="absolute bottom-4 left-8 opacity-10 dark:opacity-5">
                <Sparkles className="w-24 h-24 text-cyan-500" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 md:gap-8 mb-10">
                {[
                  { value: "4", label: "Pro Templates", color: "from-cyan-500 to-teal-500" },
                  { value: "< 5min", label: "Build Time", color: "from-purple-500 to-pink-500" },
                  { value: "Free", label: "To Get Started", color: "from-amber-500 to-orange-500" },
                ].map((stat, i) => (
                  <div key={i} className="text-center group">
                    <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: <Sparkles className="w-4 h-4" />, text: "AI-Powered Import", iconColor: "text-purple-500" },
                  { icon: <Palette className="w-4 h-4" />, text: "Professional Templates", iconColor: "text-pink-500" },
                  { icon: <Zap className="w-4 h-4" />, text: "Real-time Preview", iconColor: "text-amber-500" },
                  { icon: <Download className="w-4 h-4" />, text: "PDF Export", iconColor: "text-blue-500" },
                  { icon: <Cloud className="w-4 h-4" />, text: "Cloud Sync", iconColor: "text-cyan-500" },
                  { icon: <Lock className="w-4 h-4" />, text: "Secure & Private", iconColor: "text-green-500" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    <span className={feature.iconColor}>{feature.icon}</span>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section id="templates" className="py-20 px-6 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-4">
            Professional Templates
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12 max-w-xl mx-auto">
            Choose from our collection of beautifully designed, ATS-friendly resume templates.
          </p>

          <TemplateSlider />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-4">
            Everything you need
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-xl mx-auto">
            Powerful features to help you create professional resumes effortlessly.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Real-time Preview",
                description: "See your resume update instantly as you type.",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Beautiful Templates",
                description: "Choose from professionally designed templates.",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Export to PDF",
                description: "Download your resume in perfect PDF format.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to build your resume?
              </h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                Join thousands of job seekers who have landed their dream jobs with ResumeCraft.
              </p>
              <Link href="/create-resume">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 text-base bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                >
                  Get Started — It&apos;s Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
