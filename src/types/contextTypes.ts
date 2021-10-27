import { ProjectProps } from "./ProjectProps"

export type PortfolioContextTypes = {
    projects: ProjectProps[];
    projectWidth: number;
    handleActiveProjectFromCarousel: ( project:ProjectProps )=> void;
    handleWidthProject: (screenWidth:number)=> void
}

export type portfolioProviderTypes = {
    children: React.ReactNode
}