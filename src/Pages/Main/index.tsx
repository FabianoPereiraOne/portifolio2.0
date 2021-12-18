import About from './About'
import Home from './Home'
import Skills from './Skills'
import Projects from './Projects'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import { usePortfolioContext } from '../../contexts'
import { app } from '../../services/firebase'
import { Loading } from '../../Components/Loading'

function Main() {
  const { handleGetProjects, setProjects } = usePortfolioContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    app()
    handleGetProjects().finally(() => {
      setLoading(false)
    })

    return () => {
      setProjects([])
    }

    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Home />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </>
  )
}

export default Main
