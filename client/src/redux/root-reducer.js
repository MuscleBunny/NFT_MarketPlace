import { combineReducers } from 'redux';
import { reducer as wallet } from './WalletRedux';

const reducers = combineReducers({
  wallet,
});

export default reducers;
