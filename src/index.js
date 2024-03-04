import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import TokenContextProvider from './store/tokenContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </TokenContextProvider>
);
