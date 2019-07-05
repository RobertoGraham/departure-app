import React, { useReducer, createContext } from 'react'

export const Store = createContext();

const initialState = {
    busStops: [],
    location: null,
    busStopDepartures: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'RECEIVED_BUS_STOPS':
            return { ...state, busStops: action.payload };
        case 'RECEIVED_LOCATION':
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
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    );
}