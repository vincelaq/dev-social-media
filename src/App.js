import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Nav from './components/Nav';
import Landing from './components/Landing';
import { AuthContext } from './context/auth-context';

const App = () => {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState(false)
  
  const login = useCallback((user, token) => {
    setToken(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);
  
  
  let routes;

  if (token) {
    routes = (
      <Nav />
    );
  } else {
    routes = (
      <Landing />
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, user: user, login: login, logout: logout }}>
      <Router>
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
