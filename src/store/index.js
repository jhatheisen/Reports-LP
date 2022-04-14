import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reportsReducer from './reports';

/*
Write a `rootReducer`. It should set up a `reports` slice of state that
delegates to the `reportsReducer`, which has been imported for you.
*/

/*
Export a `configureStore` function. The function should take in a
`preloadedState` parameter that defaults to `{}`. The function should also
return a store created with the `rootReducer`, `preloadedState`, and `thunk`
middleware. 

For debugging purposes, you may include `logger` and the Redux DevTools if you
want, but this is not required. Commented-out code has been included below to
make it easier for you to include these features. Note, however, that the simple
act of uncommenting these lines will not, in and of itself, include these
features.

You do *NOT* need to set up separate production and development environments.
*/

// Uncommenting the 3 lines below will help if you want to include logger and/or
// the Redux DevTools:
//
// const logger = require("redux-logger").default;
// const composeEnhancers =
//    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;