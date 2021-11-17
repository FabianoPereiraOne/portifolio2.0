import { Link, useHistory } from 'react-router-dom'
import * as FI from 'react-icons/fi'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { MenuMobile } from '../MenuMobile'
import { usePortfolioContext } from '../../contexts'

export const Sidebar = () => {
    const [pageActive, setPageActive] = useState('/dashboard/projects')
    const history = useHistory()
    const useContext = usePortfolioContext()

    useEffect(() => {
        setPageActive(history.location.pathname)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            { useContext.toggleMenu && <MenuMobile/>}
            <aside className={styles.container_sidebar}>
                <div className={styles.container_img_profile}>
                    <div className={styles.img_profile}>
                        <FI.FiUser />
                    </div>
                </div>
                <ul className={styles.container_pages}>
                    <li className={styles.container_anchor}>
                        <Link className={pageActive.includes('/dashboard/projects') ? styles.active : ''} to="/dashboard/projects">
                            <FI.FiFolder />
                            Projetos
                        </Link>
                    </li>
                    <li className={styles.container_anchor}>
                        <Link className={pageActive.includes('/dashboard/skills') ? styles.active : ''} to="/dashboard/skills">
                            <FI.FiBook />
                            Skills
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    )
}