import { usePortfolioContext } from '../../contexts'
import { app } from '../../services/firebase'
import { useEffect, useState, FormEvent } from 'react'
import { toast } from 'react-toastify'
import technology from '../../assets/technology.svg'
import styles from './styles.module.css'

export const Login = () => {
  const { handleSigin } = usePortfolioContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    app()
  }, [])

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (email.length > 0 && password.length > 0) {
      handleSigin(email, password).finally(() => {
        setLoading(false)
      })
    } else {
      toast.info('Preencha todos os campos!')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <section className={styles.container_login}>
      <div className={styles.container_center}>
        <div className={styles.container_technology}>
          <img
            src={technology}
            alt="Imagem de um homem representando a tecnologia."
          />
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <h2>Login</h2>
          <p>Area restrita, somente administradores podem acessar.</p>
          <input
            tabIndex={1}
            aria-label="Campo de digitação do email do administrador"
            placeholder="Email*"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
          <input
            tabIndex={2}
            aria-label="Campo de digitação do senha do administrador"
            placeholder="Senha*"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <button type="submit">{loading ? 'Acessando...' : 'Acessar'}</button>
        </form>
      </div>
    </section>
  )
}
