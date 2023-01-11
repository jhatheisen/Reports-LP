import { applyMiddleware, compose, createStore, combineReducers} from 'redux';
import reportsReducer from './reports';

const rootReducer = combineReducers({
  reports: reportsReducer
});

const logger = require("redux-logger").default;
const composeEnhancers =
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(logger));

export const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
