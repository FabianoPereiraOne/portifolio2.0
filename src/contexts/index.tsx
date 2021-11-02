import { createContext, useContext, useState } from 'react'
import * as Types from '../types/contextTypes'
import { ProjectProps } from '../types/ProjectProps'
const happy = "https://firebasestorage.googleapis.com/v0/b/portfolio-87cf8.appspot.com/o/Testes%2Fhappy.png?alt=media&token=c3be9831-eccf-477d-824c-95a53e3043c2"
const onePage = "https://firebasestorage.googleapis.com/v0/b/portfolio-87cf8.appspot.com/o/Testes%2FonePage.png?alt=media&token=52673bd9-1446-4674-a8bd-33dc9a6982ca"
const quark = "https://firebasestorage.googleapis.com/v0/b/portfolio-87cf8.appspot.com/o/Testes%2Fquark.png?alt=media&token=dd85fcdf-639c-4834-990c-0261c8f06d04"
const podcastr = "https://firebasestorage.googleapis.com/v0/b/portfolio-87cf8.appspot.com/o/Testes%2Fpodcastr.png?alt=media&token=c908c7f0-f4ab-4805-8c8d-c1a09f180fa8"
const google_glass = "https://firebasestorage.googleapis.com/v0/b/portfolio-87cf8.appspot.com/o/Testes%2Fgoogle-glass.png?alt=media&token=4df17149-3869-469a-94b6-66ec48115e91"


export const PortfolioContext = createContext({} as Types.PortfolioContextTypes)

export const PortfolioProvider = ({ children }: Types.portfolioProviderTypes) => {
    const [projects, setProjects] = useState<ProjectProps[]>([
        {
            name: 'Happy',
            image: happy,
            link: '',
            description: '',
            isActive: false,
            id: 'fsfdbsfdsbfbusb'
        },
        {
            name: 'OnePage',
            image: onePage,
            link: '',
            description: '',
            isActive: false,
            id: 'fsfdbfffdfsfdsbfbusb'
        },
        {
            name: 'Quark',
            image: quark,
            link: '',
            description: '',
            isActive: false,
            id: 'fsfdbsfjjjjdsbfbusb'
        },
        {
            name: 'Happy',
            image: happy,
            link: '',
            description: '',
            isActive: false,
            id: '4dsfdfds4d'
        },
        {
            name: 'OnePage',
            image: onePage,
            link: '',
            description: '',
            isActive: false,
            id: '54fdsfsfdsfd'
        },
        {
            name: 'Quark',
            image: quark,
            link: '',
            description: '',
            isActive: false,
            id: 'dsfdsfhyrewew'
        },
        {
            name: 'Podcastr',
            image: podcastr,
            link: 'https://www.youtube.com.br',
            description: 'Next JS, TypeScript, Javascript',
            isActive: true,
            id: 'fsfdbsfdsdsfds8bfbusb'
        },
        {
            name: 'Google Glass',
            image: google_glass,
            link: '',
            description: '',
            isActive: false,
            id: 'edsafgfdcacdsac'
        },
        {
            name: 'Google Glass',
            image: google_glass,
            link: '',
            description: '',
            isActive: false,
            id: '54848dsaadsad'
        },
        {
            name: 'Google Glass',
            image: podcastr,
            link: '',
            description: '',
            isActive: false,
            id: 'fsdfdsfsfd'
        }
    ])
    // eslint-disable-next-line
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

    const handleGetActive = (Array: ProjectProps[]) => {

        let activeElement = {
            name: '',
            image: '',
            link: '',
            description: '',
            isActive: false,
            id: ''
        }

        Array.forEach((project) => {
            if (project.isActive) {
                activeElement = project
            }
        })

        return activeElement
    }

    return (
        <PortfolioContext.Provider value={{
            projects,
            projectWidth,
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