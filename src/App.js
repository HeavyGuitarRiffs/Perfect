import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSDK } from '@metamask/sdk-react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NFTGallery from './components/NFTGallery';
import EmailPasswordForm from './components/EmailPasswordForm';
import './App.css';

const App = () => {
  const [account, setAccount] = useState(null);
  const { connected, connect } = useSDK();

  const handleConnect = async () => {
    try {
      const accounts = await connect();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(20); // Increase the limit to 20 listeners

function listener() {
  console.log('Event triggered');
}

emitter.on('event', listener);

// Later, when you no longer need the listener
emitter.removeListener('event', listener);
// Or use emitter.off('event', listener) in Node.js v10 and later



  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My App</h1>
          <button onClick={handleConnect}>
            {connected ? 'Connected' : 'Connect to MetaMask'}
          </button>
          {connected && <div>Connected account: {account}</div>}
          <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/email-password-form" element={<EmailPasswordForm />} />
            <Route path="/nft-gallery" element={<NFTGallery />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;


