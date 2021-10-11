import { TitleProps } from '../../types/TitleProps'
import * as G from './styles'

function Title({ title, subTitle }:TitleProps){
    return(
            <G.Container>
                <G.Title>{ title }</G.Title>
                <G.SubTitle>{ subTitle }</G.SubTitle>
            </G.Container>
    )
}

export default Title