import reducers  from "./reducers/index";
import thunk from "redux-thunk" 
import { createStore, applyMiddleware } from 'redux';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
