/**
 * This file provides the container component for the header.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../component/header';
import {
    attemptLoginRequest,
    resetLoginMessage
} from '../actions';

const mapStateToProps = function(state) {

    return {

        loginMessage: state.header.loginMessage,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        onLoginClick: () => {

            dispatch(attemptLoginRequest());
        },
        resetLoginMessage: () => {

            dispatch(resetLoginMessage());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
