import { useState, useRef } from 'react';
import jsonData from './Tabledata';
import './common.css';

const SignUp = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const confirmPassword = useRef();

  const handleSubmit = () => { 
    var persons = JSON.parse(localStorage.getItem('myusers'));
    let validate = validateForm();
    if(persons !== null) {
       let verifyUsers = verifyUser(persons);
       if(verifyUsers === false) {
         return;
       }
    }
    if(password === confirmPassword.current.value && validate === true) {
       if(persons === null) {
          let data = new Object();
          data[0] = {'username': username, 'password': password}; 
          localStorage.setItem('myusers', JSON.stringify(data));
       }  
       else {
          let length = Object.getOwnPropertyNames(persons).length;
          let data = new Object();
          data[length] = {'username': username, 'password': password};
          let details = {...persons, ...data};console.log(details);
          localStorage.setItem('myusers', JSON.stringify(details)); 
       }
       localStorage.setItem('data', jsonData);
       localStorage.setItem('isAuthenticated', true);
       window.open('/dashboard','_self');
    }
    else if(validate === true){
      setError("Password is not matched");
    }
  };

  const validateForm = (check = true) => {
    if(username === '' || password === '') {
       check = false;
       setError('Invalid username or password');
    }
    else {
       setError(false);
    }

    return check;
  };

  const verifyUser = (persons, check = true) => {
     Object.values(persons).some(value => {
       if(value.username === username && password === value.password) {
          setError("User already exists"); 
          check = false;
       }
     }); 
     return check;
  };

  const login = () => {
    window.open("/login", "_self");
  }

  return (
     <div className = "sign-page">
      <form id = "sign-up-form">
        <h1>Create Account</h1>
        <div className = "sign-username">
          <label>Username:</label>
          <input type ="text" value = {username} onChange = {(e) => setUsername(e.target.value)} />
        </div>
        <div className = "sign-password">
          <label>Password:</label>
          <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} />
        </div>
        <div className = "sign-confirm">
          <label>Confirm password:</label>
          <input type = "password" ref = {confirmPassword} />         
        </div>
        {error !== false &&
           <div className = "error-sign">{error}</div>
        }
        <button type = "button" onClick = {handleSubmit}>Sign up</button>
        <p>Already have an account?</p>
        <button type = "button" onClick = {() => login()}>Login</button>
     </form>
   </div>
  );  
};

export default SignUp;
