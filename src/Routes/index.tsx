import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from '../Pages/Login'
import { Projects } from '../Pages/Projects'
import { Error } from '../Pages/Error'
import { Project } from '../Pages/Project'
import Router from './Router'
import Main from '../Pages/Main'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Router exact path="/" isPrivate={false} component={Main} />
        <Router
          exact
          path="/login"
          lockRepeatLogin={true}
          isPrivate={false}
          component={Login}
        />
        <Router
          exact
          path="/dashboard/projects"
          isPrivate={true}
          component={Projects}
        />
        <Router
          exact
          path="/projects/:id"
          isPrivate={false}
          component={Project}
        />
        <Router path="*" isPrivate={false} component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
