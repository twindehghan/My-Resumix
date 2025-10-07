export interface Document {
  id: number;
  title?: string; // For user-generated titles
  titleKey?: string; // For translatable titles
  imageUrl: string;
  users?: number;
  lastUpdated?: string; // Keep for compatibility, but prefer lastUpdatedKey
  lastUpdatedKey?: string; // For translatable dates
  isLocked?: boolean;
}

export type Resume = Document;
export type CoverLetter = Document;

// New types for Resume Editor
export interface PersonalDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePhoto: string; // URL or base64 string
  summary: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  dates: string;
  responsibilities: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface LanguageProficiency {
  id: string;
  language: string;
  proficiency: string;
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Interest {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  education: EducationEntry[];
  skills: Skill[];
  projects: Project[];
  languages: LanguageProficiency[];
awards: Award[];
  interests: Interest[];
}

// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
}
