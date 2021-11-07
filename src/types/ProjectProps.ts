export type ProjectProps = {
    name: string,
    imageSmall: string,
    imageLarge: string,
    link: string,
    description: string,
    isActive: boolean,
    id: string
}

export type ProjectParams = {
    project: ProjectProps,
}
