import { useEffect, useState } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { Loading } from '../../Components/Loading'
import { usePortfolioContext } from '../../contexts'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './project.module.css'
import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiFileText,
  FiGlobe,
  FiCornerDownLeft
} from 'react-icons/fi'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { app } from '../../services/firebase'

export const Project = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const { handleGetProject, project } = usePortfolioContext()

  useEffect(() => {
    app()
    if (id) {
      handleGetProject(id).finally(() => setLoading(false))
    }
    // eslint-disable-next-line
  }, [])

  const handleConvertionDate = (date: string) => {
    const resultDate = format(parseISO(date), 'dd MMM yyyy', { locale: ptBR })
    return resultDate
  }

  if (loading) {
    return <Loading />
  }

  if (project && Object.values(project).length > 0) {
    return (
      <section className={styles.container}>
        <Link
          to="/"
          aria-label="Link para voltar a inicio do site"
          className={styles.redirect_home}
        >
          <FiCornerDownLeft />
        </Link>
        <h2>{project.name}</h2>
        <div
          aria-label="container carousel"
          className={styles.container_carousel}
        >
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={project.gallery ? project.gallery.length : 0}
            dragEnabled={false}
            touchEnabled={true}
            orientation={'horizontal'}
            className={styles.carousel_provider}
            isIntrinsicHeight={true}
          >
            <Slider>
              {project.gallery &&
                project.gallery.map((image: string, index: number) => {
                  return (
                    <Slide
                      key={index.toString()}
                      index={index}
                      className={styles.slide}
                    >
                      <Image
                        hasMasterSpinner={false}
                        src={image}
                        alt={project.name}
                        className={styles.slide_image}
                      />
                    </Slide>
                  )
                })}
            </Slider>
            <ButtonBack className={styles.button_slider}>
              <FiArrowLeftCircle />
            </ButtonBack>
            <ButtonNext className={styles.button_slider}>
              <FiArrowRightCircle />
            </ButtonNext>
          </CarouselProvider>
        </div>
        <article className={styles.about}>
          <h4>
            <FiFileText />
            Sobre
          </h4>
          <p>{project.description}</p>
        </article>
        <article className={styles.container_skills}>
          <h4>
            <FiGlobe />
            Tecnologias
          </h4>
          <div className={styles.content}>
            {project.skills &&
              project.skills.length > 0 &&
              project.skills.map((skill: string, index: number) => {
                return <p key={index.toString()}>{skill}</p>
              })}
          </div>
        </article>
        <a
          rel="noreferrer"
          className={styles.link_project}
          href={project.url && project.url.length > 0 ? project.url : '/#'}
          target="_blank"
          aria-label={`Link para ir até o projeto ${project.name}`}
        >
          Ver projeto
        </a>
        <footer className={styles.footer}>
          <p>Duração: {project.duration}</p>
          <p>
            Publicação:{' '}
            {project.created && handleConvertionDate(project.created)}
          </p>
        </footer>
      </section>
    )
  } else {
    return <Redirect to="/" />
  }
}
