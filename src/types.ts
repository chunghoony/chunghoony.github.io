export interface Profile {
  name: string;
  tagline: string;
  title: string;
  bio: string;
  avatar: string; // URL or emoji or custom initials representation
  location: string;
  resumeUrl?: string;
  skills: string[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string; // e.g., "CHI 2026", "NeurIPS 2025"
  year: string;
  doi?: string;
  abstract: string;
  bibtex?: string;
  paperUrl?: string;
  codeUrl?: string;
  category: string; // "Journal" | "Conference" | "Workshop" | "Preprint"
  tags: string[];
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Support markdown or rich paragraphs
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  image: string; // Banner gradient or pattern
  published: boolean;
}
