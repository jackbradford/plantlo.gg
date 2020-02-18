import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import { mediator }  from './mediator';
import { asyncHandler } from './async';
import Home from './component/pages/home';
import RegisterContainer from './container/register-container';

console.log('Running plantlogg.js');
if (process.env.NODE_ENV !== 'production') {

    console.log('Plantlogg.js running in DEVELOPMENT mode.');
}

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk
    )
);
const history = syncHistoryWithStore(createBrowserHistory(), store);

/**
 * App
 * This is the main React component for the front-end app.
 *
 */
class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Root />
                </Router>
            </Provider>
        );
    }
}

/**
 * Root
 * This is the root of the app. It contains everything except the front-end
 * router. It does, however, define the routes.
 *
 */
class Root extends Component {

    render() {

        return (
            <React.Fragment>
                <Route exact path='/' component={Home} />
                <Route path='/test' component={Test} />
                <Route path='/register' component={RegisterContainer} />
                <Route exact path='/activate' component={Test} />
                <Route path='/activate/:userId/:code' component={Test} />
            </React.Fragment>
        );
    }
}

/**
 * Test
 * This was written to test the router.
 *
 */
class Test extends Component {

    render() {

        return (
            <div>
                <h2>Test</h2>
            </div>
        );
    }
}

ReactDOM.render( <App />, document.getElementById('plantlogg') );

