/**
 * This file provides the container component for the Root component.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Root from '../component/root';
import {
    checkUserIsLoggedIn,
    tryLoadPlants,
} from '../actions';

const mapStateToProps = function(state) {

    console.log("STATE");
    console.log(state);
    return {

        user: state.user,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        checkUserIsLoggedIn: () => {
            dispatch(checkUserIsLoggedIn())
        },
        loadPlants: (userId) => {
            dispatch(tryLoadPlants(userId));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);


