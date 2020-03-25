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

    constructor() {

        super();
        this.getDescriptionInput = this.getDescriptionInput.bind(this);
        this.getTemperatureUnitOptions = this.getTemperatureUnitOptions.bind(this);
    }

    getDescriptionInput() {

        if (this.props.condition === 'temperature') return (
            <React.Fragment>
            <input
                type="text"
                id="new-temperature-condition-min"
                onBlur={this.props.blurHandler}
                placeholder="Min."
            />
            <input
                type="text"
                id="new-temperature-condition-max"
                onBlur={this.props.blurHandler}
                placeholder="Max."
            />
            <select
                id="new-temperature-condition-unit"
                value="28"
            >
                {this.getTemperatureUnitOptions()}
            </select>
            <input
                type="text"
                id="new-temperatre-condition-never-below"
                onBlur={this.props.blurHandler}
                placeholder="Never Below"
            />
            </React.Fragment>
        );
        else return (
            <React.Fragment>
            <textarea
                placeholder={this.props.descriptionPlaceholder}
                id={"new-"+this.props.condition+"-condition-description"}
                onBlur={this.props.blurHandler}
            />
            </React.Fragment>
        );
    }

    getTemperatureUnitOptions() {

        let options = [];
        for (let [key, unit] of Object.entries(this.props.units)) {
            if (unit.unit_type === 'temperature') {
            options.push(
                <option value={unit.id}>{unit.symbol}</option>
            );
            }
        }
        return options;
    }

    render() {

        var descriptionInput = this.getDescriptionInput();
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
                    onBlur={this.props.blurHandler}
                />
                {descriptionInput}
            </div>
            </React.Fragment>
        );
    }
}

