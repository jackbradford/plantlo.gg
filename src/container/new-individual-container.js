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
    updateRequiredFieldsForNewIndividual,
} from '../actions';

const mapStateToProps = function(state) {

    return {

        fields: state.newIndividual.fields,
        userData: state.user.data,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        makeFieldsRequired: (array) => {
            dispatch(updateRequiredFieldsForNewIndividual('add', array))
        },
        makeFieldsNotRequired: (array) => {
            dispatch(updateRequiredFieldsForNewIndividual('remove', array))
        },
        toggleAddNewPlantCondition: (fieldName) => {
            dispatch(toggleAddNewPlantCondition(fieldName))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewIndividual);

