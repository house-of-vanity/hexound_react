import { createStore, applyMiddleware  } from 'redux';
import reduxThunk from 'redux-thunk';
import { palayerRedusers } from './redusers';

export const store = createStore(palayerRedusers, applyMiddleware(reduxThunk));