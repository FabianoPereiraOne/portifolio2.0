import * as CG from './styles'
import * as Types from '../../types/ProjectProps'
import { usePortfolioContext } from '../../contexts'

function Project({ project, reference }:Types.ProjectParams){
    const useContext = usePortfolioContext()

    return(
        <CG.ProjectCard ref={reference} width={useContext.projectWidth} onClick={ ()=> useContext.handleActiveProjectFromCarousel(project) } image={ project.image }/>
    )
}
 
export default Project