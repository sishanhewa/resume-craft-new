import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import type { TemplateProps } from "../types";
import { A4_DIMENSIONS } from "../../A4PageContainer";

export function ProfessionalTemplate({ data }: TemplateProps) {
    return (
        <div className="bg-white flex">
            {/* Sidebar - positioned absolutely to appear on all pages */}
            <Sidebar data={data} />

            {/* Main Content - flows naturally across pages */}
            <MainContent data={data} />
        </div>
    );
}