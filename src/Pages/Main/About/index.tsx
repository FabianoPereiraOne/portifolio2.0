import { ButtonPrimary } from '../../../Components/Global'
import Styled from './about.module.css'
import Title from '../../../Components/Title'

function About() {
    return (
        <main className={Styled.content_about} id="sobre">
            <Title title="Sobre mim" subTitle="Um breve resumo." />
            <article className={Styled.about}>
                <p>Sou Fabiano Pereira, trabalho como Developer Front End, meu diferencial é que sou esforçado e atento ao que me foi proposto, tenho experiencia na criação de Landing Pages, Dashboards, Websites e Sistemas intermediários, bastante solicitados por afiliados de hotmart, eduzz e monetizze. Meu principal foco é em melhorar a entrega dos Websites e Sistemas deixando-os mais modernos, seguros e responsivos.
                </p>

                <p>
                    <cite>"A arte de programar consiste na arte de organizar e dominar a complexidade."</cite><small>Dijkstra</small>
                </p>
                <ButtonPrimary>
                    Download Cv
                </ButtonPrimary>
            </article>
        </main>
    )
}

export default About