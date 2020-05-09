import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import 'materialize-css';



function App() {
  const isAuthenticated = !!localStorage.getItem('user') || false;
  const routes = useRoutes(isAuthenticated);
  return (
    <Router>
      {routes}
    </Router>

  )
}

export default App;
