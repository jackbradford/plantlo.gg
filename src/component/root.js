import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterContainer from '../container/register-container';
import ActivateContainer from '../container/activate-container';
import Home from './pages/home';

/**
 * Root
 * This is the root of the app. It contains everything except the front-end
 * router. It does, however, define the routes.
 *
 */
export default class Root extends Component {

    componentDidMount() {

        this.props.checkUserIsLoggedIn();
        if (this.props.user.details.isLoggedIn === true) {
            this.props.loadPlants(this.props.user.details.userId);
        }
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
            </React.Fragment>
        );
    }
}

