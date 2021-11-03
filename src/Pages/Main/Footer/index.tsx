import * as Scroll from 'react-scroll'
import styles from './footer.module.css'
import logo from '../../../assets/logo.svg'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className={styles.content_footer}>
            <ul className={styles.menu_links}>
                <h5>Menu</h5>
                <li><Scroll.Link to="inicio" smooth={true}>Inicio</Scroll.Link></li>
                <li><Scroll.Link to="sobre" smooth={true}>Sobre</Scroll.Link></li>
                <li><Scroll.Link to="habilidades" smooth={true}>Habilidades</Scroll.Link></li>
                <li><Scroll.Link to="projetos" smooth={true}>Projetos</Scroll.Link></li>
            </ul>

            <div className={styles.group_copy}>
                <img src={logo} alt="logo" />
                <p>Copyright &copy;2021</p>
                <span>Desenvolvido por Fabiano Pereira</span>
            </div>

            <ul className={styles.menu_links}>
                <h5>Redes Sociais</h5>
                <li><Link to="/">Facebook</Link></li>
                <li><Link to="/">Instagram</Link></li>
                <li><Link to="/">Github</Link></li>
                <li><Link to="/">LinkedIn</Link></li>
            </ul>
        </footer>
    )
}

export default Footer