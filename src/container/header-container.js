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
    resetLoginMessage,
    toggleMenu
} from '../actions';

const mapStateToProps = function(state) {

    return {

        loginMessage: state.user.loginRequest.message,
        menuExpand: state.header.menuExpand,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        attemptLogin: (history) => {

            dispatch(attemptLoginRequest(history));
        },
        resetLoginMessage: () => {

            dispatch(resetLoginMessage());
        },
        toggleMenu: () => {
        
            dispatch(toggleMenu());
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

