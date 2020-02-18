/**
 * This file provides the container component for the Register page.
 * plantlo.gg/register
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Register from '../component/pages/register';
import {
    attemptValidateFormField
} from '../actions';

const mapStateToProps = function(state) {

    console.log("STATE");
    console.log(state);
    return {

        email: state.register.fields.emailAddress,
        username: state.register.fields.username,
        password: state.register.fields.password,
        firstName: state.register.fields.firstName,
        lastName: state.register.fields.lastName,
    }
    /*
    return {

        emailIsValid: state.register.emailIsValid,
        usernameIsValid: state.register.usernameIsValid,
        passwordIsValid: state.register.passwordIsValid,
        passwordMatches: state.register.passwordMatches,
        firstNameIsValid: state.register.firstNameIsValid,
        lastNameIsValid: state.register.lastNameIsValid,
    }
    */
};

const mapDispatchToProps = function(dispatch) {

    return {

        validate: {
            emailAddress: (e) => { 
                dispatch(attemptValidateFormField({
                    fieldType: 'emailAddress',
                    fieldId: 'register-email-address',
                    e: e,
                    async: true,
                }));
            },
            username: (e) => {
                dispatch(attemptValidateFormField({
                    fieldType: 'username',
                    fieldId: 'register-username',
                    e: e,
                    async: true,
                }));
            },
            password: (e) => { 
                dispatch(attemptValidateFormField({
                    fieldType: 'password',
                    fieldId: 'register-password',
                    e: e,
                    async: false,
                }));
            },
            passwordMatch: (e) => { 
                dispatch(attemptValidateFormField({
                    fieldType: 'passwordMatch',
                    fieldId: 'register-password-match',
                    e: e,
                    async: false,
                }));
            },
            name: (e) => { 
                dispatch(attemptValidateFormField({
                    fieldType: 'name',
                    fieldId: '',
                    e: e,
                    async: false,
                }));
            },
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

