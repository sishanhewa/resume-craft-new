"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDocx, parsePdf } from "@/lib/import";
import type { ResumeContent } from "@/types/resume";

interface ImportButtonProps {
    onImport: (data: Partial<ResumeContent>) => void;
}

export function ImportButton({ onImport }: ImportButtonProps) {
    const [isImporting, setIsImporting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        setError(null);

        try {
            let extractedData: Partial<ResumeContent>;

            if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
                extractedData = await parseDocx(file);
            } else if (file.name.endsWith(".pdf")) {
                extractedData = await parsePdf(file);
            } else {
                throw new Error("Unsupported file format. Please use PDF or DOCX.");
            }

            onImport(extractedData);
        } catch (err) {
            console.error("Import error:", err);
            setError(err instanceof Error ? err.message : "Failed to import file");
        } finally {
            setIsImporting(false);
            // Reset the input so the same file can be selected again
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
                className="hidden"
            />
            <Button
                onClick={handleClick}
                variant="outline"
                className="gap-2"
                disabled={isImporting}
            >
                {isImporting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Upload className="w-4 h-4" />
                )}
                {isImporting ? "Importing..." : "Import CV"}
            </Button>
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
            <p className="text-xs text-zinc-400">
                Supports PDF and DOCX files
            </p>
        </div>
    );
}
