import Styled from './skills.module.css'
import Title from '../../../Components/Title'
import { ContainerProgressBar, SkillProgressBar } from '../../../Components/Global'
import { usePortfolioContext } from '../../../contexts'
import { Empty } from '../../../Components/Empty'

function Skills() {
    const useContext = usePortfolioContext()

    return (
        <section className={Styled.content_skills} id="habilidades">
            <Title title="Habilidades" subTitle="Principais tecnologias utilizadas." />
            {useContext.skills.length > 0 ? (
                <div className={Styled.content_progress_skills}>
                    {useContext.skills.length > 0 && useContext.skills.map((skill, index) => {
                        return (
                            <div key={index.toString()} className={Styled.skill_group}>
                                <p>{skill.name}</p>
                                <ContainerProgressBar className={Styled.content_progress}>
                                    <SkillProgressBar value={skill.progress} className={Styled.progress} />
                                </ContainerProgressBar>
                            </div>
                        )
                    })}
                </div>

            ) : <Empty message="Nenhuma habilidade disponivel." />}
        </section>
    )
}

export default Skills