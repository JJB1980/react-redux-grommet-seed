import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import services from './services'

const logger = createLogger({
  level: 'info',
  collapsed: true
})

const thunkWithExtra = thunk.withExtraArgument(services)
const applyStore = applyMiddleware(thunkWithExtra, logger)(createStore)

export default function configureStore (state) {
  const store = applyStore(reducer, state)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers'); // eslint-disable-line
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
