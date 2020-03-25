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


export default class NewIndividualTaxonField extends Component {

    componentDidMount() {

    }

    redirect() {

    }

    closeModal() {

    }

    render() {

        return (
            <React.Fragment>
            <label className={this.props.name}><span>{this.props.label}:</span>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    id={"new-individual-" + this.props.name}
                    className={this.props.className}
                    onBlur={this.props.onBlur}
                />
            </label>
            </React.Fragment>
        );
    }
}

