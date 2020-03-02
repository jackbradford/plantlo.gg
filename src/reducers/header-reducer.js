import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    RESET_MENU_EXPAND,
    TOGGLE_MENU,
} from '../actions';

export default function header(

    state = {
        menuExpand: false,
    },
    action
) {

    switch (action.type) {

        case RESET_MENU_EXPAND:
            return {
                ...state,
                menuExpand: false,
            };
        case TOGGLE_MENU:
            return {
                ...state,
                menuExpand: !state.menuExpand
            };

        default:
            return state;
    }
}

