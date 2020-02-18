/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class ValidationMessage extends Component {

    render() {

        var cl = '';
        if (this.props.message) cl += "validation-message ";
        cl += (this.props.isValid) ? "valid" : "invalid";
        return (
            <React.Fragment>
            <div className={cl}>{ this.props.message }</div>
            </React.Fragment>
        );
    }
}

