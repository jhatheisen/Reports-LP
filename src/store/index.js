import { applyMiddleware, compose } from 'redux';
const logger = require("redux-logger").default;
const composeEnhancers = 
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(logger));

export const configureStore = () => {
  return;
};

export default configureStore;