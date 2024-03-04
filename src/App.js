import { Route, Routes ,Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import TokenContext from './store/tokenContext';

function App() {
  const authcntxt = useContext(TokenContext)
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!authcntxt.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
          {authcntxt.isLoggedIn && <Route path="/profile" element={<UserProfile />} />}
          {!authcntxt.isLoggedIn && <Route path="/profile" element={<AuthPage />} />}
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </Layout>
  );
}

export default App;
