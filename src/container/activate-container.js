/**
 * This file provides the container component for the Activation page.
 * plantlo.gg/activate
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Activate from '../component/pages/activate';
import {
    attemptActivateUser,
    attemptGenerateNewActivationLink,
    resetGenerateNewActivationLink
} from '../actions';

const mapStateToProps = function(state) {

    return {

        activationCode: state.activate.activationCode,
        error: state.activate.error,
        isActivating: state.activate.isActivating,
        serverMessage: state.activate.serverMessage,
        success: state.activate.success,
        userId: state.activate.userId,
        newLink: state.activate.newLink,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        attemptActivateUser: (userId, activationCode) => {
            dispatch(attemptActivateUser(userId, activationCode))
        },
        attemptGenerateNewActivationLink: (userId) => {
            dispatch(attemptGenerateNewActivationLink(userId));
        },
        resetGenerateNewLink: () => {
            dispatch(resetGenerateNewActivationLink());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Activate);

