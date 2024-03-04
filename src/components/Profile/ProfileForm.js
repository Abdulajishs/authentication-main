import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import TokenContext from '../../store/tokenContext';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const newPasswordRef = useRef("");
  const authcntxt = useContext(TokenContext);
  const history = useNavigate()

  const token = authcntxt.token

  const changePasswordhandler = async (password) => {
    let url ="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAESowVGGv_4Mq7XTA0KSKy-_wQQFYIVOQ"
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        history('/')
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

  const submitHandler = (event) => {
    event.preventDefault();
    changePasswordhandler(newPasswordRef.current.value)
    newPasswordRef.current.value = "";
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}> 
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
