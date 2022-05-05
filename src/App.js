import React, { useEffect, useState } from 'react';
import './App.css';
import SelectThiefNFT from './Components/SelectThiefNFT';
import { CONTRACT_ADDRESS, transformPlayerData } from './constants';import thiefABIJson from './utils/Thief.json';
import { ethers } from 'ethers';

// Constants

const App = () => {
  // store user's public address
  const [currentAccount, setCurrentAccount] = useState(null);

  const [thiefNFT, setThiefNFT] = useState(null);

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

  // Render Methods
  const renderContent = () => {
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      );
      /*
      * Scenario #2
      */
    } else if (currentAccount && !thiefNFT) {
      return <SelectThiefNFT setThiefNFT={setThiefNFT} />;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    const checkNetwork = async () => {
      try { 
        if (window.ethereum.networkVersion !== '4') {
          alert("Please connect to Rinkeby!")
        }
      } catch(error) {
        console.log(error)
      }
    }
  }, []);


  useEffect(() => {

    const fetchNFTMetadata = async () => {
      console.log('Checking for Thief NFT on address:', currentAccount);
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        thiefABIJson.abi,
        signer
      );
  
      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.clan) {
        console.log('User has Thief NFT');
        setThiefNFT(transformPlayerData(txn));
      } else {
        console.log('No character NFT found');
      }
    };
  
    // We only want to run this, if we have a connected wallet
    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Thievary NFT Game</p>
          <p className="sub-text">Can you steal the most daggers?</p>
          {renderContent()}
        </div>
        <div className="footer-container">
        </div>
      </div>
    </div>
  );
};

export default App;
