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
        this.updateGenusInputWidth = this.updateGenusInputWidth.bind(this);
    }

    componentDidMount() {

        /*
        this.props.resetMenuExpand();
        this.props.resetForm();
        */
    }

    getUserPlantVarietyOptions() {

        return '';
    }

    updateGenusInputWidth() {

        const input = document.getElementById('new-individual-genus');

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

        console.log(input);
        console.log(width);
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
                            <img src="/img/add.svg" alt="add photo button" />
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
                            id="add-variety-family"
                            className="botanical-name family"
                        />
                        <div
                            className="botanical-name-container"
                            id="new-individual-botanical-name"
                        >
                            <input
                                type="text"
                                placeholder="Genus"
                                id="new-individual-genus"
                                className="botanical-name genus required"
                                onBlur={this.updateGenusInputWidth}
                            />
                            <input
                                type="text"
                                placeholder="Species"
                                id="new-individual-species"
                                className="botanical-name species required"
                            />
                        </div>
                        <label className="subspecies"><span>Subspecies:</span>
                            <input
                                type="text"
                                placeholder="Subspecies"
                                id="add-variety-subspecies"
                                className="subspecies-name"
                            />
                        </label>
                        <label><span>Variety:</span>
                            <input
                                type="text"
                                placeholder="Variety:"
                                id="add-variety-variety"
                                className="variety-name"
                            />
                        </label>
                        <label><span>Origin:</span>
                            <input
                                type="text"
                                placeholder="e.g. 'North America'"
                                id="add-variety-origin"
                                className="origin"
                            />
                        </label>
                    </div>
                    {/*
                      Description Section
                     */}
                    <div className="form-section description-section">
                        <h2>Describe your plant</h2>
                        <p className="subtitle">
                            Record the specifics of your specimen.
                        </p>
                        <label><span>Description:</span>
                            <textarea
                                placeholder="500 character limit."
                                className=""
                            />
                        </label>
                    </div>{/* form-section */}
                    {/*
                      Conditions Section
                     */}
                    <div className="form-section conditions-section">
                        <h2>Your plant's ideal conditions</h2>
                        <p className="subtitle">
                            Make note of the conditions in which your plant thrives.
                        </p>
                        <label className="varieties"><span>Light:</span>
                            <select defaultValue="">
                                <option value="" disabled>Select...</option>
                            </select>
                        </label>
                        <button
                            onClick=""
                            className="button primary-button new-requirement"
                        >
                            Add new
                        </button>
                        <label className="varieties"><span>Water:</span>
                            <select defaultValue="">
                                <option value="" disabled>Select...</option>
                            </select>
                        </label>
                        <button
                            onClick=""
                            className="button primary-button new-requirement"
                        >
                            Add new
                        </button>
                        <label className="varieties"><span>Soil:</span>
                            <select defaultValue="">
                                <option value="" disabled>Select...</option>
                            </select>
                        </label>
                        <button
                            onClick=""
                            className="button primary-button new-requirement"
                        >
                            Add new
                        </button>
                        <label className="varieties"><span>Fertilizer:</span>
                            <select defaultValue="">
                                <option value="" disabled>Select...</option>
                            </select>
                        </label>
                        <button
                            onClick=""
                            className="button primary-button new-requirement"
                        >
                            Add new
                        </button>
                        <label className="varieties"><span>Temperature:</span>
                            <select defaultValue="">
                                <option value="" disabled>Select...</option>
                            </select>
                        </label>
                        <button
                            onClick=""
                            className="button primary-button new-requirement"
                        >
                            Add new
                        </button>
                        <label className="varieties"><span>Humidity:</span>
                            <select defaultValue="">
                                <option value="" disabled>Select...</option>
                            </select>
                        </label>
                        <button
                            onClick=""
                            className="button primary-button new-requirement"
                        >
                            Add new
                        </button>
                    </div>
                    <button className="button primary-button">Add plant</button>
                </div>{/* add-individual-form */}
            </main>
            </React.Fragment>
        );

    }
}

