import styles from './footer.module.css'
import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.svg'

function Footer(){
    return(
        <footer className={ styles.content_footer }>
            <ul className={ styles.menu_links}>
                <h5>Menu</h5>
                <li><Link to="inicio">Inicio</Link></li>
                <li><Link to="inicio">Sobre</Link></li>
                <li><Link to="inicio">Habilidades</Link></li>
                <li><Link to="inicio">Projetos</Link></li>
            </ul>

            <div className={ styles.group_copy }>
                <img src={ logo } alt="logo"/>
                <p>Copyright &copy;2021</p>
                <span>Desenvolvido por Fabiano Pereira</span>
            </div>

            <ul className={ styles.menu_links}>
                <h5>Redes Sociais</h5>
                <li><Link to="*">Facebook</Link></li>
                <li><Link to="*">Instagram</Link></li>
                <li><Link to="*">Github</Link></li>
                <li><Link to="*">LinkedIn</Link></li>
            </ul>
        </footer>
    )
}

export default  Footer