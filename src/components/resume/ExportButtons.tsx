"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToPdf } from "@/lib/export";

interface ExportButtonsProps {
    filename?: string;
}

export function ExportButtons({ filename = "resume" }: ExportButtonsProps) {
    const [isExporting, setIsExporting] = useState(false);

    const handlePdfExport = async () => {
        setIsExporting(true);
        try {
            await exportToPdf("resume-print-area", `${filename}.pdf`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Button
            onClick={handlePdfExport}
            variant="outline"
            className="gap-2"
            disabled={isExporting}
        >
            {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Download className="w-4 h-4" />
            )}
            {isExporting ? "Generating..." : "Download PDF"}
        </Button>
    );
}



