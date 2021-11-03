import * as FI from 'react-icons/fi'
import Project from '../../../Components/Project'
import styles from './projects.module.css'
import Title from '../../../Components/Title'
import 'glider-js/glider.min.css';
import Glider, { GliderMethods } from 'react-glider'
import { FeaturedProject } from '../../../Components/Global'
import { usePortfolioContext } from '../../../contexts'
import { useEffect, useRef } from 'react'


function Projects() {
  const useContext = usePortfolioContext()
  const btn = useRef<HTMLButtonElement>(null)
  const gliderRef = useRef<GliderMethods>(null)
  const projectActive = useContext.handleGetActive(useContext.projects)

  useEffect(() => {
    const timeInterval = setInterval(() => btn.current?.click(), 10000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [])


  return (
    <section className={styles.content_projects} id="projetos">
      <Title title="Projetos" subTitle="Veja soluções já desenvolvidas." />
      <section className={styles.group_projects}>
        <FeaturedProject className={styles.bannerFeatured} image={projectActive.image}>
          <article className={styles.badFeatured}>
            <div className={styles.content_title}>
              <h3>{projectActive.name}</h3>
              <p>{projectActive.description}</p>
            </div>
            <a rel="noreferrer" target="_blank" href={projectActive.link}>Saiba mais</a>
          </article>
        </FeaturedProject>

        <div className={styles.container_carousel}>
          <div className={styles.carousel_center}>
            <Glider
              hasDots
              hasArrows
              draggable
              rewind
              skipTrack
              ref={gliderRef}
              duration={2}
              arrows={
                {
                  prev: `#${styles.btnPrev}`,
                  next: `#${styles.btnNext}`
                }
              }
              slidesToShow={1}
              slidesToScroll={1}
              scrollLock={true}
              responsive={[
                {
                  breakpoint: 1081,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    duration: 2,
                  },
                },
                {
                  breakpoint: 769,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    duration: 2,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    duration: 2
                  },
                },
              ]}
            >
              <div className="glider-track">
                {useContext.projects.length > 0 ? useContext.projects.map((project, index: number) => {
                  return <Project key={index} project={project} />
                }) : ''}
              </div>
            </Glider>

            <button id={styles.btnPrev}><FI.FiArrowLeftCircle /></button>
            <button id={styles.btnNext} ref={btn}><FI.FiArrowRightCircle /></button>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Projects