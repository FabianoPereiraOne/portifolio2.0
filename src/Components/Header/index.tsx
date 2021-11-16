import * as FI from 'react-icons/fi'
import { usePortfolioContext } from '../../contexts'
import styles from './styles.module.css'

export const Header = () => {
    const useContext = usePortfolioContext()

    const handleMenu = () =>{
        useContext.setToggleMenu(!useContext.toggleMenu)
    }

    const handleLogout = () =>{
        useContext.handleSignOut()
    }

    return (
        <header className={styles.header}>
            <button type="button" className={styles.button_menu} onClick={handleMenu}><FI.FiAlignJustify /></button>
            <button type="button" className={styles.button_sign_out} onClick={handleLogout}><FI.FiLogIn /></button>
        </header>
    )
}