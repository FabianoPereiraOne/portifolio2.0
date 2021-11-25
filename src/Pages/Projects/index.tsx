import styles from './styles.module.css'
import { Sidebar } from '../../Components/Sidebar'
import { Header } from '../../Components/Header'
import { usePortfolioContext } from '../../contexts'
import { toast } from 'react-toastify'
import { FormEvent, useState, useEffect } from 'react'
import {
  ButtonImage,
  Container,
  ContainerFlexDiv,
  ContainerRowColumn,
  PanelViewDark,
  RowDatas
} from '../../Components/Global'
import * as types from '../../types/global'
import * as typesContext from '../../types/contextTypes'
import * as Fi from 'react-icons/fi'
import { ProjectProps } from '../../types/ProjectProps'

export const Projects = () => {
  const useContext = usePortfolioContext()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [capaLocalUrl, setCapaLocalUrl] = useState('')
  const [fileCapa, setFileCapa] =
    useState<null | React.ChangeEvent<HTMLInputElement>>(null)
  const [loading, setLoading] = useState(false)
  const [divWrapperSkill, setDivWrapperSkills] = useState(false)

  useEffect(() => {
    useContext.setLoad(true)
    useContext.handleGetProjects().finally(() => useContext.setLoad(false))
    // eslint-disable-next-line
  }, [])

  const handleDeleteCapa = () => {
    setCapaLocalUrl('')
    setFileCapa(null)
  }

  const handleValidationAddProject = (e: FormEvent) => {
    e.preventDefault()

    if (
      name.length > 0 &&
      description.length > 0 &&
      fileCapa !== null &&
      fileCapa.target.files !== null
    ) {
      const fileType = fileCapa.target.files[0].type
      const skills = handleGetSkillsChecked()

      if (handleInspectFileTypeAsAccepted(fileType)) {
        setLoading(true)
        useContext
          .handleAddProject({
            name,
            description,
            file: fileCapa,
            skills
          })
          .finally(() => {
            setLoading(false)
          })

        handleClearStates()
      } else {
        toast.info('Formato invalido! [PNG | JPG]')
      }
    } else {
      toast.info('Preencha todos os dados!')
    }
  }

  const handleGetSkillsChecked = () => {
    if (useContext.skills.length > 0) {
      let skills: Array<string> = []

      useContext.skills.forEach(skill => {
        if (skill.checked) {
          skills.push(skill.name)
        }
      })

      if (skills.length > 0) {
        return skills
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const handleClearStates = () => {
    setName('')
    setDescription('')
    setCapaLocalUrl('')
    setFileCapa(null)
    const newListSkills = useContext.skills.map(skill => {
      if (skill.checked) {
        return {
          name: skill.name,
          progress: skill.progress,
          checked: false,
          created: skill.created,
          id: skill.id
        }
      } else {
        return skill
      }
    })
    useContext.setSkills(newListSkills)
  }

  const handleInspectFileTypeAsAccepted = (type: string) => {
    const acceptedTypes: types.AcceptedTypes = {
      'image/png': true,
      'image/jpg': true,
      'image/jpeg': true
    }

    if (acceptedTypes[type]) {
      return true
    } else {
      return false
    }
  }

  const handleSaveFileCapaAndLocalUrl = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files
    if (
      files !== null &&
      files[0] !== null &&
      handleInspectFileTypeAsAccepted(files[0].type)
    ) {
      setCapaLocalUrl(URL.createObjectURL(files[0]))
      setFileCapa(e)
    } else {
      toast.info('Formato invalido! [PNG | JPG]')
    }
  }

  const handleToggleChecked = (skillClick: typesContext.SkillsTypes) => {
    const newListSkills = useContext.skills.map(
      (skill: typesContext.SkillsTypes) => {
        if (skill.id === skillClick.id) {
          return {
            name: skill.name,
            progress: skill.progress,
            checked: !skill.checked,
            created: skill.created,
            id: skill.id
          }
        } else {
          return skill
        }
      }
    )

    useContext.setSkills(newListSkills)
  }

  if (useContext.load) {
    return <h1>Carregando...</h1>
  }

  return (
    <Container>
      <Sidebar />
      <ContainerFlexDiv>
        <Header />
        <ContainerRowColumn>
          <form className={styles.form} onSubmit={handleValidationAddProject}>
            {capaLocalUrl.length > 0 ? (
              <ButtonImage
                onClick={handleDeleteCapa}
                background={capaLocalUrl}
                type="button"
              >
                <Fi.FiRepeat />
              </ButtonImage>
            ) : (
              <label className={styles.upload_capa}>
                <input
                  type="file"
                  hidden
                  onChange={handleSaveFileCapaAndLocalUrl}
                />
                <Fi.FiPlus />
              </label>
            )}
            <input
              placeholder="Nome do projeto"
              aria-label="Preencha com o nome do projeto"
              type="text"
              value={name}
              tabIndex={1}
              onChange={e => setName(e.target.value)}
            />
            <button
              type="button"
              className={styles.button_action_skills}
              onClick={() => setDivWrapperSkills(true)}
            >
              Selecione uma habilidade
              <Fi.FiChevronDown />
            </button>

            {divWrapperSkill && (
              <div className={styles.skills_wrapper}>
                <button
                  type="button"
                  className={styles.skills_wrapper_button_close}
                  onClick={() => setDivWrapperSkills(false)}
                >
                  <Fi.FiChevronUp />
                </button>
                {useContext.skills.length > 0 ? (
                  useContext.skills.map((skill, index) => {
                    return (
                      <label key={index.toString()} className={styles.skills}>
                        <input
                          type="checkbox"
                          checked={skill.checked}
                          onChange={() => handleToggleChecked(skill)}
                        />
                        <p>{skill.name}</p>
                      </label>
                    )
                  })
                ) : (
                  <span>Nenhuma skill</span>
                )}
              </div>
            )}
            <textarea
              placeholder="Descrição do projeto"
              value={description}
              tabIndex={2}
              onChange={e => setDescription(e.target.value)}
            />

            <button type="submit">
              {loading ? 'Adicionando...' : 'Adicionar'}
            </button>
          </form>
          <div className={styles.container_view}>
            <PanelViewDark className={styles.container_li}>
              {useContext.projects.length > 0 ? (
                useContext.projects.map(
                  (project: ProjectProps, index: number) => {
                    return (
                      <RowDatas key={index.toString()}>
                        <p>{project.name}</p>
                        <button
                          onClick={() =>
                            useContext.handleDeleteDoc('projects', project.id)
                          }
                        >
                          <Fi.FiTrash />
                        </button>
                      </RowDatas>
                    )
                  }
                )
              ) : (
                <span>Nenhum projeto</span>
              )}
            </PanelViewDark>
          </div>
        </ContainerRowColumn>
      </ContainerFlexDiv>
    </Container>
  )
}
