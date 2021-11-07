import { createContext, useContext, useState } from 'react'
import { ProjectProps } from '../types/ProjectProps'
import * as Types from '../types/contextTypes'
import * as Datas from '../data'


export const PortfolioContext = createContext({} as Types.PortfolioContextTypes)

export const PortfolioProvider = ({ children }: Types.portfolioProviderTypes) => {
    const [projects, setProjects] = useState<ProjectProps[]>([{
        id: '1',
        description: 'Javascript',
        imageSmall: Datas.GoogleGlass.imageSmall,
        imageLarge: Datas.GoogleGlass.imageLarge,
        name: 'Google Glass',
        isActive: false,
        link: 'https://google-glass-fabianopereiraone.vercel.app/'
    }, {
        id: '2',
        description: 'Javascript e Next JS',
        imageSmall: Datas.PodCastr.imageSmall,
        imageLarge: Datas.PodCastr.imageLarge,
        name: 'Podcastr',
        isActive: true,
        link: 'https://podcastr-fabianopereiraone.vercel.app/'
    }, {
        id: '3',
        description: 'Javascript e Bootstrap',
        imageSmall: Datas.OnePage.imageSmall,
        imageLarge: Datas.OnePage.imageLarge,
        name: 'OnePage',
        isActive: false,
        link: 'https://one-page-fabianopereiraone.vercel.app/'
    }, {
        id: '4',
        description: 'Javascript e React JS',
        imageSmall: Datas.LandingPage.imageSmall,
        imageLarge: Datas.LandingPage.imageLarge,
        name: 'Landing Page',
        isActive: false,
        link: 'https://www.psicologojosemaria.com.br/'
    }, {
        id: '5',
        description: 'Javascript e React JS',
        imageSmall: Datas.Dashboard.imageSmall,
        imageLarge: Datas.Dashboard.imageLarge,
        name: 'Dashboard',
        isActive: false,
        link: 'https://dashboard-fabianopereiraone.vercel.app/'
    }, {
        id: '6',
        description: 'Javascript e React JS',
        imageSmall: Datas.BlogXis.imageSmall,
        imageLarge: Datas.BlogXis.imageLarge,
        name: 'Blog Xis',
        isActive: false,
        link: 'https://anapolispsicologia.com/projetoxis/'
    }, {
        id: '7',
        description: 'Javascript',
        imageSmall: Datas.HotelParaiso.imageSmall,
        imageLarge: Datas.HotelParaiso.imageLarge,
        name: 'Hotel Paraiso',
        isActive: false,
        link: 'https://hotel-paraiso-fabianopereiraone.vercel.app/'
    }])
    // eslint-disable-next-line
    const [skills, setSkills] = useState<Types.SkillsTypes[]>([{
        name: 'Html 5',
        value: 80
    }, {
        name: 'Css 3',
        value: 60
    }, {
        name: 'Javascript',
        value: 60
    }, {
        name: 'React JS',
        value: 70
    }, {
        name: 'Bootstrap 4',
        value: 80
    }, {
        name: 'Typescript',
        value: 50
    }, {
        name: 'Next JS',
        value: 30
    }, {
        name: 'Git',
        value: 50
    }])
    // eslint-disable-next-line
    const [projectWidth, setProjectWidth] = useState<number>(0)
    const [projectActive, setProjectActive ] =useState<ProjectProps>({} as ProjectProps)

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
                    imageSmall: project.imageSmall,
                    imageLarge: project.imageLarge,
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
                setProjectActive(project)
                return {
                    name: project.name,
                    imageSmall: project.imageSmall,
                    imageLarge: project.imageLarge,
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

    const handleGetActive = () => {
        projects.forEach((project) => {
            if (project.isActive) {
                setProjectActive(project)
            }
        })

    }

    return (
        <PortfolioContext.Provider value={{
            projects,
            projectWidth,
            skills,
            projectActive,
            handleActiveProjectFromCarousel,
            handleGetActive
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