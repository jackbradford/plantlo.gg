import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import activate from './activate-reducer.js';
import appData from './app-data-reducer.js';
import header from './header-reducer.js';
import newIndividual from './new-individual-reducer.js';
import register from './register-reducer.js';
import user from './user-reducer.js';

export default combineReducers({
    activate,
    appData,
    header,
    newIndividual,
    register,
    routing: routerReducer,
    user,
});

