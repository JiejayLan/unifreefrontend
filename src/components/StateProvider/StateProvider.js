import React, { createContext, useContext, useReducer } from 'react';
import {
  func, objectOf, object, instanceOf,
} from 'prop-types';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

StateProvider.propTypes = {
  reducer: func.isRequired,
  initialState: objectOf(object).isRequired,
  children: instanceOf(Array).isRequired,
};
