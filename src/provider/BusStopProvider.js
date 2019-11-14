import React, { useReducer, createContext } from "react";
import {
  BUS_STOPS_REQUESTED,
  BUS_STOP_REQUESTED,
  BUS_STOPS_RECEIVED,
  BUS_STOP_RECEIVED,
  BUS_STOPS_ERROR,
  BUS_STOP_ERROR
} from "../constant";

export const BusStopContext = createContext();

const initialState = {
  busStops: [],
  busStopsReceived: false,
  fetchingBusStops: false,
  fetchingBusStop: false
};

function reducer(state, action) {
  switch (action.type) {
    case BUS_STOPS_REQUESTED:
      return { ...state, fetchingBusStops: true };
    case BUS_STOP_REQUESTED:
      return { ...state, fetchingBusStop: true };
    case BUS_STOPS_RECEIVED:
      const existingBusStopIds = state.busStops.map(busStop => busStop.id);
      return {
        ...state,
        busStops: [
          ...action.payload.filter(
            busStop => !existingBusStopIds.includes(busStop.id)
          ),
          ...state.busStops
        ],
        busStopsReceived: true,
        fetchingBusStops: false
      };
    case BUS_STOP_RECEIVED:
      return {
        ...state,
        busStops: [
          ...state.busStops.filter(busStop => action.payload.id !== busStop.id),
          action.payload
        ],
        fetchingBusStop: false
      };
    case BUS_STOPS_ERROR:
      return { ...state, fetchingBusStops: false };
    case BUS_STOP_ERROR:
      return { ...state, fetchingBusStop: false };
    default:
      return state;
  }
}

export function BusStopProvider(props) {
  const value = useReducer(reducer, initialState);

  return (
    <BusStopContext.Provider value={value}>
      {props.children}
    </BusStopContext.Provider>
  );
}
