import { hot } from "react-hot-loader"
import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './themes/MuiThemes'
import LoginPage from './containers/Login/LoginPage'
import { MainPage } from './containers/common'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './store/configureStore'

const Root = ({ store }) => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
            <Switch>
                <Route exact path='/login' component={LoginPage} />
                <Route path='/' component={MainPage} />
            </Switch>
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default hot(module)(Root)