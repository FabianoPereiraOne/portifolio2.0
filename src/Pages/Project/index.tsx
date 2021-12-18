import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../../Components/Loading'
import { usePortfolioContext } from '../../contexts'
import styles from './project.module.css'
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { app } from '../../services/firebase'

export const Project = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const { handleGetProject, project } = usePortfolioContext()

  useEffect(() => {
    app()
    handleGetProject(id).finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <section className={styles.container}>
      <h2>{project.name}</h2>
      <div
        aria-label="container carousel"
        className={styles.container_carousel}
      >
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={project.gallery.length}
          dragEnabled={false}
        >
          <Slider>
            {project.gallery &&
              project.gallery.map((image: string, index: number) => {
                return (
                  <Slide index={index} className={styles.slide}>
                    <img src={image} alt={`Imagem ${index}`} />
                  </Slide>
                )
              })}
          </Slider>
          <ButtonBack>
            <FiArrowLeftCircle />
          </ButtonBack>
          <ButtonNext>
            <FiArrowRightCircle />
          </ButtonNext>
        </CarouselProvider>
      </div>
      <article className={styles.about}>
        <h4>Sobre</h4>
        <p>{project.description}</p>
      </article>
      <article className={styles.container_skills}>
        <h4>Tecnologias</h4>
        <div className={styles.content}>
          {project.id &&
            project.skills.map((skill: string, index: number) => {
              return <p key={index.toString()}>{skill}</p>
            })}
        </div>
      </article>
      <footer className={styles.footer}>
        <p>Duração:{project.duration}</p>
        <p>Publicação:{project.created}</p>
      </footer>
    </section>
  )
}
