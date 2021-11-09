import { ProjectProps } from "./ProjectProps"

export type PortfolioContextTypes = {
    projects: ProjectProps[];
    projectWidth: number;
    skills: SkillsTypes[];
    projectActive: ProjectProps;
    signed: boolean;
    handleActiveProjectFromCarousel: ( project:ProjectProps )=> void;
    handleGetActive:()=> void;
    handleSigin: (email:string, password:string)=> void;
}

export type portfolioProviderTypes = {
    children: React.ReactNode
}

export type SkillsTypes = {
    name: string,
    value: number
}