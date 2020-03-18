/**
 * This file provides the container component for the Register page.
 * plantlo.gg/register
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewIndividual from '../component/new-individual';
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewIndividual);

