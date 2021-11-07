import { ProjectProps } from "./ProjectProps"

export type PortfolioContextTypes = {
    projects: ProjectProps[];
    projectWidth: number;
    skills: SkillsTypes[];
    projectActive: ProjectProps;
    handleActiveProjectFromCarousel: ( project:ProjectProps )=> void;
    handleGetActive:()=> void;
}

export type portfolioProviderTypes = {
    children: React.ReactNode
}

export type SkillsTypes = {
    name: string,
    value: number
}