import * as FI from 'react-icons/fi'
import styles from './projects.module.css'
import Title from '../../../Components/Title'
import { usePortfolioContext } from '../../../contexts'
import { useEffect, useRef, useState } from 'react'
import { Empty } from '../../../Components/Empty'
import { Link } from 'react-router-dom'
import { ProjectProps } from '../../../types/ProjectProps'
import { ButtonMore } from '../../../Components/Global'

function Projects() {
  const { handleGetActive, projects, handleLoadMore, isEmpty } =
    usePortfolioContext()
  const btn = useRef<HTMLButtonElement>(null)
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    handleGetActive()
    const timeInterval = setInterval(() => btn.current?.click(), 10000)

    return () => {
      clearInterval(timeInterval)
    }
    // eslint-disable-next-line
  }, [])

  const loadMoreProjects = () => {
    setLoadMore(true)
    handleLoadMore().finally(() => setLoadMore(false))
  }

  return (
    <section className={styles.content_projects} id="projetos">
      <Title title="Projetos" subTitle="Veja soluções já desenvolvidas." />
      <section className={styles.group_projects}>
        {projects.length > 0 ? (
          projects.map((project: ProjectProps, index: number) => {
            return (
              <article className={styles.card_project} key={index.toString()}>
                <img src={project.capaSmall} alt={project.name} />
                <div className={styles.group_text}>
                  <strong>{project.name}</strong>
                  <p>{project.description}</p>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  aria-label={`Clique para ler mais sobre o projeto ${project.name}`}
                >
                  Ler mais <FI.FiArrowRight />
                </Link>
              </article>
            )
          })
        ) : (
          <Empty message="Nenhum projeto disponivel." />
        )}
      </section>
      {projects.length > 0 && (
        <ButtonMore
          onClick={loadMoreProjects}
          aria-label={
            isEmpty ? 'Nenhum projeto disponivel' : 'Ver mais projetos'
          }
          className={styles.btn_more}
          isEmpty={isEmpty}
        >
          {loadMore ? 'Carregando...' : 'Ver mais'}
        </ButtonMore>
      )}
    </section>
  )
}

export default Projects
