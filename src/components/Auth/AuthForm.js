import { useRef, useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [error,setError] = useState(null);

  
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const addUserHandler=async (enteredEmail,enteredPassword)=>{
    try{
      const response =  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAESowVGGv_4Mq7XTA0KSKy-_wQQFYIVOQ",{
      method : "POST",
      body : JSON.stringify({
        email : enteredEmail,
        password :enteredPassword,
        returnSecureToken : true
      }),
      headers : {
        "Content-Type" : "application/json"
      }
    })

    const data = await response.json();
  if (data && data.error && data.error.message) {
    alert(data.error.message)
  }
    
    console.log(data);
    
    if (!response.ok) {
      throw new Error("sending request")
    }
  }
    catch(error){
      setError(error.message)
    }
  }

  const submitHandler = (event) =>{
    event.preventDefault();
    let enteredEmail = emailRef.current.value;
    let enteredPassword = passwordRef.current.value;

    addUserHandler(enteredEmail,enteredPassword)
    emailRef.current.value = "" ;
    passwordRef.current.value = "" ;
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
          { !error ? <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button> : <p>{error}</p> }
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
