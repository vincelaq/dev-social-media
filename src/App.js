import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Nav from './components/Nav';
import Landing from './components/Landing';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

const App = () => {
  const { token, login, logout, user } = useAuth();

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
