import React, { useReducer, createContext } from 'react'

export const Store = createContext();

const initialState = {
    places: null,
    location: null,
    departures: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'RECEIVED_PLACES':
            return { ...state, places: action.payload };
        case 'RECEIVED_LOCATION':
            return { ...state, location: action.payload };
        case 'RECEIVED_DEPARTURES':
            return { ...state, departures: { ...state.departures, [action.payload.atcocode]: action.payload } }
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