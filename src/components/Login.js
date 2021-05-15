import React, { useState, useEffect } from "react";
import axios from 'axios'
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const initialFormValues = {
  username: '',
  password: '',
}

const Login = (props) => {
  const [formValues, setFormValues]= useState(initialFormValues)
  const [error, setError] = useState('')
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = (e) => {
    setFormValues({...formValues,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', formValues)
    .then(res => {
      console.log('res:', res)
      //res.data.payload gives us token
      localStorage.setItem('token', res.data.payload)
      props.history.push('/protected/bubbles')
    })
    .catch(err =>{
      console.log({'err:': err.response.data})
      handleErrors()
    });
  }

  const handleErrors = () => {
    if (
      formValues.username !== "Lambda School" ||
      formValues.password !== "i<3Lambd4"
    )
    setError("Username or Password not valid")
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
      </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input data-testid="username" type='text' name='username' value={formValues.username} onChange={handleChange} id='username' placeholder='Username..' />
          <label htmlFor='password'>Password</label>
          <input data-testid="password" type='password' name='password' value={formValues.password} onChange={handleChange} id='password' placeholder='Password..' />
          <button>Enter Bubble Site!</button>
        </form>


      <p data-testid="errorMessage" className="error" >{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.