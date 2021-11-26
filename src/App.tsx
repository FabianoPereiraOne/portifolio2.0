import Routes from './Routes'
import { PortfolioProvider } from './contexts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <PortfolioProvider>
      <ToastContainer autoClose={3000} limit={1} />
      <Routes />
    </PortfolioProvider>
  )
}

export default App
