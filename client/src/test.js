import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Switch, Route, Router } from 'react-router'

import reducers from './reducers' // Or wherever you keep your reducers

import { Home } from './Home.js'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        reducers: reducers
    })
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'));

export default function() {
    return ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
}
