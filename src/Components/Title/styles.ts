import styled from 'styled-components'

export const Container = styled.div`
  width: auto;
  max-width: 100%;
  min-height: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Title = styled.h2`
  text-transform: uppercase;
  font-weight: bold;
  color: var(--blue-light);
  font-size: 2rem;
  position: relative;

  &::after {
    content: '';
    width: 90%;
    height: 0.1rem;
    background-color: var(--white-normal);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 0;
  }
`
export const SubTitle = styled.h5`
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
  max-width: 15rem;
  color: var(--gray-normal);
  text-transform: uppercase;
`
