import { Route, Redirect } from 'react-router-dom'
import { usePortfolioContext } from '../contexts'

type Props = {
  component: any
  isPrivate: boolean
  exact?: boolean
  path: string
  lockRepeatLogin?: boolean
}

function Router({
  component: Component,
  isPrivate,
  lockRepeatLogin,
  ...rest
}: Props) {
  const useContext = usePortfolioContext()

  if (!useContext.signed && isPrivate) {
    return <Redirect to="/login" />
  }

  if (lockRepeatLogin && useContext.signed) {
    return <Redirect to="/dashboard/projects" />
  }

  return <Route {...rest} render={props => <Component {...props} />} />
}

export default Router
