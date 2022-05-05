import React, { useEffect, useState } from 'react';
import './App.css';

// Constants

const App = () => {
  // store user's public address
  const [currentAccount, setCurrentAccount] = useState(null);

  // make sure user has a wallet
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        // Check if we're authorized to access the user's wallet
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        // Grab the first authorized account
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      // request access to account
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Thievary NFT Game</p>
          <p className="sub-text">Can you steal the most daggers?</p>
          <div className="connect-wallet-container">
            <button
                className="cta-button connect-wallet-button"
                onClick={connectWalletAction}
              >
                Connect Wallet To Get Started
              </button>
          </div>
        </div>
        <div className="footer-container">
        </div>
      </div>
    </div>
  );
};

export default App;
