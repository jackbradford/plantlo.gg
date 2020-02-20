/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import { mediator }  from '../../mediator';
import { auth } from '../../auth';
import HeaderContainer from '../../container/header-container';
import ValidationStatusIcon from '../validation-status-icon';
import ValidationMessage from '../validation-message';
import ReactDOM from "react-dom";
import { TailSpin } from "svg-loaders-react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class Register extends Component {

    constructor() {
        super();
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePasswordMatch = this.validatePasswordMatch.bind(this);
        this.validateName = this.validateName.bind(this);
        this.attemptRegisterUser = this.attemptRegisterUser.bind(this);
    }

    /**
     * Passwords must be at least 8 characters and include at least one of 
     * each of the following:
     *  lowercase letter
     *  uppercase letter
     *  number
     *  special character
     *
     */
    validatePassword(e) {

        var password = e.target.value;
        try {
            if (!password.match(/.{12,}/)) {
                throw new Error('Password must be at least 12 characters long.');
            }
            this.props.validate.password({
                success: true,
                data: {
                    success: true,
                    message: 'Password is valid.',
                    fieldType: 'password'
                }
            });
        }
        catch (error) {

            this.props.validate.password({
                success:true,
                data: {
                    success: false,
                    message: error.message,
                    fieldType: 'password'
                }
            });
        }
    }

    validatePasswordMatch(e) {

        var retype = e.target.value;
        var password = document.getElementById('register-password').value;
        try {
            if (retype !== password) {
                throw new Error('Passwords do not match.');
            }
            this.props.validate.passwordMatch({
                success: true,
                data: {
                    success: true,
                    message: 'Passwords match.',
                    fieldType: 'passwordMatch'
                }
            });
        }
        catch (error) {
            this.props.validate.passwordMatch({
                success: true,
                data: {
                    success: false,
                    message: error.message,
                    fieldType: 'passwordMatch'
                }
            });
        }
    }

    validateName(e) {

        var nameInput = e.target;
        var name = nameInput.value;
        var id = nameInput.id;
        var fieldType = (id == 'register-last-name')
            ? 'lastName'
            : 'firstName';
        try {
            if (!name.match(/.{1,}/)) {
                this.props.resetName({
                    fieldType: fieldType
                });
                return;
            }
            this.props.validate.name({
                success: true,
                data: {
                    success: true,
                    message: '',
                    fieldType: fieldType,
                }
            });
        }
        catch (error) {

        }
        
    }

    attemptRegisterUser() {

        try {

            if (!this.props.email.isValid) {
                throw new Error('Email is invalid.');
            }
            if (!this.props.username.isValid) {
                throw new Error('Username is invalid.');
            }
            if (!this.props.password.isValid) {
                throw new Error('Password is invalid.');
            }
            if (!this.props.passwordMatch.isValid) {
                throw new Error('Passwords do not match.');
            }
        }
        catch (error) {

            this.props.registerUserEnd({
                success: true,
                data: {
                    success: false,
                    message: error.message,
                    error: error,
                }
            });
            return;
        }
        this.props.attemptRegisterUser({
            emailAddress: document.getElementById("register-email-address").value,
            username: document.getElementById("register-username").value,
            password: document.getElementById("register-password").value,
            firstName: document.getElementById("register-first-name").value,
            lastName: document.getElementById("register-last-name").value,
        });
    }

    render() {

        var formMessage;
        var submitButton;
        if (this.props.formStatus.hasErrors) {
            formMessage = (
                <ValidationMessage
                    isValid={ !this.props.formStatus.hasErrors }
                    message={ this.props.formStatus.message }
                    className="submit-validation"
                />
            );
        }
        if (this.props.formStatus.isBeingSubmitted === true) {

            submitButton = (
                <div
                    className="primary-button submit"
                    onClick={ this.attemptRegisterUser }
                >
                    <span><TailSpin /></span>
                </div>
            );
        }
        else {

            submitButton = (
                <div
                    className="primary-button submit"
                    onClick={ this.attemptRegisterUser }
                >
                    <span>Register</span>
                </div>
            );
        }

        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="registration-form">
                <h1>Create a New Account</h1>
                <div className="registration-inputs">
                    <input 
                        type="text"
                        placeholder="your email"
                        onBlur={ this.props.validate.emailAddress }
                        id="register-email-address"
                        className={ 
                            (this.props.email.isValid !== false)
                                ? "validated-input"
                                : "validated-input invalid"
                        }
                    />
                    <div
                        className={
                            (this.props.email.isValid !== false)
                                ? "input-validation validated-input"
                                : "input-validation validated-input invalid"
                        }
                    >
                        <ValidationStatusIcon isValid={ this.props.email.isValid } />
                    </div>
                    <ValidationMessage
                        isValid={ this.props.email.isValid }
                        message={ this.props.email.message }
                    />
                    <input
                        type="text"
                        placeholder="a new username"
                        onBlur={ this.props.validate.username }
                        id="register-username"
                        className={
                            (this.props.username.isValid !== false)
                                ? "validated-input"
                                : "validated-input invalid"
                        }
                    />
                    <div
                        className={
                            (this.props.username.isValid !== false)
                                ? "input-validation validated-input"
                                : "input-validation validated-input invalid"
                        }
                    >
                        <ValidationStatusIcon isValid={ this.props.username.isValid } />
                    </div>
                    <ValidationMessage
                        isValid={ this.props.username.isValid }
                        message={ this.props.username.message }
                    />
                    <input
                        type="password"
                        placeholder="a new password"
                        onBlur={ this.validatePassword }
                        id="register-password"
                        className={
                            (this.props.password.isValid !== false)
                                ? "validated-input"
                                : "validated-input invalid"
                        }
                    />
                    <div
                        className={
                            (this.props.password.isValid !== false)
                                ? "input-validation validated-input"
                                : "input-validation validated-input invalid"
                        }
                    >
                        <ValidationStatusIcon isValid={ this.props.password.isValid } />
                    </div>
                    <ValidationMessage
                        isValid={ this.props.password.isValid }
                        message={ this.props.password.message }
                    />
                    <input
                        type="password"
                        placeholder="please retype your password"
                        onBlur={ this.validatePasswordMatch }
                        id="register-password-match"
                        className={
                            (this.props.passwordMatch.isValid !== false)
                                ? "validated-input"
                                : "validated-input invalid"
                        }
                    />
                    <div
                        className={
                            (this.props.passwordMatch.isValid !== false)
                                ? "input-validation validated-input"
                                : "input-validation validated-input invalid"
                        }
                    >
                        <ValidationStatusIcon isValid={ this.props.passwordMatch.isValid } />
                    </div>
                    <ValidationMessage
                        isValid={ this.props.passwordMatch.isValid }
                        message={ this.props.passwordMatch.message }
                    />
                    <input
                        type="text"
                        placeholder="first name (optional)"
                        onBlur={ this.validateName }
                        id="register-first-name"
                        className={
                            (this.props.firstName.isValid !== false)
                                ? "validated-input"
                                : "validated-input invalid"
                        }
                    />
                    <div
                        className={
                            (this.props.firstName.isValid !== false)
                                ? "input-validation validated-input"
                                : "input-validation validated-input invalid"
                        }
                    >
                        <ValidationStatusIcon isValid={ this.props.firstName.isValid } />
                    </div>
                    <ValidationMessage
                        isValid={ this.props.firstName.isValid }
                        message={ this.props.firstName.message }
                    />
                    <input
                        type="text"
                        placeholder="last name (optional)"
                        onBlur={ this.validateName }
                        id="register-last-name"
                        className={
                            (this.props.lastName.isValid !== false)
                                ? "validated-input"
                                : "validated-input invalid"
                        }
                    />
                    <div
                        className={
                            (this.props.lastName.isValid !== false)
                                ? "input-validation validated-input"
                                : "input-validation validated-input invalid"
                        }
                    >
                        <ValidationStatusIcon isValid={ this.props.lastName.isValid } />
                    </div>
                    <ValidationMessage
                        isValid={ this.props.lastName.isValid }
                        message={ this.props.lastName.message }
                    />
                    { formMessage }
                    { submitButton }
                </div>
            </main>
            </React.Fragment>
        );
    }
}

