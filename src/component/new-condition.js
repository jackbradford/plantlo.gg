/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class NewCondition extends Component {

    componentDidMount() {

    }

    redirect() {

    }

    closeModal() {

    }

    render() {

        return (
            <React.Fragment>
            <div
                className={this.props.className + " new-condition"}
                id={"new-" + this.props.condition + "-condition"}
            >
                <input
                    type="text"
                    placeholder={this.props.labelPlaceholder}
                    id={"new-"+this.props.condition+"-condition-label"}
                />
                <input
                    type="text"
                    placeholder={this.props.descriptionPlaceholder}
                    id={"new-"+this.props.condition+"-condition-description"}
                />
            </div>
            </React.Fragment>
        );
    }
}

