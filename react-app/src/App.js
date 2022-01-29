import './App.css';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';

// Test react Router 
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
// Fin test react router

// TestMap //
import News from "./pages/News/News";
// TestMap //

// Test form
import TestFormulaire from './components/TestFormulaire/TestFormulaire';
// fin test form

import { useState } from 'react';



function App() {

  const [isNotLogged, setLoggedOrNot] = useState(true);


  // Test d'envoyer le token dans le header

  let getToken = JSON.parse(localStorage.getItem('commandSignin'));

  // Fin de test 
  if (isNotLogged === true) {
    if (!getToken) {
      console.log("Ca fonctionne pas")
    } else {

      fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Authorization': getToken[0].token
        },
      })
        .then(response => response.json())
        .then((response) => {
          if (response.id) {
            setLoggedOrNot(false);
          }
        });
    }

  }


  return (
    <div className="App">
      <Header isNotLogged={isNotLogged} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isNotLogged ? <Home /> : <News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;