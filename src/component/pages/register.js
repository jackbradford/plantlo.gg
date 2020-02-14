/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import { mediator }  from '../../mediator';
import { auth } from '../../auth';
import Header from '../header';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class Register extends Component {

    render() {

        return (
            <React.Fragment>
            <Header />
            <main className="registration-form">
                <h1>Create a New Account</h1>
                <div className="registration-inputs">
                    <input type="text" placeholder="your email" />
                    <div className="input-validation">test</div>
                    <input type="text" placeholder="a new username" onClick={this.validateUsername} id="username" />
                    <div className="input-validation">test</div>
                    <input type="password" placeholder="a new password" />
                    <div className="input-validation">test</div>
                    <input type="text" placeholder="first name" />
                    <div className="input-validation">test</div>
                    <input type="text" placeholder="last name" />
                    <div className="input-validation">test</div>
                    <input type="submit" value="Register" className="primary-button" />
                </div>
            </main>
            </React.Fragment>
        );
    }
}

