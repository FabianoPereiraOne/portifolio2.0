import styles from './styles.module.css'
import empty from '../../assets/empty.svg'
import * as  Types from '../../types/Empty'

export const Empty = ({ message }: Types.EmptyTypes) => {
    return (
        <div className={styles.container_empty}>
            <img src={empty} alt="Imagem de uma mulher com uma interrogação em cima." />
            <p>{message ? message : 'Nada a ser exibido!'}</p>
        </div>
    )
}