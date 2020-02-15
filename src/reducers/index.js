import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import test from './test';
import testtwo from './testtwo';
import header from './header-reducer.js';

export default combineReducers({
    test,
    testtwo,
    header,
    routing: routerReducer
});

