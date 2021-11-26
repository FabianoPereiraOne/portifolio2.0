export type ProjectProps = {
    name: string,
    capaSmall: string,
    capaLarge: string,
    description: string,
    skills: Array<string>,
    isActive: boolean,
    created: Date,
    id: string
}

export type ProjectParams = {
    project: ProjectProps,
}
