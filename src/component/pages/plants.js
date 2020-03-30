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

class Plants extends Component {

    componentDidMount() {

    }

    render() {

        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="plants-page">
                <h1>Your Plants</h1>
                <h2>By variety:</h2>
                <button>See all</button>
                <List
                    data={this.props.taxa.data}
                    filter={this.props.taxa.filter}
                    layout={this.props.taxa.layout}
                    sort={this.props.taxa.sort}
                />
                <h2>By individual:</h1>
                <button>See all</button>
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

export default withRouter(Plants);

