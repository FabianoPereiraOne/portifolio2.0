export type ProjectProps = {
  name: string
  capaSmall: string
  capaLarge: string
  description: string
  skills: string[]
  created: Date
  duration: number
  gallery: string[]
  id: string
}

export type ProjectParams = {
  project: ProjectProps
}
