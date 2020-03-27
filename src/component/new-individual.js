/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import { mediator }  from '../mediator';
import { auth } from '../auth';
import HeaderContainer from '../container/header-container';
import ValidationStatusIcon from './validation-status-icon';
import ValidationMessage from './validation-message';
import ModalBox from './modal-box';
import ReactDOM from "react-dom";
import Condition from './condition';
import NewIndividualTaxonField from './new-individual-taxon-field';
import { newIndividualConditions } from '../config/new-individual-conditions';
import { newIndividualTaxonFields } from '../config/new-individual-taxon-fields';
import { TailSpin } from "svg-loaders-react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class NewIndividual extends Component {

    constructor() {

        super();
        this.fieldContainsSubfields = this.fieldContainsSubfields.bind(this);
        this.getSubfieldValues = this.getSubfieldValues.bind(this);
        this.getFieldNameFromId = this.getFieldNameFromId.bind(this);
        this.getGenusInputClassNames = this.getGenusInputClassNames.bind(this);
        this.getSpeciesInputClassNames = this.getSpeciesInputClassNames.bind(this);
        this.updateGenusInputWidth = this.updateGenusInputWidth.bind(this);
        this.handleGenusBlur = this.handleGenusBlur.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleTaxonBlur = this.handleTaxonBlur.bind(this);
        this.renderConditionInputs = this.renderConditionInputs.bind(this);
        this.renderTaxonInputs = this.renderTaxonInputs.bind(this);
        this.submit = this.submit.bind(this);
        this.taxonFieldsAreEmpty = this.taxonFieldsAreEmpty.bind(this);
        this.updateRequiredFields = this.updateRequiredFields.bind(this);
        this.getNewConditionClass = this.getNewConditionClass.bind(this);
    }

    getGenusInputClassNames() {

        var classNames = "botanical-name genus";
        if (this.props.fields.genus.isRequired === true) {
            classNames += " required";
        }
        return classNames;
    }

    getFieldNameFromId(id) {

        var regex = new RegExp(/^(?:[^-]*-){2}([^-]*)/, 'i');
        var match = id.match(regex);
        return match[1];
    }

    getNewConditionClass(field) {

        var classNames = "new-condition";
        if (this.props.fields[field].newEntry === true) {

            classNames += " display";
        }
        return classNames;
    }

    getSpeciesInputClassNames() {

        var classNames = "botanical-name species";
        if (this.props.fields.species.isRequired === true) {
            classNames += " required";
        }
        return classNames;
    }

    handleConditionBlur(e) {

        var input = e.target;
    }

    handleInputBlur(e) {

        console.log('input-blur');
        var field = this.getFieldNameFromId(e.target.id);
        this.props.updateField(field, e.target.value);
    }

    /**
     * Occurs when focus leaves a Taxon-related input other than "Genus."
     *
     */
    handleTaxonBlur(e) {

        const input = e.target;
        this.handleInputBlur(e);
        if (input.value) {

            this.updateRequiredFields('add', ['genus', 'species']);
        }
        else if (this.taxonFieldsAreEmpty()) {

            this.updateRequiredFields('remove', [
                'genus', 'species'
            ]);
        }
    }

    /**
     * Occurs when focus leaves the "Genus" input.
     *
     */
    handleGenusBlur() {

        var input = document.getElementById('new-individual-genus');
        this.updateGenusInputWidth(input);
        if (input.value) {

            this.updateRequiredFields('add', ['genus', 'species']);
        }
        /**
         * If any of the checked values are not empty, genus is required.
         */
        else if (this.taxonFieldsAreEmpty()) {

            this.updateRequiredFields('remove', [
                'genus', 'species'
            ]);
        }
    }

    submit() {

        var fields = this.props.fields;
        var values = {};
        for (let [fieldName, field] of Object.entries(fields)) {

            if (field.hasOwnProperty('newEntry') && field.newEntry === true) {
                values[fieldName] = this.getSubfieldValues(field);
            }
            else values[fieldName] = field.value;
        }
        this.props.submitToServer(values);
    }

    getSubfieldValues(field) {

        var subfieldValues = {};
        var subfields = [
            'label',
            'description',
            'lowerTemp',
            'upperTemp',
            'unitId',
            'notLowerThan',
        ];
        for (var i=0 ; i<subfields.length ; i++) {
            if (field.hasOwnProperty(subfields[i])) {
                subfieldValues[subfields[i]] = field[subfields[i]];
            }
        }
        return subfieldValues;
    }

    fieldContainsSubfields(field) {

        return (field.hasOwnProperty('newEntry') && field.newEntry === true) ? true : false;
    }

    /**
     * This method is responsible for determining whether each field related
     * to a plant's taxon is empty.
     *
     * Returns true if every field is empty. False otherwise.
     */
    taxonFieldsAreEmpty() {

        const values = {
            family: document.getElementById('new-individual-family').value,
            genus: document.getElementById('new-individual-genus').value,
            species: document.getElementById('new-individual-species').value,
            subspecies: document.getElementById('new-individual-subspecies').value,
            variety: document.getElementById('new-individual-variety').value,
            origin: document.getElementById('new-individual-origin').value,
            commonName: document.getElementById('new-individual-common-name').value,
        };
        for (const index in values) {

            if (values[index]) return false;
        }
        return true;
    }

    updateGenusInputWidth(input) {

        /*
         * This adds a number of pixels to the width of the genus input. This
         * has two purposes: 1) it allows the italicized text to render in
         * full, solving the "cut corner" problem, and 2) it provides the
         * illusion of a space between the genus and species fields without
         * the need for margin/padding or an actual space character.
         */
        const padding = 5;
        const speciesInput = document.getElementById('new-individual-species');
        if (!input.value) {

            input.style.width = '50%';
            speciesInput.style.width = '50%';
            return;
        }

        const wrap = document.getElementById('new-individual-botanical-name');
        const body = document.getElementById('plantlogg');
        const span = document.createElement('span');
        const text = document.createTextNode(input.value);
        const totalWidth = wrap.offsetWidth;
        span.appendChild(text);
        span.className = 'offscreen-genus';
        body.appendChild(span);
        const width = span.offsetWidth + padding
        const remainingWidth = totalWidth - width - padding;
        input.style.width = width + 'px';
        speciesInput.style.width = remainingWidth + 'px';
    }

    updateRequiredFields(operation, array) {

        if (operation == 'add') this.props.makeFieldsRequired(array);
        else if (operation == 'remove') this.props.makeFieldsNotRequired(array);
        else throw new Error('Operation must either be `add` or `remove`.');
    }

    renderConditionInputs() {

        let inputs = [];
        for (let [key, condition] of Object.entries(newIndividualConditions)) {
            inputs.push(
                <Condition
                    condition={key}
                    field={this.props.fields[key]}
                    key={condition.key}
                    image={condition.image}
                    newCondition={condition.newCondition}
                    userConditions={this.props.userData.conditions}
                    toggleAddNewPlantCondition={this.props.toggleAddNewPlantCondition}
                    blurHandler={this.handleConditionBlur}
                    handleNewCondition={this.props.handleNewCondition}
                    units={this.props.appData.units}
                />
            );
        }
        return inputs;
    }

    renderTaxonInputs() {

        let inputs = [];
        for (let [key, input] of Object.entries(newIndividualTaxonFields)) {
            inputs.push(
                <NewIndividualTaxonField
                    className={input.className}
                    name={key}
                    key={input.key}
                    label={input.label}
                    onBlur={this.handleTaxonBlur}
                    placeholder={input.placeholder}
                />
            );
        }
        return inputs;
    }

    render() {

        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="add-individual">
                <h1>New Individual</h1>
                <p>Create a record of a single organism.</p>
                <div className="add-individual-form">
                    {/*
                      Image Section
                     */}
                    <div className="form-section image-section">
                        <label className="file-input">
                            <img src="/img/icons/add-photo.svg" alt="add photo button" />
                            <input
                                type="file"
                                className=""
                                id="new-individual-image"
                                onBlur={this.handleInputBlur}
                            />
                        </label>
                    </div>
                    {/*
                      Labelling section
                     */}
                    <div className="form-section label-section">
                        <label><span></span>
                            <input
                                type="text"
                                placeholder="Nickname"
                                id="new-individual-nickname"
                                onBlur={this.handleInputBlur}
                                className="nickname"
                            />
                        </label>
                        <label><span></span>
                            <input
                                type="text"
                                placeholder="A custom ID or tracking number."
                                id="new-individual-serial"
                                onBlur={this.handleInputBlur}
                                className="serial required"
                            />
                        </label>
                    </div>
                    {/*
                      Identification section
                     */}
                    <div className="form-section identify-section">
                        <input
                            type="text"
                            placeholder="Botanical Family"
                            id="new-individual-family"
                            className="botanical-name family"
                            onBlur={this.handleTaxonBlur}
                        />
                        <div
                            className="botanical-name-container"
                            id="new-individual-botanical-name"
                        >
                            <input
                                type="text"
                                placeholder="Genus"
                                id="new-individual-genus"
                                className={this.getGenusInputClassNames()}
                                onBlur={this.handleGenusBlur}
                            />
                            <input
                                type="text"
                                placeholder="Species"
                                id="new-individual-species"
                                className={this.getSpeciesInputClassNames()}
                                onBlur={this.handleTaxonBlur}
                            />
                        </div>
                        {this.renderTaxonInputs()}
                    </div>
                    {/*
                      Description Section
                     */}
                    <div className="form-section description-section">
                        <h2>Description</h2>
                        <textarea
                            placeholder="Record the details of your individual plant (500 character limit)."
                            className=""
                            id="new-individual-description"
                            onBlur={this.handleInputBlur}
                        />
                    </div>{/* form-section */}
                    {/*
                      Conditions Section
                     */}
                    <div className="form-section conditions-section">
                        <h2>Conditions &amp; Care</h2>
                        {this.renderConditionInputs()}
                    </div>
                    <button
                        className="button primary-button"
                        onClick={this.submit}
                    >Add plant</button>
                </div>{/* add-individual-form */}
            </main>
            </React.Fragment>
        );
    }
}

