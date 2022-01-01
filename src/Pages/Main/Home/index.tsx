import * as Scroll from 'react-scroll'
import styles from './home.module.css'
import logo from '../../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { ProgressBar, ButtonPrimary } from '../../../Components/Global'
import { useRef, useState, useEffect, MutableRefObject } from 'react'

function Inicio() {
  const [progress, setProgress] = useState(0)
  const [toggleMenu, setToggleMenu] = useState(false)
  const textPrinter: MutableRefObject<null | HTMLSpanElement> = useRef(null)
  const cursor: MutableRefObject<null | HTMLSpanElement> = useRef(null)
  const AllTextPrinter = ['Front-End', 'Web', 'Moderno']
  const delayAnimation = 2
  const delayToggleText = 4
  const speedWord = 13
  let charIndex = 0
  let textIndex = 0

  const handleGetWord = () => {
    if (textIndex < AllTextPrinter.length) {
      handleGetCharText(AllTextPrinter[textIndex])
      setTimeout(() => {
        textIndex++
        handleGetWord()
      }, delayToggleText * 1000)
    } else {
      textIndex = 0
      charIndex = 0
      handleGetWord()
    }
  }

  const handleGetCharText = (text: string) => {
    const char = text.charAt(charIndex)
    if (charIndex < text.length) {
      setTimeout(() => {
        handlePrinterCharText(char)
        charIndex++
        handleGetCharText(text)
      }, speedWord * 10)
    } else {
      setTimeout(() => handleClearText(text), 1000)
    }
  }

  const handlePrinterCharText = (char: string) => {
    if (textPrinter) {
      textPrinter.current!.textContent += char
    }
  }

  const handlePrinterClearCharText = (char: string) => {
    if (textPrinter) {
      textPrinter.current!.textContent = char
    }
  }

  const handleClearText = (text: string) => {
    if (charIndex > 0) {
      const word = AllTextPrinter[textIndex].substring(0, charIndex - 1)
      setTimeout(() => {
        handlePrinterClearCharText(word)
        charIndex--
        handleClearText(text)
      }, speedWord * 10)
    }
  }

  useEffect(() => {
    if (AllTextPrinter.length > 0 && textPrinter && cursor) {
      setTimeout(handleGetWord, delayAnimation * 1000)
    }

    //eslint-disable-next-line
  }, [])

  function handleScroll(progress: number) {
    setProgress(progress)
  }

  return (
    <section className={styles.section_home} id="inicio">
      {toggleMenu && (
        <ul className={styles.menu_mobile}>
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

      <header className={styles.header}>
        <Link to="/" className={styles.container_logo}>
          <img src={logo} alt="logo" />
          <p>Fabiano Pereira</p>
        </Link>
        <nav className={styles.nav}>
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
          <span className={styles.progress_bar}>
            <ProgressBar progressValue={progress} />
          </span>
        </nav>

        <button
          className={styles.btn_menu_mobile}
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <FiMenu />
        </button>
      </header>
      <section className={styles.section_banner_default}>
        <h1>Fabiano Pereira</h1>
        <div className={styles.content_text_code}>
          <p>
            Desenvolvedor{' '}
            <span ref={textPrinter} className={styles.text_printer}></span>
            <span ref={cursor} className={styles.bar_cursor}>
              &nbsp;
            </span>
          </p>
        </div>
        <div className={styles.btn_group}>
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
