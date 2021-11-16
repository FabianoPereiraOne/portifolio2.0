import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from '../Pages/Login'
import { Skills } from '../Pages/Skills'
import { Projects } from '../Pages/Projects'
import Main from '../Pages/Main'
import Router from './Router'

function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Router exact path="/" isPrivate={ false } component={ Main }/>
            <Router exact path="/login" lockRepeatLogin={ true } isPrivate={ false } component={ Login }/>
            <Router exact path="/dashboard/skills"  isPrivate={ true } component={ Skills }/>
            <Router exact path="/dashboard/projects"  isPrivate={ true } component={ Projects }/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes