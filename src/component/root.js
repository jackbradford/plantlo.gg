import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterContainer from '../container/register-container';
import ActivateContainer from '../container/activate-container';
import AddIndividualContainer from '../container/add-individual-container';
import Home from './pages/home';

/**
 * Root
 * This is the root of the app. It contains everything except the front-end
 * router. It does, however, define the routes.
 *
 */
export default class Root extends Component {

    constructor(props) {
        super(props);
        this.props.checkUserIsLoggedIn();
    }

    componentDidMount() {

        this.props.loadUserAndAppData();
    }

    render() {

        return (
            <React.Fragment>
                <Route exact path='/' component={Home} />
                <Route
                    path='/register'
                    render={ props => <RegisterContainer {...props} />}
                />
                <Route exact path='/activate' component={ActivateContainer} />
                <Route path='/activate/:userId/:code' component={ActivateContainer} />
                <Route path='/plants/individuals/add' component={AddIndividualContainer} />
            </React.Fragment>
        );
    }
}

