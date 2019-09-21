import React from 'react';
import Footer from './components/Footer.js';
import SearchForm from './containers/SearchForm.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <SearchForm />
      <Footer />
    </div>
  );
}

export default App;
