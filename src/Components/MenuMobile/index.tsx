import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import * as Fi from 'react-icons/fi'
import { usePortfolioContext } from '../../contexts'

export const MenuMobile = () => {
  const useContext = usePortfolioContext()

  const handleUpdateToggleMenu = () => useContext.setToggleMenu(false)

  return (
    <aside className={styles.container}>
      <Link to="/" className={styles.close_home}>
        <Fi.FiHome />
      </Link>
      <button type="button" onClick={() => useContext.setToggleMenu(false)}>
        <Fi.FiX />
      </button>
      <Link to="/dashboard/projects" onClick={handleUpdateToggleMenu}>
        Projects
      </Link>
    </aside>
  )
}
