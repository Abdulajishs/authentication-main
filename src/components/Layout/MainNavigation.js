import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import TokenContext from '../../store/tokenContext';

const MainNavigation = () => {
  const cntx = useContext(TokenContext);

  const isLoggedIn = cntx.isLoggedIn;

  const removerHandler = (event)=>{
    event.preventDefault()
    cntx.removeToken(cntx.token)
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
          {isLoggedIn && (
          <>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <button onClick={removerHandler}>Logout</button>
          </li>
          </>)
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
