import { BrowserRouter, Switch } from 'react-router-dom'
import Route from './Route'
import Home from '../Pages/Home'

function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/" isPrivate={ false } component={ Home }/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes