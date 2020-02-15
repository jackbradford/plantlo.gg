/**
 * This file provides the login error message.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";

export default class LoginError extends Component {

    render() {

        return (
        
            <React.Fragment>
                <div id="login-error">{this.props.errorMessage}</div>
            </React.Fragment>
        );
    }
}

