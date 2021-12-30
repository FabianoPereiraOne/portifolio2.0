import * as Scroll from 'react-scroll'
import Styled from './home.module.css'
import logo from '../../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { ProgressBar, ButtonPrimary } from '../../../Components/Global'
import { useState } from 'react'

function Inicio() {
  const [progress, setProgress] = useState(0)
  const [toggleMenu, setToggleMenu] = useState(false)

  function handleScroll(progress: number) {
    setProgress(progress)
  }

  return (
    <section className={Styled.section_home} id="inicio">
      {toggleMenu && (
        <ul className={Styled.menu_mobile}>
          <li>
            <Scroll.Link
              onClick={() => setToggleMenu(false)}
              to="inicio"
              smooth={true}
            >
              Inicio
            </Scroll.Link>
          </li>
          <li>
            <Scroll.Link
              onClick={() => setToggleMenu(false)}
              to="sobre"
              smooth={true}
            >
              Sobre
            </Scroll.Link>
          </li>
          <li>
            <Scroll.Link
              onClick={() => setToggleMenu(false)}
              to="habilidades"
              smooth={true}
            >
              Habilidades
            </Scroll.Link>
          </li>
          <li>
            <Scroll.Link
              onClick={() => setToggleMenu(false)}
              to="projetos"
              smooth={true}
            >
              Projetos
            </Scroll.Link>
          </li>
        </ul>
      )}

      <header className={Styled.header}>
        <Link to="/" className={Styled.container_logo}>
          <img src={logo} alt="logo" />
          <p>Fabiano Pereira</p>
        </Link>
        <nav className={Styled.nav}>
          <Scroll.Link
            onMouseEnter={() => handleScroll(0)}
            to="inicio"
            smooth={true}
          >
            Inicio
          </Scroll.Link>
          <Scroll.Link
            onMouseEnter={() => handleScroll(19)}
            to="sobre"
            smooth={true}
          >
            Sobre
          </Scroll.Link>
          <Scroll.Link
            onMouseEnter={() => handleScroll(49)}
            to="habilidades"
            smooth={true}
          >
            Habilidades
          </Scroll.Link>
          <Scroll.Link
            onMouseEnter={() => handleScroll(82.6)}
            to="projetos"
            smooth={true}
          >
            Projetos
          </Scroll.Link>
          <span className={Styled.progress_bar}>
            <ProgressBar progressValue={progress} />
          </span>
        </nav>

        <button
          className={Styled.btn_menu_mobile}
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <FiMenu />
        </button>
      </header>
      <section className={Styled.section_banner_default}>
        <h1>Fabiano Pereira</h1>
        <div className={Styled.content_text_code}>
          <span className={Styled.key_green}>{'{'}</span>
          <p>Desenvolvedor Front-End</p>
          <span className={Styled.key_green}>{'}'}</span>
        </div>
        <div className={Styled.btn_group}>
          <Scroll.Link to="sobre" smooth>
            Sobre
          </Scroll.Link>
          <ButtonPrimary>Download Cv</ButtonPrimary>
        </div>
      </section>
    </section>
  )
}

export default Inicio
