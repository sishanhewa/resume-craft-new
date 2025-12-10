import type { ResumeContent } from "@/types/resume";

// Sidebar configuration for templates with sidebars
export interface SidebarConfig {
    width: number;       // Width in pixels (e.g., 280)
    color: string;       // CSS color (e.g., "#2c3e50" or "#fafafa")
    position: "left" | "right";
}

export interface ResumeTemplate {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    component: React.ComponentType<TemplateProps>;
    // Page layout configuration - handled globally by PaginatedResume
    sidebar?: SidebarConfig;  // Optional: only for templates with sidebars
}

export interface TemplateProps {
    data: ResumeContent;
}

export type TemplateRegistry = Record<string, ResumeTemplate>;

