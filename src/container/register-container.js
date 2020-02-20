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
    attemptRegisterUser,
    registerUserEnd,
    attemptValidateFormField,
    validateFormFieldEnd,
    resetRegisterName
} from '../actions';

const mapStateToProps = function(state) {

    console.log("STATE");
    console.log(state);
    return {

        email: state.register.fields.emailAddress,
        username: state.register.fields.username,
        password: state.register.fields.password,
        passwordMatch: state.register.fields.passwordMatch,
        firstName: state.register.fields.firstName,
        lastName: state.register.fields.lastName,
        formStatus: state.register.form,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        attemptRegisterUser: (formData) => {
            dispatch(attemptRegisterUser(formData))
        },
        registerUserEnd: (response) => {
            dispatch(registerUserEnd(response))
        },
        resetName: (options) => {
            dispatch(resetRegisterName(options))
        },
        validate: {
            emailAddress: (e) => { 
                dispatch(attemptValidateFormField({
                    fieldType: 'emailAddress',
                    fieldId: 'register-email-address',
                    e: e,
                }));
            },
            username: (e) => {
                dispatch(attemptValidateFormField({
                    fieldType: 'username',
                    fieldId: 'register-username',
                    e: e,
                }));
            },
            password: (options) => { 
                console.log("OPTIONS");
                console.log(options);
                dispatch(validateFormFieldEnd(options))
            },
            passwordMatch: (options) => { 
                dispatch(validateFormFieldEnd(options))
            },
            name: (options) => { 
                dispatch(validateFormFieldEnd(options))
            },
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

