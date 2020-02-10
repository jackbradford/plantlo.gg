import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import test from './test';
import testtwo from './testtwo';

export default combineReducers({
    test,
    testtwo,
    routing: routerReducer
});

