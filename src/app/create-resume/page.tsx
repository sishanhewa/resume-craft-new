import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import CreateResumeClient from "@/components/resume/CreateResumeClient";

export const runtime = 'edge';

export default function CreateResumePage() {
    return (
        <Suspense fallback={
            <div className="flex bg-white dark:bg-black items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
            </div>
        }>
            <CreateResumeClient />
        </Suspense>
    );
}
