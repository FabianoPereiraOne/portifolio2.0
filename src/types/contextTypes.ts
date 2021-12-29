import { GalleryImages } from './global'
import { ProjectProps } from './ProjectProps'

export type PortfolioContextTypes = {
  projects: ProjectProps[]
  projectWidth: number
  skills: SkillsTypes[]
  signed: boolean
  loading: boolean
  toggleMenu: boolean
  load: boolean
  isEmpty: boolean
  project: ProjectProps
  handleSigin: (email: string, password: string) => Promise<void>
  setLoading: (state: boolean) => void
  setToggleMenu: (state: boolean) => void
  handleSignOut: () => Promise<void>
  handleAddProject: (preProject: preProjectProps) => Promise<void>
  handleGetProjects: () => Promise<void>
  setSkills: (state: SkillsTypes[]) => void
  setLoad: (state: boolean) => void
  handleAddSkill: (name: string) => Promise<void>
  handleGetSkills: () => Promise<void>
  handleDeleteDoc: (collect: string, id: string) => Promise<void>
  setProjectWidth: (state: number) => void
  handleDeleteImage: (collect: string, id: string, name: string) => void
  handleDeleteProject: (project: ProjectProps) => Promise<void>
  handleToggleChecked: (skillClick: SkillsTypes) => void
  handleLoadMore: () => Promise<void>
  handleGetProject: (id: string) => Promise<void>
  setProjects: (state: ProjectProps[]) => void
  handleGetOnProjects: () => Promise<void>
  handleListDocStorage: (id: string) => Promise<string[] | null>
}

export type portfolioProviderTypes = {
  children: React.ReactNode
}

export type SkillsTypes = {
  name: string
  checked: boolean
  created: Date
  id: string
}

export type preProjectProps = {
  name: string
  description: string
  file: React.ChangeEvent<HTMLInputElement>
  skills: null | string[]
  duration: string
  galleryImages: GalleryImages[]
  url: string
}
