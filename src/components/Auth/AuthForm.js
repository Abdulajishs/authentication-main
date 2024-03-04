import { useRef, useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let enteredEmail = emailRef.current.value;
    let enteredPassword = passwordRef.current.value;

    addUserHandler(enteredEmail, enteredPassword)
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  const addUserHandler = async (enteredEmail, enteredPassword) => {
    try {
      setIsLoading(true);
    let url;
    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAESowVGGv_4Mq7XTA0KSKy-_wQQFYIVOQ"
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAESowVGGv_4Mq7XTA0KSKy-_wQQFYIVOQ"
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    setIsLoading(false)
    
    const data = await response.json();
    
    if (response.ok) {
      console.log(data);
    } else {
      let errorMessage = 'Authentication failed!'
      // const data = await response.json();
      // if (data && data.error && data.error.message) {
      //   errorMessage = data.error.message
      // }
      throw new Error(errorMessage)
    }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
