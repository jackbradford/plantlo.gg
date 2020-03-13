/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import { mediator }  from '../../mediator';
import { auth } from '../../auth';
import HeaderContainer from '../../container/header-container';
import ValidationStatusIcon from '../validation-status-icon';
import ValidationMessage from '../validation-message';
import ModalBox from '../modal-box';
import ReactDOM from "react-dom";
import { TailSpin } from "svg-loaders-react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class AddIndividual extends Component {

    constructor() {
        super();
        /*
        this.validateEmail = this.validateEmail.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePasswordMatch = this.validatePasswordMatch.bind(this);
        this.validateName = this.validateName.bind(this);
        this.attemptRegisterUser = this.attemptRegisterUser.bind(this);
        */
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

    render() {

        const userPlantVarietyOptions = this.getUserPlantVarietyOptions.bind(this)();
        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="add-individual">
                <h1>Add an Individual</h1>
                <p>Use this form to create a record of a single organism.</p>
                <div className="add-individual-form">
                    {/*
                      Image Section
                     */}
                    <div className="form-section image-section">
                        <h2>Upload a photo</h2>
                        <p className="subtitle">
                            Add a recent photo of your plant.
                        </p>
                        <label className="file-input">
                            <img src="/img/add.svg" alt="add photo button" />
                            <input
                                type="file"
                                className=""
                            />
                        </label>
                    </div>{/* form-section */}
                    {/*
                      Labelling section
                     */}
                    <div className="form-section label-section">
                        <h2>Label your plant</h2>
                        <p className="subtitle">
                            These are optional identifiers that can be used to look up your plant later.
                        </p>
                        <label><span>A new serial number:</span>
                            <input
                                type="text"
                                placeholder="must be unique!"
                                id="add-individual-serial"
                                className=""
                            />
                        </label>
                        <label><span>Nickname:</span>
                            <input
                                type="text"
                                placeholder="nickname"
                                id="add-individual-nickname"
                                className=""
                            />
                        </label>
                    </div>
                    {/*
                      Identification section
                     */}
                    <div className="form-section identify-section">
                        <h2>Identify your plant</h2>
                        <p className="subtitle">
                            Assign a taxon to your individual.
                        </p>
                        <label className="varieties"><span>Your plant varieties:</span>
                            <select defaultValue="">
                                <option value="" disabled>Select...</option>
                                { userPlantVarietyOptions }
                            </select>
                        </label>
                        <button
                            onClick=""
                            className="button primary-button new-variety"
                        >
                            Add new
                        </button>
                        <div className="form-subsection new-variety-subsection">
                            <h3>New variety:</h3>
                            <label><span>Family:</span>
                                <input
                                    type="text"
                                    placeholder="family"
                                    id="add-variety-family"
                                    className=""
                                />
                            </label>
                            <label className="split"><span>Genus:</span>
                                <input
                                    type="text"
                                    placeholder="genus"
                                    id="add-variety-genus"
                                    className=""
                                />
                            </label>
                            <label className="split"><span>Species:</span>
                                <input
                                    type="text"
                                    placeholder="species"
                                    id="add-variety-species"
                                    className=""
                                />
                            </label>
                            <label className="split"><span>Subspecies:</span>
                                <input
                                    type="text"
                                    placeholder="subspecies"
                                    id="add-variety-subspecies"
                                    className=""
                                />
                            </label>
                            <label className="split"><span>Variety:</span>
                                <input
                                    type="text"
                                    placeholder="variety"
                                    id="add-variety-variety"
                                    className=""
                                />
                            </label>
                            <label><span>Origin:</span>
                                <input
                                    type="text"
                                    placeholder="e.g. 'North America'"
                                    id="add-variety-origin"
                                    className=""
                                />
                            </label>
                            <label><span>Variety description:</span>
                                <textarea placeholder="500 character limit."></textarea>
                            </label>
                        </div>{/* End of new-variety-subsection */}
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
                                { userPlantVarietyOptions }
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
                                { userPlantVarietyOptions }
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
                                { userPlantVarietyOptions }
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
                                { userPlantVarietyOptions }
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
                                { userPlantVarietyOptions }
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
                                { userPlantVarietyOptions }
                            </select>
                        </label>
                        <button
                            onClick=""
                            className="button primary-button new-requirement"
                        >
                            Add new
                        </button>
                    </div>{/* form-section */}
                    <button className="button primary-button">Add plant</button>
                </div>{/* add-individual-form */}
            </main>
            </React.Fragment>
        );

    }
}

