import * as Scroll from 'react-scroll'
import Styled from './home.module.css'
import logo from '../../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { ProgressBar, ButtonPrimary } from '../../../Components/Global'
import { useState, useEffect, useRef, RefObject } from 'react'

function Inicio() {
  const [progress, setProgress] = useState(0)
  const [toggleMenu, setToggleMenu] = useState(false)
  // eslint-disable-next-line
  const [textCode, setTextCode] = useState('Desenvolvedor Front-End')
  const textAnimationUpRef = useRef<HTMLParagraphElement>(null)
  const printerCode = useRef<HTMLParagraphElement>(null)

  function handleScroll(progress: number) {
    setProgress(progress)
  }

  function toggleAnimationCss() {
    if (textAnimationUpRef.current !== null) {
      textAnimationUpRef.current.classList.toggle(Styled.text_up)
    }
  }

  const handleCodeText = (
    element: RefObject<HTMLParagraphElement>,
    text: string,
    time: number,
    indice: number
  ) => {
    const valueCurrent = element.current
    if (valueCurrent !== null) {
      setTimeout(() => {
        valueCurrent.textContent += text.charAt(indice)
        indice++
        handleCodeText(element, text, time, indice)
      }, time)
    }
  }

  const handleClearCode = (printerCode: RefObject<HTMLParagraphElement>) => {
    if (printerCode.current !== null) {
      printerCode.current.textContent = ''
    }
  }

  useEffect(() => {
    const interval = setInterval(toggleAnimationCss, 5000)
    const codeAnimationTimeOut = setTimeout(
      () => handleCodeText(printerCode, textCode, 100, 0),
      2000
    )
    const intervalCodeText = setInterval(() => {
      handleClearCode(printerCode)
      handleCodeText(printerCode, textCode, 100, 0)
    }, 9999)

    return () => {
      clearInterval(interval)
      clearInterval(intervalCodeText)
      clearTimeout(codeAnimationTimeOut)
    }
    // eslint-disable-next-line
  }, [])

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
          <p ref={printerCode}></p>
          <span className={Styled.key_green}> {'}'}</span>
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
