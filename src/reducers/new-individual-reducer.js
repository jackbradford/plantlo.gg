import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS,
    TOGGLE_ADD_NEW_PLANT_CONDITION,
} from '../actions';

const field = {
    error: null,
    isRequired: false,
    isValid: null,
    isValidating: false,
    message: '',
    serverData: {},
    value: null,
}

export default function newIndividual(

    state = {
        form: {
            isBeingSubmitted: false,
            submittedSuccessfully: null,
            hasErrors: false,
            error: null,
            message: '',
            email: null,
        },
        fields: {
            image: {...field, imagePath: null},
            nickname: field,
            serial: {...field, isRequired: true},
            family: field,
            genus: field,
            species: field,
            subspecies: field,
            variety: field,
            commonName: field,
            origin: field,
            description: field,
            light: {...field, newEntry: false},
            water: {...field, newEntry: false},
            temperature: {...field, newEntry: false},
            humidity: {...field, newEntry: false},
            soil: {...field, newEntry: false},
            fertilizer: {...field, newEntry: false},
        }
    },
    action
) {

    switch (action.type) {

        case TOGGLE_ADD_NEW_PLANT_CONDITION:
            var fieldName = action.payload.fieldName
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [fieldName]: {
                        ...state.fields[fieldName],
                        newEntry: !state.fields[fieldName].newEntry,
                    },
                },
            };

        case NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS:
            const fields = action.payload.requiredFields;
            const operation = action.payload.operation;
            if (operation !== 'add' && operation !== 'remove') {
                throw new Error('Operation must be `add` or `remove`.');
            }
            var newFields = {};
            for (var i=0 ; i<fields.length ; i++) {

                newFields[fields[i]] = {

                    ...state.fields[fields[i]],
                    isRequired: (operation === 'add') ? true : false,
                }
            }
            return {
                ...state,
                fields: {
                    ...state.fields,
                    ...newFields,
                }
            };

        default:
            return state;
    }
}

