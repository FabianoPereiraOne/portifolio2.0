import { Link } from 'react-router-dom'
import * as FI from 'react-icons/fi'
import styles from './styles.module.css'

export const Sidebar = () => {
    return (
        <aside className={styles.container_sidebar}>
            <div className={styles.container_img_profile}>
                <div className={styles.img_profile}>
                    <FI.FiUser />
                </div>
            </div>
            <hr className={styles.divider} />
            <ul className={styles.container_pages}>
                <li className={styles.container_anchor}>
                    <Link to="/dashboard/projetos">
                        <FI.FiFolder />
                        Projetos
                    </Link>
                </li>
                <li className={styles.container_anchor}>
                    <Link className={styles.active} to="/dashboard/skills">
                        <FI.FiBook />
                        Skills
                    </Link>
                </li>
            </ul>
        </aside>
    )
}