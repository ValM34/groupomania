import './App.css';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Header from './components/Header/Header';

import { useState } from 'react';



function App() {

  const [isNotLogged, setLoggedOrNot] = useState(true);

  const modifyLoggedOrNot = () => {
    if (isNotLogged === true) {
      setLoggedOrNot(false);
    } else {
      setLoggedOrNot(true);
    }
  }
  
  return (
    <div className="App">
      <Header />
      <button onClick={modifyLoggedOrNot}>Connexion test</button>
      {isNotLogged ? <Home /> : <News />}
    </div>
  );
}

export default App;