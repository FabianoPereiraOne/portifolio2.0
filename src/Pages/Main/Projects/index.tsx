import Project from '../../../Components/Project'
import Styled from './projects.module.css'
import Title from '../../../Components/Title'
import { useState, useRef, useEffect, ElementRef} from 'react'
import happy from '../../../assets/happy.png'
import onePage from '../../../assets/onePage.png'
import quark from '../../../assets/quark.png'
import podcastr from '../../../assets/podcastr.png'
import google_glass from '../../../assets/google-glass.png'
import { ProjectProps } from '../../../types/ProjectProps'

function Projects() {
    const [projects, setProjects] = useState<ProjectProps[]>([{
        name: 'Happy',
        image: happy,
        link: '',
        description: '',
        isActive: false
    },
    {
        name: 'OnePage',
        image: onePage,
        link: '',
        description: '',
        isActive: false
    },
    {
        name: 'Quark',
        image: quark,
        link: '',
        description: '',
        isActive: false
    },
    {
        name: 'Happy',
        image: happy,
        link: '',
        description: '',
        isActive: false
    },
    {
        name: 'OnePage',
        image: onePage,
        link: '',
        description: '',
        isActive: false
    },
    {
        name: 'Quark',
        image: quark,
        link: '',
        description: '',
        isActive: false
    },
    {
        name: 'Podcastr',
        image: podcastr,
        link: '',
        description: '',
        isActive: true
    },
    {
        name: 'Google Glass',
        image: google_glass,
        link: '',
        description: '',
        isActive: false
    },
    {
        name: 'Google Glass',
        image: google_glass,
        link: '',
        description: '',
        isActive: false
    },
    {
        name: 'Google Glass',
        image: google_glass,
        link: '',
        description: '',
        isActive: false
    },
    ])
    const carouselRef = useRef<HTMLDivElement>(null)

    const handleScrollRight = (divRef:HTMLDivElement) =>{
        let c = 0
        const intervalo = setInterval(()=>{
            c += 10
            if(c < 320){
                divRef.scrollLeft += 10.5
            }else{
                clearInterval(intervalo)
            }
        },10)
    } 

    const handleScrollLeft = (divRef:HTMLDivElement) =>{
        let c = 0
        const intervalo = setInterval(()=>{
            c += 10
            if(c < 320){
                divRef.scrollLeft -= 10.5
            }else{
                clearInterval(intervalo)
            }
        },10)
    }

    const controllScroll = () =>{
        const divRef = carouselRef.current
        let controllDirection = 'left'

        if(divRef !== null){
            if(controllDirection === 'right'){ 
                handleScrollRight(divRef)
            }else{
                handleScrollLeft(divRef)
            }   
        }
    }

    const handleGetActive = (Array: ProjectProps[]) => {

        let activeElement = {
            name: '',
            image: '',
            link: '',
            description: '',
            isActive: false
        }

        Array.forEach((project) => {
            if (project.isActive) {
                activeElement = project
            }
        })

        return activeElement
    }

    useEffect(() => {
        setInterval(controllScroll,2000)
    }, [])

    return (
        <section className={Styled.content_projects}>
            <Title title="Projetos" subTitle="Veja soluções já desenvolvidas" />
            <section className={Styled.group_projects}>
                <Project fullScreen={true} key={0} value={handleGetActive(projects)} />
                <div ref={carouselRef} className={Styled.slider_group}>
                    {projects.length > 0 ? projects.map((project, index: number) => {
                        return project.isActive !== true && <Project key={index} value={project} />
                    }) : ''}
                </div>
            </section>
        </section>
    )
}

export default Projects