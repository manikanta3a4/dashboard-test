import { BrowserRouter, Redirect } from "react-router-dom";
import AllRoutes from './routes.js';
import { useState, useContext, createContext } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';

export const AuthContext = createContext(null);

const App = () => {
  const checkAuthentication = () => {
    return localStorage.getItem('isAuthenticated');
  };

  const isAuthenticated = checkAuthentication();

  return (
    <AuthContext.Provider value = {isAuthenticated} > 
      <BrowserRouter>
        <>
         <AllRoutes></AllRoutes>
        </>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
