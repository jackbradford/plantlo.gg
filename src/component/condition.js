/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';
import NewCondition from './new-condition';
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
        var conditions = this.props.userConditions[fieldName];
        var attributes = (selected) ? {} : {'selected': 'selected'};
        var conditionType = this.getConditionType(fieldName);

        if (this.props.field.newEntry === true) {

            html = (
                <React.Fragment>
                    <option {...attributes} disabled value="">New {fieldName} {conditionType}...</option>
                </React.Fragment>
            );
        } else {

            html = (
                <React.Fragment>
                    <option {...attributes} disabled value="">Select a {fieldName} {conditionType}...</option>
                </React.Fragment>
            );
        }
        for (const condition in conditions) {
            attributes = (selected == condition.id) ? {'selected':'selected'} : {};
            optionText = "Text";
            html += (
                <React.Fragment>
                    <option {...attributes} value="">{optionText}</option>
                </React.Fragment>
            );
        }
        return html;
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

        var toggleButtonId = "add-new-" + this.props.condition + "-condition";
        return (
            <React.Fragment>
                <div className="condition">
                    <label className="varieties"><img src={this.props.image.src} alt={this.props.image.alt} />
                        <select defaultValue="">
                            {this.getDisabledConditionOption(this.props.condition)}
                        </select>
                    </label>
                    <button
                        onClick={this.toggleAddNewPlantCondition}
                        className="button primary-button"
                        id={toggleButtonId}
                    >
                        New
                    </button>
                    <NewCondition
                        className={(this.props.field.newEntry === true) ? "display" : ""}
                        condition={this.props.condition}
                        labelPlaceholder={this.props.newCondition.labelPlaceholder}
                        descriptionPlaceholder={this.props.newCondition.descriptionPlaceholder}
                        units={this.props.units}
                    />
                </div>
            </React.Fragment>
        );
    }
}

