export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  impact?: string;
  year: string;
  category: ProjectCategory;
  featured?: boolean;
}

export type ProjectCategory = 
  | 'Frontend'
  | 'Full-Stack' 
  | 'AI/ML'
  | 'FinTech'
  | 'Mobile'
  | 'DevOps';

export interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  onOpen: () => void;
  index: number;
}

export interface ProjectsProps {
  isDark: boolean;
} 