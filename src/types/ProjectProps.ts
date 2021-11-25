export type ProjectProps = {
    name: string,
    capaSmall: string,
    capaLarge: string,
    description: string,
    skills: string,
    isActive: boolean,
    id: string
}

export type ProjectParams = {
    project: ProjectProps,
}
