import { createStore, applyMiddleware, compose } from "redux";
import createDebounce from "redux-debounced";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import  history  from '../history'
import { routerMiddleware } from "connected-react-router";

const middlewares = [thunk, createDebounce()];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
  rootReducer(history),
  {},
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    ...middlewares))
);

export { Store };