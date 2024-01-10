import {createStore,combineReducers } from 'redux'
import userReducer from './reducer.js';



const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if needed
});

const localStorageState = localStorage.getItem('reduxState');
const initialState = localStorageState ? JSON.parse(localStorageState) : {};

const store = createStore(
  rootReducer,
  initialState,
);

// Subscribe to state changes and save to localStorage
store.subscribe(() => {
  const stateToSave = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(stateToSave));
});




export default store;
  