import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import type { TemplateProps } from "../types";
import { A4_DIMENSIONS } from "../../A4PageContainer";

export function ProfessionalTemplate({ data }: TemplateProps) {
    return (
        <div
            className="bg-white"
            style={{
                width: `${A4_DIMENSIONS.width}px`,
                minHeight: `${A4_DIMENSIONS.height}px`,
            }}
        >
            {/* Content - uses items-stretch for equal height columns */}
            <div className="flex items-stretch" style={{ minHeight: `${A4_DIMENSIONS.height}px` }}>
                <Sidebar data={data} />
                <MainContent data={data} />
            </div>
        </div>
    );
}






