import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import activate from './activate-reducer.js';
import header from './header-reducer.js';
import plants from './plant-reducer.js';
import register from './register-reducer.js';
import user from './user-reducer.js';

export default combineReducers({
    activate,
    header,
    plants,
    register,
    routing: routerReducer,
    user,
});

