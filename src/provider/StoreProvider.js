import React, { useReducer, createContext, useState } from 'react'

export const StoreContext = createContext();

const initialState = {
    busStops: [],
    location: null,
    busStopDepartures: {},
    busStopsReceived: false,
    fetchingBusStops: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCHING_BUS_STOPS':
            return { ...state, fetchingBusStops: true };
        case 'BUS_STOPS_RECEIVED':
            const existingBusStopIds = state.busStops.map(busStop => busStop.id);
            return {
                ...state,
                busStops: [
                    ...action.payload.filter(busStop => !existingBusStopIds.includes(busStop.id)),
                    ...state.busStops
                ],
                busStopsReceived: true,
                fetchingBusStops: false
            };
        case 'SET_LOCATION':
            return { ...state, location: action.payload };
        case 'RECEIVED_BUS_STOP_DEPARTURES': {
            const { busStopId, busStopDepartures } = action.payload;
            if (busStopDepartures.error)
                return state;
            return {
                ...state,
                busStops: [
                    ...state.busStops.filter(busStop => busStopId !== busStop.id),
                    busStopDepartures.busStop
                ],
                busStopDepartures: {
                    ...state.busStopDepartures,
                    [busStopId]: busStopDepartures.departures
                }
            }
        }
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const value = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}