import { Route, Redirect } from 'react-router-dom'

type Props = {
    component: any,
    isPrivate: boolean,
    exact: boolean,
    path: string,
}

function Router({
    component: Component,
    isPrivate,
    ...rest
}:Props){

    const signed = false

    if(!signed && isPrivate){
        return <Redirect to="/private/login"/>
    }

    return(
        <Route { ...rest } render={ props =>(
            <Component { ...props }/> 
        )}/>
    )
}

export default Router