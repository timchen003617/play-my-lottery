import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createRootReducer from '../reducers'
import createSagaMiddleware, { END } from 'redux-saga'

export const history = createBrowserHistory()

const configureStore = preloadedState => {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
      createRootReducer(history), // root reducer with router state
      preloadedState,
      compose(
        composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
      )
    )

    store.runSaga = sagaMiddleware.run
    store.close = () => store.dispatch(END)

    return store
  }
  
  export default configureStore
