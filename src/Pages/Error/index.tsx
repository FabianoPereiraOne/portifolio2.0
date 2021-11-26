import erro from '../../assets/error_404.svg'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <section className={styles.container}>
      <div className={styles.container_center}>
        <img src={erro} alt="Imagem do erro 404" />
        <p>Pagina não encontrada!</p>
        <Link to="/">Volte ao inicio</Link>
      </div>
    </section>
  )
}
