import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../../Components/Loading'
import { usePortfolioContext } from '../../contexts'

export const Project = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const { handleGetProject, project } = usePortfolioContext()

  useEffect(() => {
    handleGetProject(id).finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loading />
  }

  return <img src={project.capaSmall} alt="" />
}
