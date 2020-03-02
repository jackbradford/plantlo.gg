/**
 * This file provides Plantlogg's activation page.
 * The activation links emailed to new users will refer to this page.
 *
 */
import React, { Component } from 'react';
import HeaderContainer from '../../container/header-container';
import { withRouter } from 'react-router'; 
import { TailSpin } from "svg-loaders-react"
import ModalBox from '../modal-box';

class Activate extends Component {

    componentDidMount() {

        // take userId and activation code and contact server.
        // set isActivating to true.
        var userId = this.props.match.params.userId;
        var code = this.props.match.params.code;
        console.log(this.props);
        this.props.attemptActivateUser(userId, code);
        this.props.resetMenuExpand();
    }

    getNewActivationLink() {

        var userId = this.props.match.params.userId;
        this.props.attemptGenerateNewActivationLink(userId);
    }

    goToHomePage() {

        this.props.history.push('/');
    }

    resetGenerateLink() {

        this.props.resetGenerateNewLink();
    }

    render() {

        var content, linkModal;
        console.log(this.props.isActivating);
        if (this.props.isActivating === true) {

            content = (
                <div className="svg-container">
                    <TailSpin />
                </div>
            );
        }
        else if (this.props.success === true) {

            content = (
                <div>
                    <h1>Your account is active!</h1>
                    <p>Thank you for joining PlantLogg.</p>
                    <button
                        className="primary-button"
                        onClick={this.goToHomePage.bind(this)}
                    >
                        Onward
                    </button>
                </div>
            );
        }
        else if (this.props.success === false) {

            content = (
                <div>
                    <h1>Sorry! Your account could not be activated.</h1>
                    <p>Server said: {this.props.serverMessage}</p>
                    <p>For a new activation link, click below:</p>
                    <button
                        className="primary-button"
                        onClick={this.getNewActivationLink.bind(this)}
                    >
                        Send New Link
                    </button>
                </div>
            );
        }
        else {

            content = (
                <div></div>
            );
        }

        if (this.props.newLink.success === true) {
            linkModal = (
                <ModalBox
                    id="new-link-generated"
                    type="success"
                    history={this.props.history}
                    redirect="/login"
                    title="Check your email!"
                    message="We've sent you a new account activation link. Use it to confirm your account."
                />
            );
        }
        else if (this.props.newLink.success === false) {
            console.log("ERROR");
            var message = "We couldn't generate a new account activation link. Please try again later."
            if (this.props.newLink.serverMessage != '') {
                message += " (" + this.props.newLink.serverMessage + ")";
            }
            linkModal = (
                <ModalBox
                    id="new-link-generated"
                    type="error"
                    reset={this.resetGenerateLink.bind(this)}
                    title="Error"
                    message={message}
                />
            );
        }

        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="activate">
                { content }
                { linkModal }
            </main>
            <footer></footer>
            </React.Fragment>
        );
    }
}

export default withRouter(Activate);

