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


export default class ModalBox extends Component {

    componentDidMount() {

        var element = document.getElementById(this.props.id);
        element.style.left = 0;
    }

    redirect() {

        var addr = this.props.redirect;
        this.props.history.push(addr);
    }

    closeModal() {

        var element = document.getElementById(this.props.id);
        element.style.left = '100%';
    }

    render() {

        var classes = 'modal ';
        var okayId = this.props.id + '-confirm-button';
        var src, alt, okay, okayClass;

        if (this.props.type == 'success') {
            classes += "success-modal";
            src = "img/valid.svg";
            alt = "A green checkmark.";
            okayClass = "button primary-button";
        }
        if (this.props.type == 'error') {
            classes += "error-modal";
            src = "img/error.svg";
            alt = "An orange warning sign.";
            okayClass = "button error-button";
        }
        if (this.props.redirect != undefined) {

            okay = (
                <div
                    className={okayClass}
                    onClick={this.redirect.bind(this)}
                    id={okayId}
                >
                    Okay
                </div>
            );
        }
        else if (this.props.reset != undefined) {

            okay = (
                <div
                    className={okayClass}
                    onClick={this.props.reset}
                    id={okayId}
                >
                    Okay
                </div>
            );
        }
        else {

            okay = (
                <div
                    className={okayClass}
                    onClick={this.closeModal.bind(this)}
                    id={okayId}
                >
                    Dismiss
                </div>
            );
        }

        return (
            <React.Fragment>
            <div className={classes} id={this.props.id}>
                <div className="rel-abs-container">
                <div className="rel-abs-inner">
                <img src={src} alt={alt} />
                <h1>{ this.props.title }</h1>
                <p>{ this.props.message }</p>
                { okay }
                </div></div>
            </div>
            </React.Fragment>
        );
    }
}

