import React from 'react';
import ReactDOM from 'react-dom/client';
import { MetaMaskProvider } from '@metamask/sdk-react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MetaMaskProvider sdkOptions={{ dappMetadata: { name: 'Your Dapp Name', url: window.location.href } }}>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);

reportWebVitals(console.log);
