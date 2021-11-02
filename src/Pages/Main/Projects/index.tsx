import Project from '../../../Components/Project'
import styles from './projects.module.css'
import Title from '../../../Components/Title'
import { FeaturedProject } from '../../../Components/Global'
import { usePortfolioContext } from '../../../contexts'
import * as FI from 'react-icons/fi'
import Glider from 'react-glider'
import 'glider-js/glider.min.css';

function Projects() {
  const useContext = usePortfolioContext()
  const projectActive = useContext.handleGetActive(useContext.projects)

  return (
    <section className={styles.content_projects}>
      <Title title="Projetos" subTitle="Veja soluções já desenvolvidas" />
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
              draggable
              hasDots
              hasArrows
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
                    duration: 0.25,
                  },
                },
                {
                  breakpoint: 769,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    duration: 0.25,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    duration: 0.25,
                  },
                },
              ]}
            >
              {useContext.projects.length > 0 ? useContext.projects.map((project, index: number) => {
                return project.isActive !== true && <Project key={index} project={project} />
              }) : ''}
            </Glider>

            <button id={styles.btnPrev}><FI.FiArrowLeftCircle /></button>
            <button id={styles.btnNext}><FI.FiArrowRightCircle /></button>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Projects