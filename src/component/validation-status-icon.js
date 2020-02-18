/**
 * This component controls how form validation icons are displayed.
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


export default class ValidationStatusIcon extends Component {

    render() {

        var img;
        var isValid = this.props.isValid;
        if (isValid != null) {
            if (isValid) {
                img = <img src="img/valid.svg" className="validation-status" alt="A checkmark." />;
            }
            else img = <img src="img/error.svg" className="validation-status"  alt="A warning triangle." />;
        }
        return (
            <React.Fragment>
            {img}
            </React.Fragment>
        );
    }
};

