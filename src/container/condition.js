/**
 * This file provides the container component for the Activation page.
 * plantlo.gg/activate
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Condition from '../component/condition';
import {
    toggleAddNewPlantCondition,
    updateNewIndividualNewCondition,
} from '../actions';

const mapStateToProps = function(state) {

    return {

        condition: this.props.condition,
        field: state.newIndividual.fields[this.props.condition],
        fields: state.newIndividual.fields,
        image: this.props.condition.image,
        name: this.props.name,
        newCondition: this.props.condition.newCondition,
        userData: state.user.data,
        appData: state.appData,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        toggleAddNewPlantCondition: (fieldName) => {
            dispatch(toggleAddNewPlantCondition(fieldName))
        },
        handleNewCondition: (condition, field, value) => {
            dispatch(updateNewIndividualNewCondition(condition, field, value))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Condition);

