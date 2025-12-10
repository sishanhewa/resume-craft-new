import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import type { TemplateProps } from "../types";

export function ProfessionalTemplate({ data }: TemplateProps) {
    return (
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden max-w-[850px] mx-auto">
            <div className="flex min-h-[1100px]">
                <Sidebar data={data} />
                <MainContent data={data} />
            </div>
        </div>
    );
}
