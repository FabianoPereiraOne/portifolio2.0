import * as CG from './styles'
import { ProjectProps } from '../../types/ProjectProps'

type Props = {
    value: ProjectProps,
    fullScreen?: boolean,
}

function Project({ value,fullScreen }:Props){
    return(
        <CG.ProjectCard image={ value.image } fullScreen={ fullScreen }>
            
        </CG.ProjectCard>
    )
}

export default Project