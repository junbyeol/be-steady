export interface Project {
    id: string;
    title: string;
    imageUrl?: string;
    createdAt: Date;
}

export interface CreateProjectDto {
    title: string;
}