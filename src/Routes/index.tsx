import { BrowserRouter, Switch } from 'react-router-dom'
import Router from './Router'
import Home from '../Pages/Home'

function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Router exact path="/" isPrivate={ false } component={ Home }/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes