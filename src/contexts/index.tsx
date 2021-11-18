import { createContext, useContext, useState } from 'react'
import { ProjectProps } from '../types/ProjectProps'
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, setDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import * as Types from '../types/contextTypes'
import * as Datas from '../data'
import { toast } from 'react-toastify'
import convert from 'image-file-resize';


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
    const [skills, setSkills] = useState<Types.SkillsTypes[]>([{
        name: 'Html 5',
        value: 80,
        checked: false,
        id: 'dsad'
    }, {
        name: 'Css 3',
        value: 60,
        checked: false,
        id: 'dsaddsdd'
    }, {
        name: 'Javascript',
        value: 60,
        checked: false,
        id: 'dsgfgf1dsfad'
    }, {
        name: 'React JS',
        value: 70,
        checked: false,
        id: 'dseracdada'
    }, {
        name: 'Bootstrap 4',
        value: 80,
        checked: false,
        id: 'dsaddsadsamm'
    }, {
        name: 'Typescript',
        value: 50,
        checked: false,
        id: 'dsaddadsun'
    }, {
        name: 'Next JS',
        value: 30,
        checked: false,
        id: 'dsytvfvd'
    }, {
        name: 'Git',
        value: 50,
        checked: false,
        id: 'dsadokcdmd'
    }])
    // eslint-disable-next-line
    const [projectWidth, setProjectWidth] = useState<number>(0)
    // eslint-disable-next-line
    const [signed, setSigned] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [projectActive, setProjectActive] = useState<ProjectProps>({} as ProjectProps)
    const [toggleMenu, setToggleMenu] = useState(false)

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

    const handleSigin = (email: string, password: string) => {
        signInWithEmailAndPassword(getAuth(), email, password)
            .then(() => {
                setLoading(false)
                setSigned(true)
                toast.success("Logado com sucesso!")
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                toast.error("Acesso snegado!")
            })
    }

    const handleSignOut = () => {
        signOut(getAuth())
            .then(() => {
                toast.success("Deslogado com sucesso!")
                setSigned(false)
            })
            .catch((error) => {
                console.log(error)
                toast.error('Erro ao deslogar!')
            })
    }

    const handleAddProject = async (preProject: Types.preProjectProps) => {
        const docRef = doc(collection(getFirestore(), 'projects'))

        const capaSmall = await handleConvertCapaToSmallAndUpload(preProject.file, docRef.id)
        const capaLarge = await handleUploadImage(preProject.file.target.files![0], 'capaLarge', docRef.id, 'projects')

        await setDoc(docRef, {
            name: preProject.name,
            description: preProject.description,
            id: docRef.id,
            capaSmall,
            capaLarge,
            skills: preProject.skills,
            isActive: false,
            created: new Date()
        })
            .then(() => {
                toast.success("Adicionado com sucesso!")
            })
            .catch((error) => {
                console.log(error)
                toast.error("Erro ao adicionar!")
            })
    }

    const handleConvertCapaToSmallAndUpload = async (file: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (file.target.files !== null) {

            const image = await convert({
                file: file.target.files[0],
                width: 350,
                height: 172,
                type: 'jpeg'
            })
                .then((image: File) => {
                    return image
                })
                .catch((error: object) => {
                    console.log(error)
                })

            return handleUploadImage(image, 'capaSmall', id, 'projects')
        } else {
            return null
        }
    }

    const handleUploadImage = async (file: File, name: string, id: string, collection: string) => {
        const imageRef = ref(getStorage(), `${collection}/${id}/${name}`)
        const url = await uploadBytes(imageRef, file)
            .then(() => {
                return getDownloadURL(imageRef)
            })
            .catch((error) => {
                console.log(error)
                return null
            })

        return url
    }

    const handleGetProjects = async () => {
        //Ponto de parada

        const projectsRef = query(collection(getFirestore(), 'projects'), orderBy('date', 'desc'))
        onSnapshot(projectsRef, snapshot => {
            const projects = snapshot.docs.map((snapshot) => {
                return snapshot.data()
            })

            console.log(projects)
        })
    }

    return (
        <PortfolioContext.Provider value={{
            projects,
            projectWidth,
            skills,
            projectActive,
            signed,
            loading,
            toggleMenu,
            handleActiveProjectFromCarousel,
            handleGetActive,
            handleSigin,
            setLoading,
            setToggleMenu,
            handleSignOut,
            handleAddProject,
            handleGetProjects,
            setSkills
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