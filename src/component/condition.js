/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';
import NewConditionContainer from '../container/new-condition-container';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class Condition extends Component {

    constructor() {

        super();
        this.getConditionType = this.getConditionType.bind(this);
        this.getDisabledConditionOption = this.getDisabledConditionOption.bind(this);
        this.getUserConditionOptions = this.getUserConditionOptions.bind(this);
        this.handleConditionSelectBlur = this.handleConditionSelectBlur.bind(this);
        this.toggleAddNewPlantCondition = this.toggleAddNewPlantCondition.bind(this);
    }

    getConditionType(fieldName) {

        switch (fieldName) {

            case 'light': return "condition";
            case 'water': return "condition";
            case 'temperature': return "range";
            case 'humidity': return "";
            case 'soil': return "condition";
            case 'fertilizer': return "type";
            default: return "condition";
        }
    }

    getDisabledConditionOption(fieldName) {

        var html, optionText;
        var selected = false || null;
        var conditions = this.props.userData.conditions[fieldName];
        var conditionType = this.getConditionType(fieldName);

        if (this.props.field.newEntry === true) {

            html = (
                <React.Fragment>
                    <option disabled value="">New {fieldName} {conditionType}...</option>
                </React.Fragment>
            );
        } else {

            html = (
                <React.Fragment>
                    <option disabled value="">Select a {fieldName} {conditionType}...</option>
                </React.Fragment>
            );
        }
        for (const condition in conditions) {
            attributes = (selected == condition.id) ? {'selected':'selected'} : {};
            optionText = "Text";
            html += (
                <React.Fragment>
                    <option value="">{optionText}</option>
                </React.Fragment>
            );
        }
        return html;
    }

    getUserConditionOptions() {

        //TODO
        return;
    }

    handleConditionSelectBlur(e) {

        var input = e.target;
    }

    /**
     * This method assumes the id of the toggle button conforms to this format:
     * add-new-x-condition
     * (where "x" is the name of the condition)
     */
    toggleAddNewPlantCondition(e) {

        const conditionButton = e.target;
        var regex = new RegExp(/^(?:[^-]*-){2}([^-]*)/, 'i');
        var match = conditionButton.id.match(regex);
        this.props.toggleAddNewPlantCondition(match[1]);
        return;
    }

    render() {

        var toggleButtonId = "add-new-" + this.props.name + "-condition";
        return (
            <React.Fragment>
                <div className="condition">
                    <label className="varieties"><img src={this.props.image.src} alt={this.props.image.alt} />
                        <select
                            defaultValue=""
                            id=""
                            onBlur={this.handleConditionSelectBlur}
                        >
                            {this.getDisabledConditionOption(this.props.name)}
                            {this.getUserConditionOptions()}
                        </select>
                    </label>
                    <button
                        onClick={this.toggleAddNewPlantCondition}
                        className="button primary-button"
                        id={toggleButtonId}
                    >
                        New
                    </button>
                    <NewConditionContainer
                        className={(this.props.field.newEntry === true) ? "display" : ""}
                        field={this.props.field}
                        conditionName={this.props.name}
                        labelPlaceholder={this.props.newCondition.labelPlaceholder}
                        descriptionPlaceholder={this.props.newCondition.descriptionPlaceholder}
                    />
                </div>
            </React.Fragment>
        );
    }
}

