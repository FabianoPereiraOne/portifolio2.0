import { Title,Project } from '../../../Components/Global'
import Styled from './projects.module.css'
import happy from '../../../Assets/podcastr.png'

function Projects() {
    return (
        <section className={Styled.content_projects}>
            <Title valuePositionRight={-40}>Projetos</Title>
            {/* <Project to="/" url={ happy }/> */}
        </section>
    )
}

export default Projects