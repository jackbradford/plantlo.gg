import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header-reducer.js';
import register from './register-reducer.js';

export default combineReducers({
    header,
    routing: routerReducer,
    register,
});

