import { HashLoader } from 'react-spinners'
import styles from './styles.module.css'

export const Loading = () => {
  return (
    <div aria-label="Carregando conteudo" className={styles.container}>
      <HashLoader color="#2c9ddb" />
      <p>Carregando...</p>
    </div>
  )
}
