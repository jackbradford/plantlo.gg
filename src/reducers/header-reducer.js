import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    TOGGLE_MENU,
} from '../actions';

export default function header(

    state = {
        menuExpand: false,
    },
    action
) {

    switch (action.type) {

        case TOGGLE_MENU:
            return {
                ...state,
                menuExpand: !state.menuExpand
            };

        default:
            return state;
    }
}

