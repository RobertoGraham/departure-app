import React, { useReducer, createContext } from "react";
import {
  BUS_STOP_DEPARTURES_REQUESTED,
  BUS_STOP_DEPARTURES_RECEIVED,
  BUS_STOP_DEPARTURES_ERROR
} from "../constant";

export const BusStopDepartureContext = createContext();

const initialState = {
  busStopDeparturesMap: {},
  fetchingBusStopDepartures: false
};

function reducer(state, action) {
  switch (action.type) {
    case BUS_STOP_DEPARTURES_REQUESTED:
      return { ...state, fetchingBusStopDepartures: true };
    case BUS_STOP_DEPARTURES_ERROR:
      return { ...state, fetchingBusStopDepartures: false };
    case BUS_STOP_DEPARTURES_RECEIVED:
      const { busStopId, busStopDepartures } = action.payload;
      return {
        busStopDeparturesMap: {
          ...state.departureMap,
          [busStopId]: busStopDepartures
        },
        fetchingBusStopDepartures: false
      };
    default:
      return state;
  }
}

export function BusStopDepartureProvider(props) {
  const value = useReducer(reducer, initialState);

  return (
    <BusStopDepartureContext.Provider value={value}>
      {props.children}
    </BusStopDepartureContext.Provider>
  );
}
