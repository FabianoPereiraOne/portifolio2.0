import { ButtonPrimary } from '../../../Components/Global'
import Styled from './about.module.css'
import Title from '../../../Components/Title'

function About() {
    return (
        <main className={Styled.content_about} id="sobre">
            <Title title="Sobre mim" subTitle="Um breve resumo" />
            <article className={Styled.about}>
                <p>Me chamo Fabiano Pereira, sou Desenvolvedor Web a quase dois anos, comecei com python mais migrei para Javascript e atualmente as tecnologias que utilizo são: Javascript, Bootstrap, React JS, Typescript, Next JS e Versionamento de código( Git ). Sou esforçado em cumprir minhas metas e  atualmente moro em Minas Gerais. Os trabalhos que costumo fazer são a criação de landing pages para jovens da DSB e afiliados da Hotmart, Eduzz e Monetizze. Também tenho desenvolvido projetos pessoais incríveis e busco a cada dia evoluir mais como <strong>#DEV</strong>.</p>
                <ButtonPrimary>
                    Download Cv
                </ButtonPrimary>
            </article>
        </main>
    )
}

export default About