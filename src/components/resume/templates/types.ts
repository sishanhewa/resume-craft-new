import type { ResumeContent } from "@/types/resume";

export interface ResumeTemplate {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    component: React.ComponentType<TemplateProps>;
}

export interface TemplateProps {
    data: ResumeContent;
}

export type TemplateRegistry = Record<string, ResumeTemplate>;
