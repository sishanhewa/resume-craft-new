"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export function CreateNewButton() {
    return (
        <Link
            href="/create-resume"
            className="group flex flex-col items-center justify-center gap-4 bg-white dark:bg-zinc-800 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/10 transition-all aspect-[210/297] h-full min-h-[300px]"
        >
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
            </div>
            <div className="text-center">
                <h3 className="font-medium text-zinc-900 dark:text-white">Create New Resume</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Start from scratch</p>
            </div>
        </Link>
    );
}
