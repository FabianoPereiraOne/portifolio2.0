import styles from './styles.module.css'
import { Sidebar } from '../../Components/Sidebar'
import { Container, ContainerFlexDiv } from '../../Components/Global'
import { FormEvent, useState, useEffect } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { usePortfolioContext } from '../../contexts'
import { SkillsTypes } from '../../types/contextTypes'
import { toast } from 'react-toastify'

export const Skills = () => {
    const [name, setName] = useState('')
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const useContext = usePortfolioContext()


    useEffect(() => {
        useContext.setLoad(true)
        useContext.handleGetSkills()
            .finally(() => useContext.setLoad(false))
        // eslint-disable-next-line
    }, [])


    const handleProcessAddSkill = (e: FormEvent) => {
        e.preventDefault()
        if (name.length > 0) {
            handleClearStates()
            setLoading(true)
            useContext.handleAddSkill(name, progress)
                .finally(() => {
                    setLoading(false)
                })
        } else {
            toast.info("Preencha todos os campos!")
        }
    }

    const handleUpdateProgress = (positonDragged: number) => {
        setProgress(positonDragged)
    }

    const handleClearStates = () => {
        setName('')
        setProgress(0)
    }

    if (useContext.load) {
        return <h1>Carregando...</h1>
    }

    return (
        <Container>
            <Sidebar />
            <ContainerFlexDiv>
                <form className={styles.action_add_skills} onSubmit={handleProcessAddSkill}>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    <div>
                        <Slider
                            max={100}
                            value={progress}
                            onChange={handleUpdateProgress}
                            trackStyle={{ background: '#2c9ddb' }}
                            railStyle={{ background: '#2c9ddb' }}
                            handleStyle={{ borderColor: '#1484c1', borderWidth: 4 }}
                        />
                        <span>{progress}%</span>
                    </div>
                    <button type="submit">{
                        loading ? 'Adicionando...' : 'Adicionar'
                    }</button>
                </form>
                <ul className={styles.views_skills}>
                    {useContext.skills.map((skill: SkillsTypes, index: number) => {
                        return (
                            <li key={index.toString()}>
                                <p>{skill.name}</p>
                                <button>Trash</button>
                            </li>
                        )
                    })}
                </ul>
            </ContainerFlexDiv>
        </Container>
    )
}