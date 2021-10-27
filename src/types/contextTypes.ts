import { ProjectProps } from "./ProjectProps"

export type PortfolioContextTypes = {
    projects: ProjectProps[];
    handleActiveProjectFromCarousel: ( project:ProjectProps )=> void
}

export type portfolioProviderTypes = {
    children: React.ReactNode
}