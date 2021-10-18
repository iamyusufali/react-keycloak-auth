import './App.css';

import { AppContextProvider } from './context/App.context';
import Home from './Home';

function App() {
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  );
}

export default App;
