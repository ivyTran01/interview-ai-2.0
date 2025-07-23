export interface Resume {
    id: string;
    experience: WorkExperience[];
    projects?: ProjectEntry[];
    skills: SkillCategory[];
}

export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    description: string[];
}

export interface ProjectEntry {
    id: string;
    name: string;
    description: string;
    technologies: string[];
}

export interface SkillCategory {
    id: string;
    category: string;
    skills: string[];
}
