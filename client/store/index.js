// third-party libraries
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import combinedReducers from '../reducers';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = composeEnhancers(
  applyMiddleware(...middleware)
)(createStore);

export default configureStore(combinedReducers);
