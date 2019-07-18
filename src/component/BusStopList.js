import React, { useEffect, useContext } from 'react';
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import BusStopListItem from './BusStopListItem';
import { geolocated } from "react-geolocated";
import { LocationContext } from '../provider/LocationProvider';
import { BusStopContext } from '../provider/BusStopProvider';

function BusStopList({ coords }) {
    const [{ coordinates }, dispatchLocationAction] = useContext(LocationContext);
    const [{ busStops, busStopsReceived, fetchingBusStops }, dispatchBusStopAction] = useContext(BusStopContext);

    useEffect(() => {
        const setLocationAction = (coords) => {
            return {
                type: 'SET_LOCATION',
                payload: coords
            }
        }

        if (coords) {
            dispatchLocationAction(setLocationAction(coords));
        }
    }, [coords, dispatchLocationAction]);

    useEffect(() => {
        const requestBusStopsAction = () => {
            return {
                type: 'BUS_STOPS_REQUESTED'
            };
        };

        const receiveBusStopsAction = (busStops) => {
            return {
                type: 'BUS_STOPS_RECEIVED',
                payload: busStops
            };
        };

        const errorFetchingBusStopsAction = () => {
            return {
                type: 'BUS_STOPS_ERROR'
            };
        };

        const shouldFetchBusStops = () => {
            return !busStopsReceived
                && coordinates
                && !fetchingBusStops;
        };

        const fetchBusStops = async () => {
            dispatchBusStopAction(requestBusStopsAction());
            try {
                const response = await fetch(`/api/busStops?latitude=${encodeURIComponent(coordinates.latitude)}&longitude=${encodeURIComponent(coordinates.longitude)}`);
                if (200 === response.status) {
                    const busStops = await response.json();
                    dispatchBusStopAction(receiveBusStopsAction(busStops));
                } else {
                    dispatchBusStopAction(errorFetchingBusStopsAction());
                }
            } catch (error) {
                dispatchBusStopAction(errorFetchingBusStopsAction());
            }
        }

        const fetchBusStopsIfNeeded = () => {
            if (shouldFetchBusStops()) {
                fetchBusStops();
            }
        };

        fetchBusStopsIfNeeded();
    }, [coordinates, busStops, dispatchBusStopAction, fetchingBusStops, busStopsReceived]);

    return (
        <Grid align="left">
            {busStops.sort((busStop1, busStop2) => busStop1.name.localeCompare(busStop2.name))
                .map(busStop =>
                    <GridCell desktop={4} phone={4} tablet={4} align="top" key={busStop.id}>
                        <BusStopListItem {...busStop} />
                    </GridCell>)}
        </Grid>
    )
}

export default geolocated({ userDecisionTimeout: 5000 })(BusStopList);