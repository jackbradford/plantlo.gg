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
        this.getGenusInputClassNames = this.getGenusInputClassNames.bind(this);
        this.getSpeciesInputClassNames = this.getSpeciesInputClassNames.bind(this);
        this.updateGenusInputWidth = this.updateGenusInputWidth.bind(this);
        this.handleGenusBlur = this.handleGenusBlur.bind(this);
        this.handleTaxonBlur = this.handleTaxonBlur.bind(this);
        this.taxonFieldsAreEmpty = this.taxonFieldsAreEmpty.bind(this);
        this.updateRequiredFields = this.updateRequiredFields.bind(this);
        this.getNewConditionClass = this.getNewConditionClass.bind(this);
    }

    getNewConditionClass(field) {

        var classNames = "new-condition";
        if (this.props.fields[field].newEntry === true) {

            classNames += " display";
        }
        return classNames;
    }

    getGenusInputClassNames() {

        var classNames = "botanical-name genus";
        if (this.props.fields.genus.isRequired === true) {
            classNames += " required";
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

    /**
     * Occurs when focus leaves a Taxon-related input other than "Genus."
     *
     */
    handleTaxonBlur(e) {

        const input = e.target;
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
                                id="add-individual-nickname"
                                className="nickname"
                            />
                        </label>
                        <label><span></span>
                            <input
                                type="text"
                                placeholder="A custom ID or tracking number."
                                id="add-individual-serial"
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
                        <label className="subspecies"><span>Subspecies:</span>
                            <input
                                type="text"
                                placeholder="Subspecies"
                                id="new-individual-subspecies"
                                className="subspecies-name"
                                onBlur={this.handleTaxonBlur}
                            />
                        </label>
                        <label><span>Variety:</span>
                            <input
                                type="text"
                                placeholder="Variety:"
                                id="new-individual-variety"
                                className="variety-name"
                                onBlur={this.handleTaxonBlur}
                            />
                        </label>
                        <label><span>Common&nbsp;Name:</span>
                            <input
                                type="text"
                                placeholder="e.g. 'African Violet'"
                                id="new-individual-common-name"
                                className="origin"
                                onBlur={this.handleTaxonBlur}
                            />
                        </label>
                        <label><span>Origin:</span>
                            <input
                                type="text"
                                placeholder="e.g. 'Eastern tropical Africa'"
                                id="new-individual-origin"
                                className="origin"
                                onBlur={this.handleTaxonBlur}
                            />
                        </label>
                    </div>
                    {/*
                      Description Section
                     */}
                    <div className="form-section description-section">
                        <h2>Description</h2>
                        <textarea
                            placeholder="Record the details of your individual plant (500 character limit)."
                            className=""
                        />
                    </div>{/* form-section */}
                    {/*
                      Conditions Section
                     */}
                    <div className="form-section conditions-section">
                        <h2>Conditions &amp; Care</h2>
                        <Condition
                            condition="light"
                            field={this.props.fields.light}
                            image={{src:"/img/icons/sun.svg", alt:"The sun as a light condition icon."}}
                            newCondition={{
                                labelPlaceholder: "Label ('Low Light')",
                                descriptionPlaceholder: "Description ('Within 2-3m of a window.')"
                            }}
                            userConditions={this.props.userData.conditions}
                            toggleAddNewPlantCondition={this.props.toggleAddNewPlantCondition}
                        />
                        <Condition
                            condition="water"
                            field={this.props.fields.water}
                            image={{src:"/img/icons/water.svg", alt:"A water droplet as a Water condition icon."}}
                            newCondition={{
                                labelPlaceholder: "Label ('Evenly Moist')",
                                descriptionPlaceholder: "Description ('The soil should not be allowed to dry out.')"
                            }}
                            userConditions={this.props.userData.conditions}
                            toggleAddNewPlantCondition={this.props.toggleAddNewPlantCondition}
                        />
                        <Condition
                            condition="temperature"
                            field={this.props.fields.temperature}
                            image={{src:"/img/icons/temperature.svg", alt:"A thermometer used as a temperature range icon."}}
                            newCondition={{
                                labelPlaceholder: "Label ('Very Warm')",
                                descriptionPlaceholder: "Description ('CHANGE THIS INPUT')"
                            }}
                            userConditions={this.props.userData.conditions}
                            toggleAddNewPlantCondition={this.props.toggleAddNewPlantCondition}
                        />
                        <Condition
                            condition="humidity"
                            field={this.props.fields.humidity}
                            image={{src:"/img/icons/humidity.svg", alt:"A cloud as a humidity icon."}}
                            newCondition={{
                                labelPlaceholder: "Label ('Moderate Humidity')",
                                descriptionPlaceholder: "Description ('Relative humidity of 50-60% is ideal for this plant.')"
                            }}
                            userConditions={this.props.userData.conditions}
                            toggleAddNewPlantCondition={this.props.toggleAddNewPlantCondition}
                        />
                        <Condition
                            condition="soil"
                            field={this.props.fields.soil}
                            image={{src:"/img/icons/shovel.svg", alt:"A shovel as a soil condition icon."}}
                            newCondition={{
                                labelPlaceholder: "Label ('')",
                                descriptionPlaceholder: "Description ('')"
                            }}
                            userConditions={this.props.userData.conditions}
                            toggleAddNewPlantCondition={this.props.toggleAddNewPlantCondition}
                        />
                        <Condition
                            condition="fertilizer"
                            field={this.props.fields.fertilizer}
                            image={{src:"/img/icons/fork-knife.svg", alt:"A fork and knife set as a fertilizer type icon."}}
                            newCondition={{
                                labelPlaceholder: "Label ('')",
                                descriptionPlaceholder: "Description ('')"
                            }}
                            userConditions={this.props.userData.conditions}
                            toggleAddNewPlantCondition={this.props.toggleAddNewPlantCondition}
                        />
                    </div>
                    <button className="button primary-button">Add plant</button>
                </div>{/* add-individual-form */}
            </main>
            </React.Fragment>
        );
    }
}

