import { createContext, useContext, useState } from 'react'
import { ProjectProps } from '../types/ProjectProps'
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  limit,
  getDocs,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  getDoc
} from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject
} from 'firebase/storage'
import * as Types from '../types/contextTypes'
import { toast } from 'react-toastify'
import convert from 'image-file-resize'

export const PortfolioContext = createContext({} as Types.PortfolioContextTypes)

export const PortfolioProvider = ({
  children
}: Types.portfolioProviderTypes) => {
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [project, setProject] = useState<ProjectProps>({} as ProjectProps)
  const [skills, setSkills] = useState<Types.SkillsTypes[]>([])
  const [lastProject, setLastProject] = useState<
    QueryDocumentSnapshot<DocumentData>
  >({} as QueryDocumentSnapshot<DocumentData>)
  const [projectWidth, setProjectWidth] = useState<number>(0)
  const [signed, setSigned] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [load, setLoad] = useState<boolean>(true)

  const handleSigin = async (email: string, password: string) => {
    await signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        setLoading(false)
        setSigned(true)
        toast.success('Logado com sucesso!')
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        toast.error('Acesso negado!')
      })
  }

  const handleSignOut = async () => {
    await signOut(getAuth())
      .then(() => {
        toast.success('Deslogado com sucesso!')
        setSigned(false)
      })
      .catch(error => {
        console.log(error)
        toast.error('Erro ao deslogar!')
      })
  }

  const handleAddProject = async (preProject: Types.preProjectProps) => {
    const docRef = doc(collection(getFirestore(), 'projects'))

    const capaSmall = await handleConvertCapaToSmallAndUpload(
      preProject.file,
      docRef.id
    )
    const capaLarge = await handleUploadImage(
      preProject.file.target.files![0],
      'capaLarge',
      docRef.id,
      'projects'
    )

    await setDoc(docRef, {
      name: preProject.name,
      description: preProject.description,
      id: docRef.id,
      capaSmall,
      capaLarge,
      skills: preProject.skills,
      created: new Date()
    })
      .then(() => {
        toast.success('Adicionado com sucesso!')
      })
      .catch(error => {
        console.log(error)
        toast.error('Erro ao adicionar!')
      })
  }

  const handleConvertCapaToSmallAndUpload = async (
    file: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
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

  const handleUploadImage = async (
    file: File,
    name: string,
    id: string,
    collection: string
  ) => {
    const imageRef = ref(getStorage(), `${collection}/${id}/${name}`)
    const url = await uploadBytes(imageRef, file)
      .then(() => {
        return getDownloadURL(imageRef)
      })
      .catch(error => {
        console.log(error)
        return null
      })

    return url
  }

  const handleGetProjects = async () => {
    const projectsRef = query(
      collection(getFirestore(), 'projects'),
      orderBy('created', 'desc'),
      limit(6)
    )

    getDocs(projectsRef)
      .then(snapshot => updateState(snapshot))
      .catch(error => console.log(error))
  }

  const updateState = (snapshot: QuerySnapshot<DocumentData>) => {
    const isEmpty = snapshot.size !== 0
    if (isEmpty) {
      const listProjects = snapshot.docs.map(project => {
        const modelProject = {
          id: project.data().id,
          skills: project.data().skills,
          description: project.data().description,
          capaSmall: project.data().capaSmall,
          capaLarge: project.data().capaLarge,
          name: project.data().name,
          created: project.data().created
        }

        return modelProject
      })

      setProjects(internalValue => [...internalValue, ...listProjects])
      setLastProject(snapshot.docs[snapshot.docs.length - 1])
    } else {
      setIsEmpty(true)
    }
  }

  const handleLoadMore = async () => {
    const projectsRef = query(
      collection(getFirestore(), 'projects'),
      orderBy('created', 'desc'),
      startAfter(lastProject),
      limit(6)
    )

    getDocs(projectsRef)
      .then(snapshot => updateState(snapshot))
      .catch(error => console.log(error))
  }

  const handleAddSkill = async (name: string, progress: number) => {
    const skillRef = doc(collection(getFirestore(), 'skills'))

    await setDoc(skillRef, {
      name: name,
      progress: progress,
      checked: false,
      created: new Date(),
      id: skillRef.id
    })
      .then(() => {
        toast.success('Adicionado com sucesso!')
      })
      .catch(error => {
        console.log(error)
        toast.error('Erro ao adicionar skill!')
      })
  }

  const handleGetSkills = async () => {
    const skillsRef = query(
      collection(getFirestore(), 'skills'),
      orderBy('created', 'desc')
    )
    try {
      await onSnapshot(skillsRef, snapshot => {
        const skills: Types.SkillsTypes[] = snapshot.docs.map(skill => {
          return {
            name: skill.data().name,
            progress: skill.data().progress,
            checked: skill.data().checked,
            created: skill.data().created,
            id: skill.data().id
          }
        })

        setSkills(skills)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteDoc = async (collect: string, id: string) => {
    const docRef = doc(collection(getFirestore(), collect), id)
    await deleteDoc(docRef)
      .then(() => toast.success('Deletado com sucesso!'))
      .catch(error => {
        console.log(error)
        toast.error('Erro ao deletar!')
      })
  }

  const handleDeleteImage = async (
    collect: string,
    id: string,
    name: string
  ) => {
    const imageRef = ref(getStorage(), `${collect}/${id}/${name}`)
    await deleteObject(imageRef).catch(error => {
      console.log(error)
    })
  }

  const handleDeleteProject = async (project: ProjectProps) => {
    await handleDeleteImage('projects', project.id, 'capaLarge')
    await handleDeleteImage('projects', project.id, 'capaSmall')
    await handleDeleteDoc('projects', project.id)
  }

  const handleToggleChecked = (skillClick: Types.SkillsTypes) => {
    const newListSkills = skills.map((skill: Types.SkillsTypes) => {
      if (skill.id === skillClick.id) {
        return {
          name: skill.name,
          progress: skill.progress,
          checked: !skill.checked,
          created: skill.created,
          id: skill.id
        }
      } else {
        return skill
      }
    })

    setSkills(newListSkills)
  }

  const handleGetProject = async (id: string) => {
    const docRef = doc(getFirestore(), 'projects', id)
    await getDoc(docRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setProject({
            name: snapshot.data().name,
            capaSmall: snapshot.data().capaSmall,
            capaLarge: snapshot.data().capaLarge,
            description: snapshot.data().description,
            skills: snapshot.data().skills,
            created: snapshot.data().created,
            id: snapshot.data().id
          })
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        projectWidth,
        skills,
        signed,
        loading,
        toggleMenu,
        load,
        isEmpty,
        project,
        handleSigin,
        setLoading,
        setToggleMenu,
        handleSignOut,
        handleAddProject,
        handleGetProjects,
        setSkills,
        setLoad,
        handleAddSkill,
        handleGetSkills,
        handleDeleteDoc,
        setProjectWidth,
        handleDeleteImage,
        handleDeleteProject,
        handleToggleChecked,
        handleLoadMore,
        handleGetProject,
        setProjects
      }}
    >
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
