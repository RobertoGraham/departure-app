import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../provider/StoreProvider';
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import BusStopListItem from './BusStopListItem';
import { geolocated } from "react-geolocated";

function BusStopList({ coords, isGeolocationAvailable, isGeolocationEnabled, positionError }) {
    const [{ location, busStops, busStopsReceived, fetchingBusStops }, dispatch] = useContext(StoreContext);

    useEffect(() => {
        if (coords) {
            dispatch({
                type: 'SET_LOCATION',
                payload: { coords }
            });
        }
    }, [coords, dispatch]);

    useEffect(() => {
        const setFetchingBusStops = () => {
            return {
                type: 'FETCHING_BUS_STOPS'
            };
        }

        const receiveBusStops = (busStops) => {
            return {
                type: 'BUS_STOPS_RECEIVED',
                payload: busStops
            };
        };

        const fetchBusStops = async () => {
            dispatch(setFetchingBusStops());
            const { coords } = location;
            const response = await fetch(`/api/busStops?latitude=${encodeURIComponent(coords.latitude)}&longitude=${encodeURIComponent(coords.longitude)}`);
            const busStops = await response.json();
            dispatch(receiveBusStops(busStops));
        };

        if (!busStopsReceived && location && !fetchingBusStops) {
            fetchBusStops();
        }
    }, [location, busStops, dispatch, fetchingBusStops, busStopsReceived]);

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