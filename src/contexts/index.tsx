import { createContext, useContext, useState } from 'react'
import * as Types from '../types/contextTypes'
import { ProjectProps } from '../types/ProjectProps'
import { datasTest } from '../data'


export const PortfolioContext = createContext({} as Types.PortfolioContextTypes)

export const PortfolioProvider = ({ children }: Types.portfolioProviderTypes) => {
    const [projects, setProjects] = useState<ProjectProps[]>(datasTest)
    const [projectWidth, setProjectWidth] = useState<number>(0)

    const handleActiveProjectFromCarousel = (project: ProjectProps) => {
        const resultRemoveProjectActive = handleRemoveProjectActive()
        const resultAddProjectActive = handleAddProjectActive(resultRemoveProjectActive, project)
        setProjects(resultAddProjectActive)
    }

    const handleRemoveProjectActive = () => {
        const newListProjects = projects.map((project) => {
            if (project.isActive) {
                return {
                    name: project.name,
                    image: project.image,
                    link: project.link,
                    description: project.description,
                    isActive: false,
                    id: project.id
                }
            } else {
                return project
            }
        })

        return newListProjects
    }

    const handleAddProjectActive = (list: ProjectProps[], newProject: ProjectProps) => {
        const newListProjects = list.map((project) => {
            if (project.id.includes(newProject.id)) {
                return {
                    name: project.name,
                    image: project.image,
                    link: project.link,
                    description: project.description,
                    isActive: true,
                    id: project.id
                }
            } else {
                return project
            }
        })

        return newListProjects
    }

    const handleWidthProject = (screenWidth:number) => {
        if(screenWidth >= 1200 && screenWidth < 1254){
            setProjectWidth(32.5)
        }else if(screenWidth >= 769 && screenWidth <= 1080){
            setProjectWidth(50)
        }else if(screenWidth>= 600 && screenWidth < 768){
            setProjectWidth(50)
        }else if(screenWidth < 600){
            setProjectWidth(100)
        }
    }



    return (
        <PortfolioContext.Provider value={{
            projects,
            projectWidth,
            handleActiveProjectFromCarousel,
            handleWidthProject
        }}>
            {children}
        </PortfolioContext.Provider>
    )
}

export const usePortfolioContext = () => {
    const context = useContext(PortfolioContext)

    if (context === undefined) {
        throw new Error('Contexto inacessível.')
    } else {
        return context
    }
}