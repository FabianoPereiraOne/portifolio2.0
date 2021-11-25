import * as FI from 'react-icons/fi'
import Project from '../../../Components/Project'
import styles from './projects.module.css'
import Title from '../../../Components/Title'
import 'glider-js/glider.min.css'
import Glider, { GliderMethods } from 'react-glider'
import { FeaturedProject } from '../../../Components/Global'
import { usePortfolioContext } from '../../../contexts'
import { useEffect, useRef } from 'react'
import { Empty } from '../../../Components/Empty'
import { Link } from 'react-router-dom'

function Projects() {
  const useContext = usePortfolioContext()
  const btn = useRef<HTMLButtonElement>(null)
  const gliderRef = useRef<GliderMethods>(null)

  useEffect(() => {
    useContext.handleGetActive()
    const timeInterval = setInterval(() => btn.current?.click(), 10000)

    return () => {
      clearInterval(timeInterval)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <section className={styles.content_projects} id="projetos">
      <Title title="Projetos" subTitle="Veja soluções já desenvolvidas." />
      {useContext.projects.length > 0 ? (
        <section className={styles.group_projects}>
          <FeaturedProject
            className={styles.bannerFeatured}
            image={useContext.projectActive.capaLarge}
          >
            <article className={styles.badFeatured}>
              <div className={styles.content_title}>
                <h3>{useContext.projectActive.name}</h3>
                <p>{useContext.projectActive.skills}</p>
              </div>
              <Link to="/#">Saiba mais</Link>
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
                arrows={{
                  prev: `#${styles.btnPrev}`,
                  next: `#${styles.btnNext}`
                }}
                slidesToShow={1}
                slidesToScroll={1}
                scrollLock={true}
                responsive={[
                  {
                    breakpoint: 1081,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                      duration: 2
                    }
                  },
                  {
                    breakpoint: 769,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      duration: 2
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      duration: 2
                    }
                  }
                ]}
              >
                <div className="glider-track">
                  {useContext.projects.length > 0
                    ? useContext.projects.map((project, index: number) => {
                        return <Project key={index} project={project} />
                      })
                    : ''}
                </div>
              </Glider>

              <button id={styles.btnPrev}>
                <FI.FiArrowLeftCircle />
              </button>
              <button id={styles.btnNext} ref={btn}>
                <FI.FiArrowRightCircle />
              </button>
            </div>
          </div>
        </section>
      ) : (
        <Empty message="Nenhum projeto disponivel." />
      )}
    </section>
  )
}

export default Projects
