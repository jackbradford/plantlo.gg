/**
 * This file provides Plantlogg's homepage.
 *
 */
import React, { Component } from 'react';

export default class Home extends Component {

    render() {

        return (
            <React.Fragment>
            <header>
                <nav></nav>
                <div className="login">
                    <input type="text" placeholder="your email" />
                    <input type="password" placeholder="password" />
                    <input type="submit" value="Login" />
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

