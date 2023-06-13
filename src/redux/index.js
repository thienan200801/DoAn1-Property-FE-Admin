import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddlewareSaga from "redux-saga";

import AdministrativeReducer from "./reducer/AdministrativeReducer";
import ContactReducer from "./reducer/ContactReducer";
import LoadingReducer from "./reducer/LoadingReducer";
import PostReducer from "./reducer/PostReducer";
import PropertyReducer from "./reducer/PropertyReducer";
import UserReducer from "./reducer/UserReducer";

import rootSaga from "./sagas/rootSaga";

const middlewareSaga = createMiddlewareSaga();
const rootReducer = combineReducers({
  LoadingReducer,
  AdministrativeReducer,
  UserReducer,
  PropertyReducer,
  ContactReducer,
  PostReducer,
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

middlewareSaga.run(rootSaga);

export { store };
