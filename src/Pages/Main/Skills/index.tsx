import { ContainerProgressBar, Title, SkillProgressBar } from '../../../Components/Global'
import Styled from './skills.module.css'

function Skills() {
    return (
        <section className={Styled.content_skills}>
            <Title valuePositionRight={110}>Habilidades</Title>

            <div className={Styled.content_progress_skills}>
                <div className={Styled.skill_group}>
                    <p>HTML 5</p>
                    <ContainerProgressBar className={Styled.content_progress}>
                        <SkillProgressBar value={70} className={Styled.progress} />
                    </ContainerProgressBar>
                </div>
                <div className={Styled.skill_group}>
                    <p>CSS 3</p>
                    <ContainerProgressBar className={Styled.content_progress}>
                        <SkillProgressBar value={70} className={Styled.progress} />
                    </ContainerProgressBar>
                </div>
                <div className={Styled.skill_group}>
                    <p>Javascript</p>
                    <ContainerProgressBar className={Styled.content_progress}>
                        <SkillProgressBar value={70} className={Styled.progress} />
                    </ContainerProgressBar>
                </div>
                <div className={Styled.skill_group}>
                    <p>Bootstrap</p>
                    <ContainerProgressBar className={Styled.content_progress}>
                        <SkillProgressBar value={50} className={Styled.progress} />
                    </ContainerProgressBar>
                </div>
                <div className={Styled.skill_group}>
                    <p>React Js</p>
                    <ContainerProgressBar className={Styled.content_progress}>
                        <SkillProgressBar value={70} className={Styled.progress} />
                    </ContainerProgressBar>
                </div>
                <div className={Styled.skill_group}>
                    <p>TypeScript</p>
                    <ContainerProgressBar className={Styled.content_progress}>
                        <SkillProgressBar value={30} className={Styled.progress} />
                    </ContainerProgressBar>
                </div>
                <div className={Styled.skill_group}>
                    <p>Next JS</p>
                    <ContainerProgressBar className={Styled.content_progress}>
                        <SkillProgressBar value={10} className={Styled.progress} />
                    </ContainerProgressBar>
                </div>
                <div className={Styled.skill_group}>
                    <p>Git</p>
                    <ContainerProgressBar className={Styled.content_progress}>
                        <SkillProgressBar value={60} className={Styled.progress} />
                    </ContainerProgressBar>
                </div>
            </div>
        </section>
    )
}

export default Skills