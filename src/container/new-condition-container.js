/**
 * This file provides the container component for the Activation page.
 * plantlo.gg/activate
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewCondition from '../component/new-condition';
import {
    updateNewIndividualNewCondition,
} from '../actions';

const mapStateToProps = function(state, ownProps) {

    return {

        conditionName: ownProps.conditionName,
        field: state.newIndividual.fields[ownProps.conditionName],
        labelPlaceholder: ownProps.labelPlaceholder,
        descriptionPlaceholder: ownProps.descriptionPlaceholder,
        appData: state.appData,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        handleNewCondition: (condition, field, value) => {
            dispatch(updateNewIndividualNewCondition(condition, field, value))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCondition);

