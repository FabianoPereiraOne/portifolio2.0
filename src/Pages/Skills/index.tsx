import 'rc-slider/assets/index.css'
import styles from './styles.module.css'
import Slider from 'rc-slider'
import * as Fi from 'react-icons/fi'
import * as CG from '../../Components/Global'
import { Sidebar } from '../../Components/Sidebar'
import { FormEvent, useState, useEffect } from 'react'
import { usePortfolioContext } from '../../contexts'
import { SkillsTypes } from '../../types/contextTypes'
import { toast } from 'react-toastify'
import { Header } from '../../Components/Header'
import { Loading } from '../../Components/Loading'

export const Skills = () => {
  const [name, setName] = useState('')
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState({
    add: false,
    get: false,
    delete: false
  })
  const useContext = usePortfolioContext()

  useEffect(() => {
    setLoading(true)
    useContext.handleGetSkills().finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [])

  const handleProcessAddSkill = (e: FormEvent) => {
    e.preventDefault()
    if (name.length > 0) {
      handleClearStates()
      setLoad({ ...load, add: true })
      useContext.handleAddSkill(name, progress).finally(() => {
        setLoad({ ...load, add: false })
      })
    } else {
      toast.info('Preencha todos os campos!')
    }
  }

  const handleUpdateProgress = (positonDragged: number) => {
    setProgress(positonDragged)
  }

  const handleClearStates = () => {
    setName('')
    setProgress(0)
  }

  const handleDeleteSkill = (skill: SkillsTypes) => {
    useContext.handleDeleteDoc('skills', skill.id)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <CG.Container>
      <Sidebar />
      <CG.ContainerFlexDiv>
        <Header />
        <CG.ContainerRowColumn>
          <form className={styles.form} onSubmit={handleProcessAddSkill}>
            <CG.InputText
              tabIndex={1}
              placeholder="Nome da habilidade"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div className={styles.container_progress}>
              <Slider
                max={100}
                value={progress}
                onChange={handleUpdateProgress}
                trackStyle={{ background: '#2c9ddb' }}
                railStyle={{ background: '#2c9ddb' }}
                handleStyle={{ borderColor: '#1484c1', borderWidth: 4 }}
              />
              <p aria-label="Porcentagem da habilidade">{progress}%</p>
            </div>
            <CG.ButtonSubmit type="submit">
              {load.add ? 'Adicionando...' : 'Adicionar'}
            </CG.ButtonSubmit>
          </form>
          <div className={styles.container_ul}>
            <CG.PanelViewDark className={styles.views_skills}>
              {useContext.skills.map((skill: SkillsTypes, index: number) => {
                return (
                  <CG.RowDatas key={index.toString()}>
                    <p>{skill.name}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill)}
                    >
                      <Fi.FiTrash />
                    </button>
                  </CG.RowDatas>
                )
              })}
            </CG.PanelViewDark>
          </div>
        </CG.ContainerRowColumn>
      </CG.ContainerFlexDiv>
    </CG.Container>
  )
}
