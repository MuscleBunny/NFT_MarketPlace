import React from 'react';
import WalletActions, { WalletSelectors } from '../redux/WalletRedux';
import Button from '@material-ui/core/Button';

function SelectWallet() {
    function connectWallet() {

    }
    return (
      <div>
        <Button
            onClick={connectWallet}
        >
            ConnetWallet
        </Button>
      </div>
    );
}

export default SelectWallet;