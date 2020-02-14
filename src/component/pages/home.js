/**
 * This file provides Plantlogg's homepage.
 *
 */
import React, { Component } from 'react';
import Header from '../header';


export default class Home extends Component {

    render() {

        return (
            <React.Fragment>
            <Header />
            <main className="home">
                <p>Homepage</p>
            </main>
            <footer></footer>
            </React.Fragment>
        );
    }
}

