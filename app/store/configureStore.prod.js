import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'
import { reducer as formReducer } from 'redux-form'

const configureStore = preloadedState => createStore(
  rootReducer,
  formReducer,
  preloadedState,
  applyMiddleware(thunk, api)
)

export default configureStore
