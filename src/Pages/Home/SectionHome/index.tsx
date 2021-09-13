import { useState } from 'react'
import Styled from './sectionHome.module.css'
import { Link } from 'react-router-dom'
import { FiCodepen, FiMenu } from 'react-icons/fi'
import { ProgressBar } from '../../../Components/Global'
import competence from '../../../assets/competence.png'
import responsivo from '../../../assets/responsivo.png'
import webSite from '../../../assets/webSite.png'


function SectionHome() {

    const [progress, setProgress] = useState(0)

    return (
        <section className={Styled.section_home}>
            <header className={Styled.header}>
                <Link to="/" className={ Styled.container_logo}>
                    <FiCodepen />
                    <p>Fabiano Pereira</p>
                </Link>
                <nav className={ Styled.nav }>
                    <button onClick={()=> setProgress(0)}>Inicio</button>
                    <button onClick={()=> setProgress(19)}>Sobre</button>
                    <button onClick={()=> setProgress(49)}>Habilidades</button>
                    <button onClick={()=> setProgress(82.6)}>Projetos</button>
                    <span className={ Styled.progress_bar}>
                        <ProgressBar progressValue={ progress }/>
                    </span>
                </nav>

                <button className={ Styled.menu_mobile}>
                    <FiMenu/>
                </button>
            </header>
            {/* <section className={Styled.section_banner_default}>
                <h1>Desenvolvedor FrontEnd</h1>
                <div className={Styled.btn_group}>
                    <button>
                        Sobre
                    </button>
                    <button>
                        Download Cv
                    </button>
                </div>
            </section>
            <section className={Styled.section_technology_cards}>
                <article className={Styled.technology_cards}>
                    <img src={responsivo} alt="Layout resposivo" />
                    <h3>Responsivo</h3>
                    <p><mark>Layout 100% Responsivo</mark> que se adapta  a diversos tamanhos de telas.</p>
                </article>
                <article className={Styled.technology_cards}>
                    <img src={competence} alt="Tecnologias modernas" />
                    <h3>Tecnologias</h3>
                    <p>Uso das tecnologias de desenvolvimento <mark>FrontEnd Moderno</mark> mais usadas  na atualidade.</p>
                </article>
                <article className={Styled.technology_cards}>
                    <img src={webSite} alt="Website moderno" />
                    <h3>Moderno</h3>
                    <p>Construção de WebSites apartir de <mark>design</mark> e <mark>templates modernos</mark>.</p>
                </article>
            </section> */}
        </section>
    )
}

export default SectionHome