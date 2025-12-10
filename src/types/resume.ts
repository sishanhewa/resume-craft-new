export type ResumeData = {
  id?: string;
  user_id?: string;
  title: string;
  created_at?: string;
  updated_at?: string;
  content: ResumeContent;
};

export type ResumeContent = {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
};

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  linkedin?: string;
  website?: string;
  summary?: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
};

export type ResumeTheme = {
  accentColor: string;
  fontFamily: string;
};
