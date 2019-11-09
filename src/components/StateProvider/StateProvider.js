/* eslint-disable react/forbid-prop-types */
import React, { createContext, useContext, useReducer } from 'react';
import {
  func, objectOf, object, oneOfType, node, any,
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
  initialState: any.isRequired,
  children: oneOfType([
    node,
    func,
    objectOf(object),
  ]).isRequired,
};
