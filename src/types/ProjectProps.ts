export type ProjectProps = {
    name: string,
    image: string,
    link: string,
    description: string,
    isActive: boolean,
    id: string
}

export type ProjectParams = {
    project: ProjectProps,
}
