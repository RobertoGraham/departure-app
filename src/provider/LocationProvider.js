import React, { useReducer, createContext } from "react";
import { SET_LOCATION } from "../constant";

export const LocationContext = createContext();

const initialState = {
  coordinates: {}
};

function reducer(state, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        coordinates: action.payload
      };
    default:
      return state;
  }
}

export function LocationProvider(props) {
  const value = useReducer(reducer, initialState);

  return (
    <LocationContext.Provider value={value}>
      {props.children}
    </LocationContext.Provider>
  );
}
