import { ProjectProps } from "./ProjectProps"

export type PortfolioContextTypes = {
    projects: ProjectProps[]
    projectWidth: number;
    skills: SkillsTypes[];
    projectActive: ProjectProps;
    signed: boolean;
    loading: boolean;
    toggleMenu: boolean;
    load: boolean;
    handleActiveProjectFromCarousel: ( project:ProjectProps )=> void;
    handleGetActive:()=> void;
    handleSigin: (email:string, password:string)=> Promise<void>;
    setLoading: (state:boolean)=> void;
    setToggleMenu: (state:boolean)=> void;
    handleSignOut: ()=> Promise<void>;
    handleAddProject: (preProject:preProjectProps)=> Promise<void>;
    handleGetProjects: ()=> Promise<void>;
    setSkills: (state:SkillsTypes[])=> void;
    setLoad: (state:boolean)=> void;
    handleAddSkill: (name:string, progress:number)=> Promise<void>;
    handleGetSkills: ()=> Promise<void>;
    handleDeleteDoc: (collect:string,id:string)=> Promise<void>;
    setProjectWidth: (state:number)=> void;
    handleDeleteImage: (collect:string, id:string,name: string)=> void;
    handleDeleteProject: (project:ProjectProps)=> void;
    handleToggleChecked: (skillClick: SkillsTypes)=> void
}

export type portfolioProviderTypes = {
    children: React.ReactNode
}

export type SkillsTypes = {
    name: string,
    progress: number,
    checked: boolean,
    created: Date
    id: string
}

export type preProjectProps = {
    name: string,
    description: string,
    file: React.ChangeEvent<HTMLInputElement>,
    skills: null | string[]
}