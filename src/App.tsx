import Routes from './Routes'
import { PortfolioProvider } from './contexts'

function App() {
  return (
    <PortfolioProvider>
      <Routes/>
    </PortfolioProvider>
  );
}

export default App;
