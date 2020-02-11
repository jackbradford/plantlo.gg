/**
 * This file provides Plantlogg's homepage.
 *
 */
import React, { Component } from 'react';
import { mediator }  from '../../mediator';
import { auth } from '../../auth';

export default class Home extends Component {


    render() {

        return (
            <React.Fragment>
            <header>
                <nav></nav>
                <div className="login">
                    <input type="text" id="login-email" placeholder="your email" />
                    <input type="password" id="login-password" placeholder="password" />
                    <input type="submit" value="Login" onClick={auth.login}/>
                </div>
            </header>
            <main>
                <h1>Homepage</h1>
            </main>
            <footer></footer>
            </React.Fragment>
        );
    }
}

