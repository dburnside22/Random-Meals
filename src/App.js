import React from 'react';
import './App.scss';
import logo from './assets/logo.png';
import Recipes from './components/Recipes/Recipes';

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt='Background of food'/>

      </div>
      <Recipes></Recipes>

    </div>
  );
}

export default App;
