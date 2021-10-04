import styled from 'styled-components'
import { Link } from 'react-router-dom'

type progress = {
  progressValue: number;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
};

type SkillProgressBarProps = {
  value: number;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
};


type TitleProps = {
  valuePositionRight: number;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
};

type ProjectProps = {
  url: string;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
};


export const ProgressBar = styled.span<progress>`
    width: 4rem;
    height: 100%;
    border-radius: 1rem;
    background-color: var(--blue-normal);
    position: absolute;
    left: ${props => props.progressValue}%;
    top: 0;
    transition: 0.35s;
`

export const ButtonPrimary = styled.button`
  width: 13rem;
  height: 3rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  color: var(--white-light);
  text-align: center;
  border-radius: 0.2rem;
  transition: 0.3s;
  background: linear-gradient(
    90deg,
    rgba(44, 157, 219, 1) 0%,
    rgba(20, 132, 193, 1) 35%,
    rgba(0, 109, 168, 1) 100%
  );
  border: none;
`

export const Title = styled.h4<TitleProps>`
font-size: 1.5rem;
color: var(--gray-normal);
text-transform: uppercase;
position: relative;
text-align: center;

    &::after {
      content: "";
      width: 2.3rem;
      height: 0.2rem;
      background-color: var(--orange-light);
      filter: blur(2px);
      position: absolute;
      right: ${ props => props.valuePositionRight }%;
      top: 50%;
    }
`

export const ContainerProgressBar =  styled.div`
width: 15rem;
height: 1rem;
background-color: var(--white-normal);
border-radius: 2rem;
display: inline-block;
`

export const SkillProgressBar = styled.div<SkillProgressBarProps>`
width: ${ props => props.value }%;
height: 100%;
background-color: var(--blue-light);
border-radius: 2rem;
`

export const Project = styled( Link )<ProjectProps>`


`