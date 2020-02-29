import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    LOAD_PLANTS_BEGIN,
    LOAD_PLANTS_END,
    LOAD_PLANTS_ERROR
} from '../actions';

export default function plants(

    state = {
        error: null,
        loading: false,
        individuals: [],
        varieties: [],
    },
    action
) {

    switch (action.type) {

        case LOAD_PLANTS_BEGIN:
            return {
                ...state,
                error: null,
                loading: true,
            };

        case LOAD_PLANTS_END:
            console.log("STATE");
            console.log(state);
            return {
                ...state,
                loading: false,
                individuals: action.payload.individuals,
                varieties: action.payload.varieties,
            };

        case LOAD_PLANTS_ERROR:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };
        default:
            return state;
    }
}

