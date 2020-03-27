/**
 * This file provides the container component for the New Individual
 * page.
 *
 * plantlo.gg/plants/individuals/add
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewIndividual from '../component/new-individual';
import {
    toggleAddNewPlantCondition,
    trySubmitNewIndividual,
    updateNewIndividualField,
    updateNewIndividualNewCondition,
    updateRequiredFieldsForNewIndividual,
} from '../actions';

const mapStateToProps = function(state) {

    return {

        fields: state.newIndividual.fields,
        userData: state.user.data,
        appData: state.appData,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        handleNewCondition: (condition, field, value) => {
            dispatch(updateNewIndividualNewCondition(condition, field, value))
        },
        makeFieldsRequired: (array) => {
            dispatch(updateRequiredFieldsForNewIndividual('add', array))
        },
        makeFieldsNotRequired: (array) => {
            dispatch(updateRequiredFieldsForNewIndividual('remove', array))
        },
        submitToServer: (values) => {
            dispatch(trySubmitNewIndividual(values));
        },
        toggleAddNewPlantCondition: (fieldName) => {
            dispatch(toggleAddNewPlantCondition(fieldName))
        },
        updateField: (fieldName, value) => {
            dispatch(updateNewIndividualField(fieldName, value))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewIndividual);

