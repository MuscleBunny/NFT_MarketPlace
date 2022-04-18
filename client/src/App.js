import React, { useState, useEffect } from 'react';
import AccountActions, { AccountSelectors } from './redux/WalletRedux';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import Home from './pages/home'
import './App.css';

function App() {
  const dispatch = useDispatch();
  const curAccount = useSelector(AccountSelectors.selectAccount);
  
  const checkWalletIsConnected = () => {
    const {ethereum} = window;
    if ( !ethereum ) {
      console.log("Make sure u have installed MetaMask.");
      return;
    }
    console.log("ready to go", ethereum.isConnected());
  }

  const connectWallet = () => {
    dispatch(AccountActions.connect());
  }

  const disconnectWallet = () => {
    dispatch(AccountActions.disconnect());
  }

  useEffect( ()=> {
    checkWalletIsConnected();
  }, []);
  return (
    <div>
      <button
          onClick={ curAccount ? disconnectWallet : connectWallet }
      >
        {
          curAccount ? 'DisconnectWallet' : 'ConnectWallet'
        }
      </button>
    </div>
  );
}

export default App;
