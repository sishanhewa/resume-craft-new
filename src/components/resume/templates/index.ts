import { ProfessionalTemplate } from "./professional";
import { ExecutiveTemplate } from "./executive";
import { CreativeTemplate } from "./creative";
import { ClassicTemplate } from "./classic";
import type { TemplateRegistry } from "./types";

export const templates: TemplateRegistry = {
    professional: {
        id: "professional",
        name: "Professional",
        description: "Classic two-column layout with dark sidebar",
        thumbnail: "/templates/professional.png",
        component: ProfessionalTemplate,
        sidebar: {
            width: 280,
            color: "#2c3e50",
            position: "left",
        },
    },
    executive: {
        id: "executive",
        name: "Executive",
        description: "Clean minimalist design with light sidebar",
        thumbnail: "/templates/executive.png",
        component: ExecutiveTemplate,
        sidebar: {
            width: 280,
            color: "#fafafa",
            position: "left",
        },
    },
    creative: {
        id: "creative",
        name: "Creative",
        description: "Bold maximalist design with gradient header",
        thumbnail: "/templates/creative.png",
        component: CreativeTemplate,
        // No sidebar config - this template uses full-width gradient header
    },
    classic: {
        id: "classic",
        name: "Classic",
        description: "Traditional ATS-friendly format, widely accepted",
        thumbnail: "/templates/classic.png",
        component: ClassicTemplate,
        // No sidebar - clean single-column traditional layout
    },
};

export const getTemplate = (id: string) => {
    return templates[id] || templates.professional;
};

export const getTemplateList = () => {
    return Object.values(templates);
};

export * from "./types";
export { ProfessionalTemplate } from "./professional";
export { ExecutiveTemplate } from "./executive";
export { CreativeTemplate } from "./creative";
export { ClassicTemplate } from "./classic";




