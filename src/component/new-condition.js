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
        this.handleNewConditionBlur = this.handleNewConditionBlur.bind(this);
    }

    /*
     * The regex in this method finds the field name by extracting it from the
     * element's id, which should conform to this format:
     * new-conditionName-condition-fieldName
     */
    handleNewConditionBlur(e) {

        var input = e.target;
        var regex = new RegExp(/^(?:[^-]*-){3}([^-]*)/, 'i');
        var match = input.id.match(regex);
        var field = match[1];
        this.props.handleNewCondition(this.props.condition, field, input.value);
    }

    getDescriptionInput() {

        if (this.props.condition === 'temperature') return (
            <React.Fragment>
            <input
                type="text"
                id="new-temperature-condition-lowerTemp"
                onBlur={this.handleNewConditionBlur}
                placeholder="Min."
            />
            <input
                type="text"
                id="new-temperature-condition-upperTemp"
                onBlur={this.handleNewConditionBlur}
                placeholder="Max."
            />
            <select
                id="new-temperature-condition-unitId"
                value={this.props.field.unitId}
                onChange={this.handleNewConditionBlur}
            >
                {this.getTemperatureUnitOptions()}
            </select>
            <input
                type="text"
                id="new-temperatre-condition-notLowerThan"
                onBlur={this.handleNewConditionBlur}
                placeholder="Never Below"
            />
            </React.Fragment>
        );
        else return (
            <React.Fragment>
            <textarea
                placeholder={this.props.descriptionPlaceholder}
                id={"new-"+this.props.condition+"-condition-description"}
                onBlur={this.handleNewConditionBlur}
            />
            </React.Fragment>
        );
    }

    getTemperatureUnitOptions() {

        let options = [];
        for (let [key, unit] of Object.entries(this.props.units)) {
            if (unit.unit_type === 'temperature') {
            options.push(
                <option key={unit.id} value={unit.id}>{unit.symbol}</option>
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
                    onBlur={this.handleNewConditionBlur}
                />
                {descriptionInput}
            </div>
            </React.Fragment>
        );
    }
}

