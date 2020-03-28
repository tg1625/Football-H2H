  
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Home from './containers/Home.js';
import Header from './components/Header.js';

import './App.css'

function App() {
  return (
    <div className="siteWrapper">
      <Header/>
      <Router>
        <Switch>
          <Route path="/">
            <Home/>
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;