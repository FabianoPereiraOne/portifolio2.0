import styled from 'styled-components'

export const ProjectCard = styled.button<{ image:string }>`
width: 19rem;
height: 10rem;
background: url(${ props => props.image });
border: none;
background-position: center;    
background-repeat: no-repeat;
background-size: cover;
box-shadow: 0px 0px 5px #ccc;
flex: none;
transition: all 0.3s;
&:hover{
    transform: translateY(-0.4rem);
}
`