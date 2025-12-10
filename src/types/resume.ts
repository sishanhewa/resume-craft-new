export type ResumeData = {
  id?: string;
  user_id?: string;
  title: string;
  created_at?: string;
  updated_at?: string;
  content: ResumeContent;
};

export type ResumeContent = {
  header: HeaderInfo;
  contact: ContactInfo;
  profile: string;
  skills: string[];
  languages: Language[];
  experience: Experience[];
  education: Education[];
  reference?: Reference;
};

export type HeaderInfo = {
  fullName: string;
  jobTitle: string;
  photoUrl?: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  website?: string;
};

export type Language = {
  id: string;
  name: string;
  proficiency: "Basic" | "Intermediate" | "Fluent" | "Native";
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  gpa?: string;
};

export type Reference = {
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
};

export type ResumeTheme = {
  accentColor: string;
  fontFamily: string;
};

// Helper to create empty resume content
export const createEmptyResumeContent = (): ResumeContent => ({
  header: {
    fullName: "",
    jobTitle: "",
    photoUrl: "",
  },
  contact: {
    phone: "",
    email: "",
    address: "",
    website: "",
  },
  profile: "",
  skills: [],
  languages: [],
  experience: [],
  education: [],
  reference: undefined,
});
