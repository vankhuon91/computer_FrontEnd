import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


import Home from './pages/Home'
import Login from './pages/Login'

import fakeAuth from './components/auth'

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
       <PrivateRoute  path="/">
          <Home />
        </PrivateRoute>
       </Switch> 
      </Router>

    </div>
  );
}

export default App;
