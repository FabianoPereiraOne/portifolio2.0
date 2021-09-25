import { BrowserRouter, Switch } from 'react-router-dom'
import Router from './Router'
import Main from '../Pages/Main'

function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Router exact path="/" isPrivate={ false } component={ Main }/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes