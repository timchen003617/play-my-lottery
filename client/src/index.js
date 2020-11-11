import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import rootSaga from './sagas'
import configureStore from './store/configureStore'
import index from './index.css'
import { authRequest } from './actions/authorizationActions'

const preloadedState = window.__INITIAL_STATE__
const store = configureStore(preloadedState)

store.runSaga(rootSaga())


if (window.location.pathname !== '/login') {
    store.dispatch(authRequest())
}


ReactDOM.render(<Root store={store} />, document.getElementById('root'))

