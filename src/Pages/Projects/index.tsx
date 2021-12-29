import styles from './styles.module.css'
import * as Fi from 'react-icons/fi'
import * as CG from '../../Components/Global'
import { Sidebar } from '../../Components/Sidebar'
import { Header } from '../../Components/Header'
import { usePortfolioContext } from '../../contexts'
import { toast } from 'react-toastify'
import { FormEvent, useState, useEffect } from 'react'
import { ProjectProps } from '../../types/ProjectProps'
import { Loading } from '../../Components/Loading'
import { LabelUpload } from '../../Components/Global'
import { GalleryImages, FileType, AcceptedTypes } from '../../types/global'
import { ClockLoader } from 'react-spinners'

export const Projects = () => {
  const useContext = usePortfolioContext()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [skill, setSkill] = useState('')
  const [duration, setDuration] = useState('')
  const [capaLocalUrl, setCapaLocalUrl] = useState('')
  const [galleryImages, setGalleryImages] = useState<GalleryImages[]>([])
  const [fileCapa, setFileCapa] = useState<FileType>(null)
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
    useContext.handleGetOnProjects().finally(() => setLoading(false))
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
      galleryImages.length > 0
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
          galleryImages,
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
    setDuration('')
    setUrl('')
    setGalleryImages([])
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
      const acceptedTypes: AcceptedTypes = {
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
    if (galleryImages.length < 10 && galleryImages.length < 10) {
      const { response, file } = handleInspectFileTypeAsAccepted(e)
      if (response && file !== null) {
        setGalleryImages(internalValue => [
          {
            url: URL.createObjectURL(file),
            file,
            name: file.name
          },
          ...internalValue
        ])
      }
    } else {
      toast.info('Ops! Limite de 10 imagens.')
    }
  }

  const handleDeleteImageGallery = (pos: number) => {
    const galleryImagesList: GalleryImages[] = []
    galleryImages.forEach((image: GalleryImages, index: number) => {
      if (pos !== index) {
        galleryImagesList.push(image)
      }
    })

    setGalleryImages(galleryImagesList)
  }

  const handlePreAddSkill = () => {
    if (skill.length > 0) {
      useContext.handleAddSkill(skill).finally(() => setSkill(''))
    } else {
      toast.info('Preencha o campo!')
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
                <div className={styles.container_view_skills}>
                  {useContext.skills.length > 0 ? (
                    useContext.skills.map((skill, index) => {
                      return (
                        <label key={index.toString()} className={styles.skills}>
                          <input
                            type="checkbox"
                            checked={skill.checked}
                            onChange={() =>
                              useContext.handleToggleChecked(skill)
                            }
                          />
                          <p>{skill.name}</p>
                          <button
                            onClick={() =>
                              useContext.handleDeleteDoc('skills', skill.id)
                            }
                          >
                            <Fi.FiTrash />
                          </button>
                        </label>
                      )
                    })
                  ) : (
                    <span>Nenhuma skill</span>
                  )}
                </div>

                <div className={styles.container_action_add_skills}>
                  <input
                    type="text"
                    value={skill}
                    placeholder="Habilidade"
                    maxLength={50}
                    onChange={e => setSkill(e.target.value)}
                  />
                  <button type="button" onClick={handlePreAddSkill}>
                    <Fi.FiPlus />
                  </button>
                </div>
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
              <LabelUpload width={10} className={styles.children}>
                <input type="file" hidden onChange={handleGallerySaveFile} />
                <Fi.FiPlus />
              </LabelUpload>

              <div className={styles.panel_gallery}>
                {galleryImages.length > 0 &&
                  galleryImages.map((image: GalleryImages, pos: number) => {
                    return (
                      <CG.ButtonImage
                        className={styles.children}
                        width={10}
                        onClick={() => handleDeleteImageGallery(pos)}
                        background={image.url}
                        type="button"
                        key={pos.toString()}
                      >
                        <Fi.FiX />
                      </CG.ButtonImage>
                    )
                  })}
              </div>
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
                        {load.delete ? (
                          <div className={styles.container_load}>
                            <ClockLoader color="white" size={35} />
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setLoad({ ...load, delete: true })
                              useContext
                                .handleDeleteProject(project)
                                .finally(() =>
                                  setLoad({ ...load, delete: false })
                                )
                            }}
                          >
                            <Fi.FiTrash />
                          </button>
                        )}
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
