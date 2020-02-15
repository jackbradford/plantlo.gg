/**
 * This file provides Plantlogg's homepage.
 *
 */
import React, { Component } from 'react';
import HeaderContainer from '../../container/header-container';


export default class Home extends Component {

    render() {

        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="home">
                <p>Homepage</p>
            </main>
            <footer></footer>
            </React.Fragment>
        );
    }
}

