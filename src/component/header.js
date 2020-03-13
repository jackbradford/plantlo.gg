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

    attemptLogin(e) {

        this.props.attemptLogin(this.props.history);
    }

    componentDidMount() {

        this.props.resetLoginMessage();
    }

    getAccountSection() {

        var user = this.props.user;
        var html = '';
        if (user.details.isLoggedIn === true) {

            html = (
                <div className="menu-user-account">

                </div>
            );
        }
        return html;
    }

    getUserMenuItems() {

        var user = this.props.user;
        var html = '';
        if (user.details.isLoggedIn === true) {

            html = (
                <React.Fragment>
                    <li>
                        <Link
                            to="/plants"
                            className="menu-link plants"
                        >
                            <span></span>
                            <span>Plants</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/gallery"
                            className="menu-link gallery"
                        >
                            <span></span>
                            <span>Gallery</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/account"
                            className="menu-link account"
                        >
                            <span></span>
                            <span>Account</span>
                        </Link>
                    </li>
                </React.Fragment>
            );
        }
        return html;
    }

    goToHomepage() {

        this.props.history.push('/');
    }

    handleKeyPress(e) {

        if (e.key === 'Enter') this.props.attemptLogin(this.props.history);
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

    render() {

        var navClass = this.toggleMenu.bind(this)();
        var userMenuItems = this.getUserMenuItems.bind(this)();
        var accountSection = this.getAccountSection.bind(this)();
        return (

            <React.Fragment>
            <header id="app-header">
                <div>
                    <img
                        className="logo-name"
                        src="/img/logo-concept-text.svg"
                        alt="plantlogg's flower logo"
                        onClick={this.goToHomepage.bind(this)}
                    />
                    <button className="menu secondary-button button" onClick={this.props.toggleMenu}>
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
                            placeholder="password"
                            onKeyPress={this.handleKeyPress.bind(this)}
                        />
                        <input
                            className="primary-button button"
                            type="submit"
                            value="Log in"
                            onClick={this.attemptLogin.bind(this)}
                        />
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
                    <ul className="menu-items">
                        <li>
                            <Link
                                to="/"
                                className="menu-link home"
                            >
                                <span></span>
                                <span>home</span>
                            </Link>
                        </li>
                        {userMenuItems}
                        <li>
                            <Link
                                to="/about"
                                className="menu-link about"
                            >
                                <span></span>
                                <span>about</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/help"
                                className="menu-link help"
                            >
                                <span></span>
                                <span>help</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);

