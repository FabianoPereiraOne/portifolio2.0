import styles from './styles.module.css'
import { Sidebar } from '../../Components/Sidebar'
import * as CG from '../../Components/Global'
import { FormEvent, useState, useEffect } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { usePortfolioContext } from '../../contexts'
import { SkillsTypes } from '../../types/contextTypes'
import { toast } from 'react-toastify'
import { Header } from '../../Components/Header'
import * as Fi from 'react-icons/fi'

export const Skills = () => {
  const [name, setName] = useState('')
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const useContext = usePortfolioContext()

  useEffect(() => {
    useContext.setLoad(true)
    useContext.handleGetSkills().finally(() => useContext.setLoad(false))
    // eslint-disable-next-line
  }, [])

  const handleProcessAddSkill = (e: FormEvent) => {
    e.preventDefault()
    if (name.length > 0) {
      handleClearStates()
      setLoading(true)
      useContext.handleAddSkill(name, progress).finally(() => {
        setLoading(false)
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

  if (useContext.load) {
    return <h1>Carregando...</h1>
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
              {loading ? 'Adicionando...' : 'Adicionar'}
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
