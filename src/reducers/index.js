import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header-reducer.js';
import register from './register-reducer.js';
import activate from './activate-reducer.js';
import user from './user-reducer.js';

export default combineReducers({
    activate,
    header,
    register,
    routing: routerReducer,
    user,
});

