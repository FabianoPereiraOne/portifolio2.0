export type ProjectProps = {
  name: string
  capaSmall: string
  capaLarge: string
  description: string
  skills: string[]
  created: string
  duration: number
  gallery: string[]
  id: string
  url: string
}

export type ProjectParams = {
  project: ProjectProps
}
