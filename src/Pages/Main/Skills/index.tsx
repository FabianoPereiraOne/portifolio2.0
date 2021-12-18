import Styled from './skills.module.css'
import Title from '../../../Components/Title'
import * as CG from '../../../Components/Global'
import * as si from 'react-icons/si'

function Skills() {
  return (
    <section className={Styled.content_skills} id="habilidades">
      <Title
        title="Habilidades"
        subTitle="Principais tecnologias utilizadas."
      />
      <div className={Styled.content_progress_skills}>
        <CG.CardSkill>
          <si.SiHtml5 />
          <CG.SkillName>Html5</CG.SkillName>
        </CG.CardSkill>
        <CG.CardSkill>
          <si.SiCss3 />
          <CG.SkillName>Css3</CG.SkillName>
        </CG.CardSkill>
        <CG.CardSkill>
          <si.SiJavascript />
          <CG.SkillName>Javascript</CG.SkillName>
        </CG.CardSkill>
        <CG.CardSkill>
          <si.SiReact />
          <CG.SkillName>React JS</CG.SkillName>
        </CG.CardSkill>
        <CG.CardSkill>
          <si.SiNextDotJs />
          <CG.SkillName>Next JS</CG.SkillName>
        </CG.CardSkill>
        <CG.CardSkill>
          <si.SiBootstrap />
          <CG.SkillName>Bootstrap</CG.SkillName>
        </CG.CardSkill>
        <CG.CardSkill>
          <si.SiTypescript />
          <CG.SkillName>Typescript</CG.SkillName>
        </CG.CardSkill>
        <CG.CardSkill>
          <si.SiGit />
          <CG.SkillName>Git</CG.SkillName>
        </CG.CardSkill>
      </div>
    </section>
  )
}

export default Skills
