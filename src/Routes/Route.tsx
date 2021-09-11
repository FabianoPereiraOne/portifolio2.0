import { Router, Redirect } from 'react-router-dom'

type Props = {
    component: ()=> JSX.Element,
    isPrivate: boolean,
    exact: boolean,
    path: string,
}

function Route({
    component: Component,
    isPrivate,
    ...rest
}:Props){

    const signed = false

    if(!signed && isPrivate){
        return <Redirect to="/private/login"/>
    }

    return(
        <Router { ...rest } render={ props =>{
            return  <Component { ...props }/> 
        }}/>
    )
}

export default Route