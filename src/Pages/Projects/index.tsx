import styles from './styles.module.css'
import * as Fi from 'react-icons/fi'
import * as types from '../../types/global'
import * as CG from '../../Components/Global'
import { Sidebar } from '../../Components/Sidebar'
import { Header } from '../../Components/Header'
import { usePortfolioContext } from '../../contexts'
import { toast } from 'react-toastify'
import { FormEvent, useState, useEffect } from 'react'
import { ProjectProps } from '../../types/ProjectProps'
import { Loading } from '../../Components/Loading'
import { LabelUpload } from '../../Components/Global'

export const Projects = () => {
  const useContext = usePortfolioContext()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [duration, setDuration] = useState('')
  const [galleryImagesFile, setGalleryImagesFile] = useState<Array<File>>([])
  const [capaLocalUrl, setCapaLocalUrl] = useState('')
  const [galleryImagesUrl, setGalleryImagesUrl] = useState<Array<string>>([])
  const [fileCapa, setFileCapa] = useState<types.FileType>(null)
  const [loading, setLoading] = useState(false)
  const [divWrapperSkill, setDivWrapperSkills] = useState(false)
  const [load, setLoad] = useState({
    add: false,
    get: false,
    delete: false
  })

  useEffect(() => {
    setLoading(true)
    useContext.handleGetSkills()
    useContext.handleGetProjects().finally(() => setLoading(false))
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
      duration.length > 0 &&
      galleryImagesFile.length > 0 &&
      url.length > 0
    ) {
      const skills = handleGetSkillsChecked()
      setLoad({ ...load, add: true })
      useContext
        .handleAddProject({
          name,
          description,
          file: fileCapa,
          skills,
          duration,
          galleryImagesFile,
          url
        })
        .finally(() => {
          setLoad({ ...load, add: false })
        })

      handleClearStates()
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

  type ResponseInspect = {
    response: boolean
    file: null | File
  }

  const handleInspectFileTypeAsAccepted = (
    e: React.ChangeEvent<HTMLInputElement>
  ): ResponseInspect => {
    const files = e.target.files

    if (files !== null && files[0] !== null) {
      const acceptedTypes: types.AcceptedTypes = {
        'image/png': true,
        'image/jpg': true,
        'image/jpeg': true
      }

      if (acceptedTypes[files[0].type]) {
        return {
          response: true,
          file: files[0]
        }
      } else {
        toast.info('Formato invalido! [PNG | JPG]')
        return {
          response: false,
          file: null
        }
      }
    } else {
      toast.info('Erro. Selecione uma imagem!')
      return {
        response: false,
        file: null
      }
    }
  }

  const handleSaveFileCapaAndLocalUrl = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { file, response } = handleInspectFileTypeAsAccepted(e)
    if (response && file !== null) {
      setCapaLocalUrl(URL.createObjectURL(file))
      setFileCapa(e)
    }
  }

  const handleGallerySaveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (galleryImagesFile.length < 10 && galleryImagesUrl.length < 10) {
      const { response, file } = handleInspectFileTypeAsAccepted(e)
      if (response && file !== null) {
        setGalleryImagesUrl(internalValue => [
          URL.createObjectURL(file),
          ...internalValue
        ])
        setGalleryImagesFile(internalValue => [file, ...internalValue])
      }
    } else {
      toast.info('Ops! Limite de 10 imagens.')
    }
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
          <form className={styles.form} onSubmit={handleValidationAddProject}>
            {capaLocalUrl.length > 0 ? (
              <CG.ButtonImage
                onClick={handleDeleteCapa}
                background={capaLocalUrl}
                type="button"
              >
                <Fi.FiRepeat />
              </CG.ButtonImage>
            ) : (
              <LabelUpload>
                <input
                  type="file"
                  hidden
                  onChange={handleSaveFileCapaAndLocalUrl}
                />
                <Fi.FiPlus />
              </LabelUpload>
            )}
            <CG.InputText
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
                          onChange={() => useContext.handleToggleChecked(skill)}
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
            <CG.InputText
              placeholder="Digite a url"
              aria-label="Preencha com a url do projeto"
              type="text"
              value={url}
              tabIndex={2}
              onChange={e => setUrl(e.target.value)}
            />
            <CG.TextArea
              placeholder="Descrição do projeto"
              value={description}
              tabIndex={3}
              onChange={e => setDescription(e.target.value)}
            />

            <CG.InputText
              width={10}
              placeholder="Duração"
              aria-label="Preencha com a duração do projeto"
              type="text"
              value={duration}
              tabIndex={4}
              onChange={e => setDuration(e.target.value)}
            />

            <div className={styles.container_gallery}>
              <LabelUpload width={10}>
                <input type="file" hidden onChange={handleGallerySaveFile} />
                <Fi.FiPlus />
              </LabelUpload>

              {galleryImagesUrl.length > 0 &&
                galleryImagesUrl.map(url => {
                  return (
                    <CG.ButtonImage
                      width={10}
                      onClick={() => alert('Excluindo...')}
                      background={url}
                      type="button"
                    >
                      <Fi.FiX />
                    </CG.ButtonImage>
                  )
                })}
            </div>

            <CG.ButtonSubmit type="submit">
              {load.add ? 'Adicionando...' : 'Adicionar'}
            </CG.ButtonSubmit>
          </form>
          <div className={styles.container_view}>
            <CG.PanelViewDark className={styles.container_li}>
              {useContext.projects.length > 0 ? (
                useContext.projects.map(
                  (project: ProjectProps, index: number) => {
                    return (
                      <CG.RowDatas key={index.toString()}>
                        <p>{project.name}</p>
                        <button
                          onClick={() => {
                            useContext.handleDeleteDoc('projects', project.id)
                          }}
                        >
                          <Fi.FiTrash />
                        </button>
                      </CG.RowDatas>
                    )
                  }
                )
              ) : (
                <span>Nenhum projeto</span>
              )}
            </CG.PanelViewDark>
          </div>
        </CG.ContainerRowColumn>
      </CG.ContainerFlexDiv>
    </CG.Container>
  )
}
