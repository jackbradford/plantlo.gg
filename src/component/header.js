/**
 * This file provides Plantlogg's app header.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import LoginError from './login-error';
import { mediator }  from '../mediator';
import { auth } from '../auth';
import { withRouter } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Header extends Component {

    componentDidMount() {

        this.props.resetLoginMessage();
    }

    attemptLogin(e) {

        this.props.attemptLogin(this.props.history);
    }

    toggleMenu() {

        var menu = document.getElementById('main-menu');
        var header = document.getElementById('app-header');
        var className = '';
        if (this.props.menuExpand === true) {

            className = "expanded";
        }
        return className;
    }

    goToRegister() {

        history.push('/register');
    }

    render() {

        var navClass = this.toggleMenu.bind(this)();
        return (

            <React.Fragment>
            <header id="app-header">
                <div>
                    <img
                        className="logo-name"
                        src="/img/plantlogg.svg"
                        alt="plantlogg's flower logo"
                    />
                    <button className="menu" onClick={this.props.toggleMenu}>
                        <img
                            src="/img/menu-disc-list.svg"
                            alt="Press here to open the main menu."
                        />
                    </button>
                </div>
                <nav id="main-menu" className={navClass}>
                    <div className="login">
                        <input
                            type="text"
                            id="login-email"
                            placeholder="your email"
                        />
                        <input
                            type="password"
                            id="login-password"
                            placeholder="password" />
                        <input 
                            className="primary-button"
                            type="submit"
                            value="Login"
                            onClick={this.attemptLogin.bind(this)} />
                    </div>
                    <LoginError errorMessage={this.props.loginMessage} />
                    <div className="register">
                        <h2>Not a member?</h2>
                        <Link to="/register" 
                            className="secondary-button button"
                        >
                            Join
                        </Link>
                    </div>
                </nav>
            </header>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);

