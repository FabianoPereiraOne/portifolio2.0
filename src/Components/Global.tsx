import styled from 'styled-components'


type progress = {
    progressValue: number;
    as?: React.ElementType | keyof JSX.IntrinsicElements;
  };

export const ProgressBar = styled.span<progress>`
    width: 4rem;
    height: 100%;
    border-radius: 1rem;
    background-color: var(--blue-normal);
    position: absolute;
    left: ${ props => props.progressValue }%;
    top: 0;
    transition: 0.35s;
`