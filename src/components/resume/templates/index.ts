import { ProfessionalTemplate } from "./professional";
import type { TemplateRegistry } from "./types";

export const templates: TemplateRegistry = {
    professional: {
        id: "professional",
        name: "Professional",
        description: "Classic two-column layout with dark sidebar",
        thumbnail: "/templates/professional.png",
        component: ProfessionalTemplate,
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
