import { ProjectProps } from "./ProjectProps"

export type PortfolioContextTypes = {
    projects: ProjectProps[];
    projectWidth: number;
    handleActiveProjectFromCarousel: ( project:ProjectProps )=> void;
    handleGetActive:(Array: ProjectProps[])=> ProjectProps
}

export type portfolioProviderTypes = {
    children: React.ReactNode
}