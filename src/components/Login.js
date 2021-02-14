import { useState } from 'react';
import jsonData from './Tabledata';
import './common.css';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);


  const handleSubmit = () => {
    let formError = validateForm();
    if(formError === true) {
       let users = JSON.parse(localStorage.getItem('myusers'));
       if(users !== null) {
          let check = Object.values(users).some(value => {
                        if(username === value.username && password === value.password) {
                           return true;
                        }          
                      });
          if(check) {
             setError(false);
             localStorage.setItem('isAuthenticated', true);
             localStorage.setItem('data', jsonData);
             window.open('/dashboard', '_self'); 
          } 
          else {
             setError('User doesnot exist');
          }
       }
       else {
          setError('No user is added yet');
       } 
    }
  };

  const validateForm = (check = true) => {
    if(username === '' || password === '') {
       check = false;
       setError('Login credentials should not be null');
    }
     
    return check;
  };

  return (
    <div className = "login-page">
     <form id = "login-form">
      <h1>Login</h1>
      <div className = "username-login">
        <label>Username:</label>
        <input type ="text" value = {username} onChange = {(e) => setUsername(e.target.value)} />
      </div>
      <div className = "password-login">
        <label>Password:</label>
        <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} />
      </div>
      {error !== false && 
        <div className = "error-login">{error}</div>  
      }
      <button type = "button" onClick = {handleSubmit}>Submit</button>
    </form> 
   </div>
  );  
};

export default Login;
