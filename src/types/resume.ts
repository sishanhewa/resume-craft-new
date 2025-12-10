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
  // Optional sections
  projects?: Project[];
  certifications?: Certification[];
  awards?: Award[];
  volunteer?: Volunteer[];
  publications?: Publication[];
  interests?: string[];
  portfolio?: PortfolioLink[];
  customSections?: CustomSection[];
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

// Optional Section Types
export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
};

export type Award = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
};

export type Volunteer = {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
};

export type Publication = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
  description?: string;
};

export type PortfolioLink = {
  id: string;
  label: string;
  url: string;
};

export type CustomSection = {
  id: string;
  title: string;
  items: string[];
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
  // Optional sections - undefined by default
  projects: undefined,
  certifications: undefined,
  awards: undefined,
  volunteer: undefined,
  publications: undefined,
  interests: undefined,
  portfolio: undefined,
  customSections: undefined,
});

