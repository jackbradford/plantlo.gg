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
} from '../actions';

const mapStateToProps = function(state, ownProps) {

    return {

        condition: ownProps.condition,
        field: state.newIndividual.fields[ownProps.name],
        fields: state.newIndividual.fields,
        image: ownProps.condition.image,
        name: ownProps.name,
        newCondition: ownProps.condition.newCondition,
        userData: state.user.data,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        toggleAddNewPlantCondition: (fieldName) => {
            dispatch(toggleAddNewPlantCondition(fieldName))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Condition);

