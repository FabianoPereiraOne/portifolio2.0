import photo from '../../../Assets/myphoto.jpg'
import { ButtonPrimary } from '../../../Components/Global'
import Styled from './about.module.css'

function About(){
    return(
        <main className={ Styled.content_about }>
            <div className={ Styled.content_myphoto }>
                <img src={ photo } alt="Foto de Fabiano Pereira"/>
            </div>
            <article className={ Styled.about }>
                <h4>Sobre</h4>
                <strong>Desenvolvedor FrontEnd</strong>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                <ButtonPrimary>
                    Download Cv
                </ButtonPrimary>
            </article>
        </main>
    )
}

export default About