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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class Register extends Component {

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
        if (
            password.match(/[a-zA-Z]/) &&
            password.match(/[\W]/) &&
            password.match(/\d/) &&
            password.match(/.{8,}/)
        ) {

            // Validation success
            this.props.validate.password();
        }
        else {

            // Validation fail
        }
    }

    validatePasswordMatch(e) {

        var retype = e.target.value;
        var password = document.getElementById('register-password').value;
        if (password === retype) {

            // Success
        }
        else {

            // Fail
        }
    }

    validateName(e) {

    }

    render() {

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
                    />
                    <div
                        className="input-validation"
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
                    />
                    <div
                        className="input-validation"
                    >
                        test
                    </div>
                    <input
                        type="password"
                        placeholder="a new password"
                        onBlur={ this.props.validate.password }
                        id="register-password"
                    />
                    <div
                        className="input-validation"
                    >
                        test
                    </div>
                    <input
                        type="password"
                        placeholder="please retype your password"
                        onBlur={ this.props.validate.passwordMatch }
                        id="register-password-match"
                    />
                    <div
                        className="input-validation"
                    >
                        test
                    </div>
                    <input
                        type="text"
                        placeholder="first name"
                        onBlur={ this.props.validate.name }
                        id="register-first-name"
                    />
                    <div
                        className="input-validation"
                    >
                        test
                    </div>
                    <input
                        type="text"
                        placeholder="last name"
                        onBlur={ this.props.validate.name }
                        id="register-last-name"
                    />
                    <div
                        className="input-validation"
                    >
                        test
                    </div>
                    <input
                        type="submit"
                        value="Register"
                        className="primary-button"
                    />
                </div>
            </main>
            </React.Fragment>
        );
    }
}

