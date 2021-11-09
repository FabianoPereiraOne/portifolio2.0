import { createContext, useContext, useState } from 'react'
import { ProjectProps } from '../types/ProjectProps'
import {getAuth,signInWithEmailAndPassword } from 'firebase/auth'
import * as Types from '../types/contextTypes'
import * as Datas from '../data'


export const PortfolioContext = createContext({} as Types.PortfolioContextTypes)

export const PortfolioProvider = ({ children }: Types.portfolioProviderTypes) => {
    const [projects, setProjects] = useState<ProjectProps[]>([{
        id: '1',
        skills: 'Javascript',
        description: '',
        imageSmall: Datas.GoogleGlass.imageSmall,
        imageLarge: Datas.GoogleGlass.imageLarge,
        name: 'Google Glass',
        isActive: false,
    }, {
        id: '2',
        skills: 'Javascript e Next JS',
        description: '',
        imageSmall: Datas.PodCastr.imageSmall,
        imageLarge: Datas.PodCastr.imageLarge,
        name: 'Podcastr',
        isActive: true,
    }, {
        id: '3',
        skills: 'Javascript e Bootstrap',
        description: '',
        imageSmall: Datas.OnePage.imageSmall,
        imageLarge: Datas.OnePage.imageLarge,
        name: 'OnePage',
        isActive: false,
    }, {
        id: '4',
        skills: 'Javascript e React JS',
        description: '',
        imageSmall: Datas.LandingPage.imageSmall,
        imageLarge: Datas.LandingPage.imageLarge,
        name: 'Landing Page',
        isActive: false,
    }, {
        id: '5',
        skills: 'Javascript e Bootstrap',
        description: '',
        imageSmall: Datas.Dashboard.imageSmall,
        imageLarge: Datas.Dashboard.imageLarge,
        name: 'Dashboard',
        isActive: false,
    }, {
        id: '6',
        skills: '',
        description: 'Javascript e React JS',
        imageSmall: Datas.BlogXis.imageSmall,
        imageLarge: Datas.BlogXis.imageLarge,
        name: 'Blog Xis',
        isActive: false,
    }, {
        id: '7',
        skills: 'Javascript',
        description: '',
        imageSmall: Datas.HotelParaiso.imageSmall,
        imageLarge: Datas.HotelParaiso.imageLarge,
        name: 'Hotel Paraiso',
        isActive: false,
    }, {
        id: '8',
        skills: 'Node JS',
        description: '',
        imageSmall: Datas.Happy.imageSmall,
        imageLarge: Datas.Happy.imageLarge,
        name: 'Happy',
        isActive: false,
    }, {
        id: '9',
        skills: 'Javascript e React JS',
        description: '',
        imageSmall: Datas.Quark.imageSmall,
        imageLarge: Datas.Quark.imageLarge,
        name: 'Quark Atendimentos',
        isActive: false,
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
    const [signed, setSigned] = useState<boolean>(false)
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
                    description: project.description,
                    skills: project.skills,
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
                    description: project.description,
                    isActive: false,
                    skills: project.skills,
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

    const handleSigin =  (email:string, password:string) => {
        signInWithEmailAndPassword(getAuth(), email, password)
        .then(()=>{
            alert('up')
        })
        .catch((error)=>{
            console.log(error.code)
        })
    }

    return (
        <PortfolioContext.Provider value={{
            projects,
            projectWidth,
            skills,
            projectActive,
            signed,
            handleActiveProjectFromCarousel,
            handleGetActive,
            handleSigin
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