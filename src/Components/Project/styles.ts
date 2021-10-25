import styled from 'styled-components'

export const ProjectCard = styled.button<{ fullScreen?:boolean, image:string }>`
${ props => props.fullScreen ? `
    width: 80%;
    height: 70vh;
    margin: 0 auto;
` :
 `
    width: 19rem;
    height: 10rem;
    &:hover{
        transform: scale(1.1,1.1);
    }
`}
background: url(${ props => props.image });
border: none;
background-position: center;    
background-repeat: no-repeat;
background-size: cover;
box-shadow: 0px 0px 5px #ccc;
flex: none;
transition: all 0.3s;
`