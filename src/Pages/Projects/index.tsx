import styles from './styles.module.css'
import { Sidebar } from '../../Components/Sidebar'
import { Header } from '../../Components/Header'
import { usePortfolioContext } from '../../contexts'
import { toast } from 'react-toastify'
import { FormEvent, useState, useEffect } from 'react'
import { ButtonImage } from '../../Components/Global'
import * as types from '../../types/global'
import * as typesContext from '../../types/contextTypes'
import * as fi from 'react-icons/fi'

type Skills = {
    [name: string]: {
        name: string,
        checked: boolean
    }
}

export const Projects = () => {
    const useContext = usePortfolioContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [capaLocalUrl, setCapaLocalUrl] = useState('')
    const [fileCapa, setFileCapa] = useState<null | React.ChangeEvent<HTMLInputElement>>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        useContext.handleGetProjects()
    }, [])

    const handleValidationAddProject = (e: FormEvent) => {
        e.preventDefault()

        if (name.length > 0 && description.length > 0 && fileCapa !== null && fileCapa.target.files !== null) {
            const fileType = fileCapa.target.files[0].type
            const skills = handleGetSkillsChecked()

            console.log(skills)
            // if (handleInspectFileTypeAsAccepted(fileType)) {

            //     setLoading(true)
            //     useContext.handleAddProject({
            //         name,
            //         description,
            //         file: fileCapa,
            //         skills,
            //     }).finally(() => {
            //         setLoading(false)
            //     })

            //     handleClearStates()
            // } else {
            //     toast.info('Formato invalido! [PNG | JPG]')
            // }

        } else {
            toast.info('Preencha todos os dados!')
        }
    }

    const handleGetSkillsChecked = () => {

        if (useContext.skills.length > 0) {
            let skills: Array<string> = []

            useContext.skills.forEach((skill) => {
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
    }

    const handleInspectFileTypeAsAccepted = (type: string) => {
        const acceptedTypes: types.AcceptedTypes = {
            'image/png': true,
            'image/jpg': true,
            'image/jpeg': true,
        }

        if (acceptedTypes[type]) {
            return true
        } else {
            return false
        }
    }

    const handleSaveFileCapaAndLocalUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files !== null && files[0] !== null && handleInspectFileTypeAsAccepted(files[0].type)) {
            setCapaLocalUrl(URL.createObjectURL(files[0]))
            setFileCapa(e)
        } else {
            toast.info('Formato invalido! [PNG | JPG]')
        }
    }

    const handleDeleteCapa = () => {
        setCapaLocalUrl('')
        setFileCapa(null)
    }

    const handleToggleChecked = (skillClick: typesContext.SkillsTypes) => {
        const newListSkills = useContext.skills.map((skill: typesContext.SkillsTypes) => {
            if (skill.id === skillClick.id) {
                return {
                    name: skill.name,
                    value: skill.value,
                    checked: !skill.checked,
                    id: skill.id
                }
            } else {
                return skill
            }
        })

        useContext.setSkills(newListSkills)
    }

    return (
        <section className={styles.container_projects}>
            <Sidebar />
            <form className={styles.container_actions} onSubmit={handleValidationAddProject}>
                <Header />
                <div className={styles.container_capa_and_views}>
                    {capaLocalUrl.length > 0 ?
                        (
                            <ButtonImage onClick={handleDeleteCapa} background={capaLocalUrl} type="button">Trocar</ButtonImage>
                        )
                        : (
                            <label className={styles.upload_capa}>
                                <input type="file" onChange={handleSaveFileCapaAndLocalUrl} />
                            </label>
                        )}
                    {/* <ul className={styles.views_projects}>
                        {useContext.projects.map((project: ProjectProps, index: number) => {
                            return (
                                <li>
                                    <p>{project.name}</p>
                                    <button>Trash</button>
                                </li>
                            )
                        })}
                    </ul> */}
                </div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <button type="button" className={styles.button_action_skills}>
                    Skills
                    <fi.FiChevronDown />
                </button>

                <div className={styles.skills_wrapper}>
                    {useContext.skills.length > 0 ?
                        useContext.skills.map((skill, index) => {
                            return (
                                <label key={index.toString()} className={styles.skills}>
                                    <input type="checkbox" checked={skill.checked}
                                        onChange={() => handleToggleChecked(skill)} />
                                    <span>{skill.name}</span>
                                </label>
                            )
                        })
                        : <span>Nenhuma skill</span>}
                </div>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />

                <button type="submit">
                    {loading ? 'Adicionando...' : 'Adicionar'}
                </button>
            </form>
        </section>
    )
}