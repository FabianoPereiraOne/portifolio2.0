import { useState, useEffect } from 'react'
import Styled from './home.module.css'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { ProgressBar, ButtonPrimary } from '../../../Components/Global'

function Inicio() {

    const [progress, setProgress] = useState(0)
    const [toggleMenu, setToggleMenu] = useState(false)

    function handleScroll(progress: number, pos: number) {
        setProgress(progress)
    }

    function toggleAnimationCss() {
        const textUp = document.querySelector('#textUp')
        if (textUp) {
            textUp.classList.toggle('home_text_up__8bs_B')
        }
    }

    useEffect(() => {
        const interval = setInterval(toggleAnimationCss, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <section className={Styled.section_home}>
            {toggleMenu &&
                (
                    <ul className={Styled.menu_mobile}>
                        <li>
                            <button>Inicio</button>
                        </li>
                        <li>
                            <button>Sobre</button>
                        </li>
                        <li>
                            <button>Habilidades</button>
                        </li>
                        <li>
                            <button>Projetos</button>
                        </li>
                    </ul>
                )
            }


            <header className={Styled.header}>
                <Link to="/" className={Styled.container_logo}>
                    <img src="/assets/logo.svg" alt="logo" />
                    <p>Fabiano Pereira</p>
                </Link>
                <nav className={Styled.nav}>
                    <button onClick={() => handleScroll(0, 0)}>Inicio</button>
                    <button onClick={() => handleScroll(19, 0)}>Sobre</button>
                    <button onClick={() => handleScroll(49, 0)}>Habilidades</button>
                    <button onClick={() => handleScroll(82.6, 0)}>Projetos</button>
                    <span className={Styled.progress_bar}>
                        <ProgressBar progressValue={progress} />
                    </span>
                </nav>

                <button className={Styled.btn_menu_mobile} onClick={() => setToggleMenu(!toggleMenu)}>
                    <FiMenu />
                </button>
            </header>
            <section className={Styled.section_banner_default}>
                <h1>Fabiano Pereira</h1>
                <p id="textUp" className={Styled.text_up}>|  <span style={{ '--delay': 0 } as React.CSSProperties}>D</span>
                    <span className={Styled.text_up} style={{ '--delay': 1 } as React.CSSProperties}>e</span>
                    <span style={{ '--delay': 2 } as React.CSSProperties}>s</span>
                    <span style={{ '--delay': 3 } as React.CSSProperties}>e</span>
                    <span style={{ '--delay': 4 } as React.CSSProperties}>n</span>
                    <span style={{ '--delay': 5 } as React.CSSProperties}>v</span>
                    <span style={{ '--delay': 6 } as React.CSSProperties}>o</span>
                    <span style={{ '--delay': 7 } as React.CSSProperties}>l</span>
                    <span style={{ '--delay': 8 } as React.CSSProperties}>v</span>
                    <span style={{ '--delay': 9 } as React.CSSProperties}>e</span>
                    <span style={{ '--delay': 10 } as React.CSSProperties}>d</span>
                    <span style={{ '--delay': 11 } as React.CSSProperties}>o</span>
                    <span style={{ '--delay': 12 } as React.CSSProperties}>r</span> <span style={{ '--delay': 13 } as React.CSSProperties}>F</span>
                    <span style={{ '--delay': 14 } as React.CSSProperties}>r</span>
                    <span style={{ '--delay': 15 } as React.CSSProperties}>o</span>
                    <span style={{ '--delay': 16 } as React.CSSProperties}>n</span>
                    <span style={{ '--delay': 17 } as React.CSSProperties}>t</span>
                    <span style={{ '--delay': 18 } as React.CSSProperties}>E</span>
                    <span style={{ '--delay': 19 } as React.CSSProperties}>n</span>
                    <span style={{ '--delay': 20 } as React.CSSProperties}>d</span>    |</p>
                <div className={Styled.btn_group}>
                    <ButtonPrimary>
                        Sobre
                    </ButtonPrimary>
                    <ButtonPrimary> 
                        Download Cv
                    </ButtonPrimary>
                </div>
            </section>
        </section>
    )
}

export default Inicio