import React, { Component } from 'react';
import flower from './flower.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={flower} className="App-logo" alt="logo" />
          <p>coming soon!!</p>
        </header>
      </div>
    );
  }
}

export default App;
