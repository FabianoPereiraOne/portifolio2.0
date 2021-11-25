import * as CG from './styles'
import * as Types from '../../types/ProjectProps'
import { usePortfolioContext } from '../../contexts'
import styles from './styles.module.css'

function Project({ project }: Types.ProjectParams) {
  const useContext = usePortfolioContext()

  return (
    <div
      className={styles.container_card_carousel}
      onClick={() => useContext.handleActiveProjectFromCarousel(project)}
    >
      <CG.ProjectCard
        width={useContext.projectWidth}
        image={project.capaSmall}
      />
    </div>
  )
}

export default Project
