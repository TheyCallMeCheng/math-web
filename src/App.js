import React, { Component } from "react";
import './App.css';
import Navigation from './components/Navigation'
import Mint from './components/Mint'
import Main from './components/Main'
import Gallery from './components/Gallery'
import Marketplace from './components/Marketplace'
import Rarity from "./components/Rarity";
import { Web3ReactProvider } from '@web3-react/core'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Web3 from 'web3'
function getLibrary(provider) {
  return new Web3(provider)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Bg-imgs"></div>
          <Web3ReactProvider getLibrary={getLibrary}>

            <Router>
              {/*<Navigation />*/}

                <Route exact path="/" component={Main} />
                <Route exact path="/Gallery" component={Gallery} />
                <Route exact path="/Marketplace" component={Marketplace} />
                <Route exact path="/Rarity" Component={Rarity} />
            </Router>
          </Web3ReactProvider>
      </header>
      
    </div>
  );
}

export default App;
