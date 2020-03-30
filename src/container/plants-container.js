/**
 * This file provides the container component for the Activation page.
 * plantlo.gg/activate
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Plants from '../component/pages/plants';
import {
    toggleAddNewPlantCondition,
} from '../actions';

const mapStateToProps = function(state, ownProps) {

    return {
        individuals: {
            data: this.user.data.individuals,
            filter: this.ui.individuals.filter,
            layout: this.ui.individuals.layout,
            sort: this.ui.individuals.sort,
        },
        taxa: {
            data: this.user.data.varieties,
            filter: this.ui.taxa.filter,
            layout: this.ui.taxa.layout,
            sort: this.ui.taxa.sort,
        },
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
)(Plants);

