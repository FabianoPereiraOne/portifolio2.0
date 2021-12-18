export type ProjectProps = {
  name: string
  capaSmall: string
  capaLarge: string
  description: string
  skills: Array<string>
  created: Date
  id: string
}

export type ProjectParams = {
  project: ProjectProps
}
