import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import { Link } from 'react-router';
import Shelter from './components/shelter_info.js';

function App() {
  return (
      <div className="shelters">
        <Shelter
            Name={"Example Shelter "}
            Address={"Green Eggs and Ham Avenue, Portland, OR 97660"}
            Website={"google.com"}
            Resources={["Housing", "Clothing", "Medical Services"]}
            Contact={"(503)-123-4567"}
        />

      </div>
  );
}

export default App;







/*
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to="../pages/shelters.js">Shelters</Link>
      </header>
    </div>


 */