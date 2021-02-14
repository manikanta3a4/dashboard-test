import {Route} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useContext } from 'react';
import Dashboard from './components/Dashboard';
import { AuthContext } from './App';

const AllRoutes = () => {

 let path = window.location.pathname;

 let isAuthenticated = useContext(AuthContext);

 if(isAuthenticated === null || isAuthenticated === 'false' && path === '/dashboard') {
    return <div>Not authenticated</div>
 }
 
 if(isAuthenticated === 'true' && (path === '/' || path === '/login')) {
    return <div>Already loggedin</div>
 }

 return ( 
 <> 
   <Route exact path = "/login" component = {Login} /> 
   <Route exact path = "/" component = {SignUp} />
   <Route exact path = "/dashboard" component = {Dashboard} /> 
 </>
 );
};

export default AllRoutes;
