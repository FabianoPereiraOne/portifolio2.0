import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from '../Pages/Login'
import { Dashboard } from '../data'
import Router from './Router'
import Main from '../Pages/Main'

function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Router exact path="/" isPrivate={ false } component={ Main }/>
            <Router exact path="/login" lockRepeatLogin={ true } isPrivate={ false } component={ Login }/>
            <Router exact path="/dashboard"  isPrivate={ true } component={ Dashboard }/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes