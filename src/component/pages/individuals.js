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

class Individuals extends Component {

    componentDidMount() {

    }

    render() {

        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="individuals">
                <h1>Individuals</h1>
                <List
                    data={this.props.individuals.data}
                    filter={this.props.individuals.filter}
                    layout={this.props.individuals.layout}
                    sort={this.props.individuals.sort}
                />
            </main>
            <footer></footer>
            </React.Fragment>
        );
    }
}

export default withRouter(Individuals);

