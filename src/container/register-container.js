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
    attemptValidateFormField,
    registerUserEnd,
    resetForm,
    resetFormStatus,
    resetMenuExpand,
    resetRegisterName,
    validateFormFieldEnd,
} from '../actions';

const mapStateToProps = function(state) {

    return {

        email: state.register.fields.emailAddress,
        firstName: state.register.fields.firstName,
        formStatus: state.register.form,
        lastName: state.register.fields.lastName,
        password: state.register.fields.password,
        passwordMatch: state.register.fields.passwordMatch,
        username: state.register.fields.username,
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
        resetForm: () => {
            dispatch(resetForm())
        },
        resetFormStatus: () => {
            dispatch(resetFormStatus())
        },
        resetMenuExpand: () => {
            dispatch(resetMenuExpand())
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
            name: (options) => { 
                dispatch(validateFormFieldEnd(options))
            },
            password: (options) => { 
                dispatch(validateFormFieldEnd(options))
            },
            passwordMatch: (options) => { 
                dispatch(validateFormFieldEnd(options))
            },
            username: (e) => {
                dispatch(attemptValidateFormField({
                    fieldType: 'username',
                    fieldId: 'register-username',
                    e: e,
                }));
            },
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

