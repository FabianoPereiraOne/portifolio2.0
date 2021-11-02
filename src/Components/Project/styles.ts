import styled from 'styled-components'

export const ProjectCard = styled.div<{ image:string, width:number }>`
width: 100%;
height: 10rem;
background: url(${ props => props.image });
border: none;
background-position: center;    
background-repeat: no-repeat;
background-size: cover;
flex: none;
transition: all 0.3s;
@media screen and (max-width: 600px){
    height: 15rem;
}
`