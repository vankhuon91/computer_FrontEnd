import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Home from './pages/Home'
import Login from './pages/Login'
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route  path="/">
          <Home />
        </Route>
      </Router>

    </div>
  );
}

export default App;
