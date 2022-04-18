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
  
  const checkWalletIsConnected = async () => {
    const {ethereum} = window;
    if ( !ethereum ) {
      console.log("Make sure u have installed MetaMask.");
      return;
    }
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    console.log("account changed", accounts, accounts.length);
    dispatch(AccountActions.setCurrentAccount( accounts && accounts.length>0 ? accounts[0] : "" ));
  }

  const connectWallet = () => {
    dispatch(AccountActions.connect());
  }

  const disconnectWallet = () => {
    dispatch(AccountActions.disconnect());
  }

  useEffect( ()=> {
    checkWalletIsConnected();
    const {ethereum} = window;
    ethereum.on('accountsChanged', async () => {
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("account changed", accounts, accounts.length);
      dispatch(AccountActions.setCurrentAccount( accounts && accounts.length>0 ? accounts[0] : "" ));
    });
    ethereum.on('connect', async (connectInfo) => {
      console.log("connect", connectInfo);
    });
    ethereum.on('disconnect', async (error) => {
      console.log("disconnect", error);
    });
    ethereum.on('chainChanged', async (chainID) => {
      console.log("chainChanged", chainID);
    });
    ethereum.on('message', async (message) => {
      console.log("message", message);
    });
  }, []);
  return (
    <div>
      <p>{curAccount}</p>
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
