import { createReducer, createActions } from 'reduxsauce';

/* --------------------- Types and Action Creators ---------------- */
const { Types, Creators } = createActions({
  setCurrentAccount: ['currentAccount'],
});

Creators.connect = () => {
  return async dispatch => {
    const { ethereum } = window;
    if ( !ethereum ) {
      console.log("Make sure you have MetaMask.");
      return 0;
    }
    try {
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("Account Address:", accounts[0]);
      dispatch(Creators.setCurrentAccount(accounts[0]));
      return 1;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };
};

Creators.disconnect = () => {
  return async (dispatch) => {
    dispatch(Creators.setCurrentAccount(null));
  };
};

export default Creators;

/* --------------------- Selectors ---------------- */
export const AccountSelectors = {
  selectAccount: state => state.wallet.currentAccount,
};

/* --------------------- Initial State ----------------- */
export const INITIAL_STATE = {
  currentAccount: null,
};

/* ------------------- Reducers --------------------- */
export const setCurrentAccount = (state, { currentAccount }) => ({
  ...state,
  currentAccount
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CURRENT_ACCOUNT]: setCurrentAccount,
});
