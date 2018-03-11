import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Switch, Route, Router } from 'react-router'

import store from './store'

import Home from './Components/Home.js'
import ExamplesPage from './Components/ExamplesPage.js'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

export default function() {
    return ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/examples" component={ExamplesPage} />
                </Switch>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
}
