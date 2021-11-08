export type ProjectProps = {
    name: string,
    imageSmall: string,
    imageLarge: string,
    description: string,
    skills: string,
    isActive: boolean,
    id: string
}

export type ProjectParams = {
    project: ProjectProps,
}
