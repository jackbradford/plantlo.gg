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
                <div>
                    <img className="logo-name" src="img/plantlogg.svg" alt="plantlogg's flower logo" />
                    <span>Menu</span>
                </div>
                <nav></nav>
                <div className="login">
                    <input type="text" id="login-email" placeholder="your email" />
                    <input type="password" id="login-password" placeholder="password" />
                    <input type="submit" value="Login" onClick={auth.login}/>
                </div>
            </header>
            <main className="home">
            </main>
            <footer></footer>
            </React.Fragment>
        );
    }
}

