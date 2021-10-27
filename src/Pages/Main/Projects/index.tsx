import Project from '../../../Components/Project'
import { FeaturedProject } from '../../../Components/Global'
import styles from './projects.module.css'
import Title from '../../../Components/Title'
import { useRef, useEffect } from 'react'
import { ProjectProps } from '../../../types/ProjectProps'
import { usePortfolioContext } from '../../../contexts'

function Projects() {
    const carouselRef = useRef<HTMLDivElement>(null)
    const useContext = usePortfolioContext()

    let controllDirection = 'right'
    let timeCarousel = 5
    let speedCarousel = 5

    const handleScrollRight = (divRef: HTMLDivElement) => {
        let c = 0
        const intervalo = setInterval(() => {
            c += 1
            if (c < 397) {
                divRef.scrollLeft += 1
            } else {
                clearInterval(intervalo)
            }
        }, speedCarousel)
    }

    const handleScrollLeft = (divRef: HTMLDivElement) => {
        let c = 0
        const intervalo = setInterval(() => {
            c += 2
            if (c < 397) {
                divRef.scrollLeft -= 1
            } else {
                clearInterval(intervalo)
            }
        }, speedCarousel + 4)
    }

    const controllScroll = () => {
        const divRef = carouselRef.current

        if (divRef !== null) {
            if (divRef.scrollLeft >= divRef.clientWidth + 332) {
                controllDirection = 'left'
            } else if (divRef.scrollLeft === 0) {
                controllDirection = 'right'
            }

            if (controllDirection === 'right') {
                handleScrollRight(divRef)
            } else {
                handleScrollLeft(divRef)
            }
        }
    }

    const handleGetActive = (Array: ProjectProps[]) => {

        let activeElement = {
            name: '',
            image: '',
            link: '',
            description: '',
            isActive: false
        }

        Array.forEach((project) => {
            if (project.isActive) {
                activeElement = project
            }
        })

        return activeElement
    }

    useEffect(() => {
        setInterval(controllScroll, timeCarousel * 1000)
    }, [])

    const projectActive = handleGetActive(useContext.projects)

    return (
        <section className={styles.content_projects}>
            <Title title="Projetos" subTitle="Veja soluções já desenvolvidas" />
            <section className={styles.group_projects}>
                <FeaturedProject image={projectActive.image} >
                    <article className={styles.badFeatured}>
                        <div className={styles.content_title}>
                            <h3>{projectActive.name}</h3>
                            <p>{projectActive.description}</p>
                        </div>
                        <a rel="noreferrer" target="_blank" href={projectActive.link}>Saiba mais</a>
                    </article>
                </FeaturedProject>
                <div ref={carouselRef} className={styles.slider_group}>
                    {useContext.projects.length > 0 ? useContext.projects.map((project, index: number) => {
                        return project.isActive !== true && <Project key={index} project={project} />
                    }) : ''}
                </div>
            </section>
        </section>
    )
}

export default Projects