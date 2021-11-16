import styles from './styles.module.css'
import { Sidebar } from '../../Components/Sidebar'
import { Header } from '../../Components/Header'
import { usePortfolioContext } from '../../contexts'
import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import { ButtonImage } from '../../Components/Global'

export const Projects = () => {
    const useContext = usePortfolioContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [capaLocalUrl, setCapaLocalUrl] = useState('')
    const [fileCapa, setFileCapa] = useState<null | React.ChangeEvent<HTMLInputElement>>(null)

    const handleValidationAddProject = (e: FormEvent) => {
        e.preventDefault()
        if (name.length > 0 && description.length > 0 && fileCapa !== null && fileCapa.target.files !== null) {

            if (fileCapa.target.files[0].type === 'image/png' || fileCapa.target.files[0].type === 'image/jpg' || fileCapa.target.files[0].type === 'image/jpeg') {
                useContext.handleAddProject({
                    name,
                    description,
                    file: fileCapa
                })

                setName('')
                setDescription('')
                setCapaLocalUrl('')
                setFileCapa(null)
            } else {
                toast.info('Formato invalido! [PNG | JPG]')
            }

        } else {
            toast.info('Preencha todos os dados!')
        }
    }

    const handleSaveFileCapaAndLocalUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCapaLocalUrl(URL.createObjectURL(e.target.files[0]))
            setFileCapa(e)
        }
    }

    const handleDeleteCapa = () => {
        setCapaLocalUrl('')
        setFileCapa(null)
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
                <textarea value={description} onChange={e => setDescription(e.target.value)} />

                <button type="submit">
                    Adicionar
                </button>
            </form>
        </section>
    )
}