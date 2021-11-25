import styled from 'styled-components'

type progress = {
  progressValue: number
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

type SkillProgressBarProps = {
  value: number
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

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

export const ContainerProgressBar = styled.div`
  width: 100%;
  height: 1rem;
  background-color: var(--white-normal);
  border-radius: 2rem;
  display: inline-block;
`

export const SkillProgressBar = styled.div<SkillProgressBarProps>`
  width: ${props => props.value}%;
  height: 100%;
  background-color: var(--blue-light);
  border-radius: 2rem;
`
export const FeaturedProject = styled.div<{
  image: string
  as?: React.ElementType | keyof JSX.IntrinsicElements
}>`
width: 80%;
max-width: 1254px;
height: 80vh;
background: url(${props => props.image});
border: none;
background-position: center;    
background-repeat: no-repeat;
background-size: cover;
box-shadow: 0px 0px 5px #ccc;
position: relative;
overflow: hidden;
@media screen and (max-width: 600px) {
  height 40vh;
}
`

export const ButtonImage = styled.button<{ background: string }>`
  width: 15rem;
  height: 10rem;
  background: url(${props => props.background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 2rem;
  color: var(--gray-normal);
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover svg {
    opacity: 1;
  }

  @media screen and (max-width: 400px) {
    & {
      width: 100%;
    }
  }
`

export const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
`
export const ContainerFlexDiv = styled.div`
  flex: 1;
  min-height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--blue-normal);
    border-radius: 0.2rem;
  }
`

export const ContainerFlexForm = styled.form`
  flex: 1;
  min-height: 100vh;
  overflow-y: auto;
`

export const PanelViewDark = styled.ul`
  width: 100%;
  height: 80vh;
  background-color: var(--black-normal);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.2rem;
  overflow-y: auto;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--blue-light);
    border-radius: 0.2rem;
  }

  & span {
    color: var(--white-light);
    margin: auto;
    font-size: 1.3rem;
    font-weight: 500;
  }
`

export const ContainerRowColumn = styled.section`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 6rem);
  padding: 0 2rem;
  gap: 2rem;
  margin-top: 1rem;

  @media screen and (max-width: 1080px) {
    & {
      flex-direction: column;
    }
  }
`

export const RowDatas = styled.li`
  & {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & p {
    max-width: 25rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--white-normal);
    text-transform: capitalize;
    font-size: 1.1rem;
  }

  & button {
    width: 3rem;
    height: 2rem;
    border: none;
    background-color: var(--black-light);
    font-size: 1.5rem;
    color: var(--white-light);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.2rem;
    transition: 0.3s;
  }

  & button:hover {
    background-color: var(--blue-dark);
  }
`
