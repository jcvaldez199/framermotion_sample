import React from 'react';
import './App.css';
import { Animator } from './components/Animator';
import { Spinner } from './components/Spinner';
import { Transitioner } from './components/Transitioner';

function App() {
  return (
    <div className="App">
      {true && <Animator/>}
      {false && <Transitioner/>}
    </div>
  );
}

export default App;
