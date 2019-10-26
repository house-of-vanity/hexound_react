import { createStore } from 'redux';
import { palayerRedusers } from './redusers';
export const store = createStore(palayerRedusers);