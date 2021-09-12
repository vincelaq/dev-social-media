import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Nav from './components/Nav';
import Landing from './components/Landing';
import { AuthContext } from './context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  
  
  let routes;

  if (isLoggedIn) {
    routes = (
      <Nav />
    );
  } else {
    routes = (
      <Landing />
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
