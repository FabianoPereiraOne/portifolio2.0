import Project from '../../../Components/Project'
import Styled from './projects.module.css'
import Title from '../../../Components/Title'
import { useState } from 'react'
import happy from '../../../assets/happy.png'
import onePage from '../../../assets/onePage.png'
import quark from '../../../assets/quark.png'
import podcastr from '../../../assets/podcastr.png'

function Projects() {
    const [projects, setProjects] = useState([{
        name: 'Happy',
        image: happy,
        link: '',
        description: '',
    },
    {
        name: 'OnePage',
        image: onePage,
        link: '',
        description: ''
    },
    {
        name: 'Quark',
        image: quark,
        link: '',
        description: ''
    },
    {
        name: 'Podcastr',
        image: podcastr,
        link: '',
        description: ''
    }
])

    return (
        <section className={Styled.content_projects}>
            <Title title="Projetos" subTitle="Veja soluções já desenvolvidas"/>
            <section className={Styled.group_projects}>
                <Project fullScreen={ true } key={ 0 } value={ {
                    name: 'Dashboard',
                    image: happy,
                    link: '',
                    description: 'Projeto desenvolvido durante evento da online da Rocktseat #NLW',
                } }/>
                <div className={ Styled.slider_group }>
                    { projects.length > 0 ? projects.map(( project, index:number )=>{
                        return <Project key={ index } value={ project }/>
                    }) : ''}
                </div>
            </section>
        </section>
    )
}

export default Projects