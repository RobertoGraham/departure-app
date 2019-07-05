import React, { useEffect, useContext, useState } from 'react';
import { Store } from './Store';
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import BusStopListItem from './BusStopListItem';
import { geolocated } from "react-geolocated";

function BusStopList({ coords, isGeolocationAvailable, isGeolocationEnabled, positionError }) {
    const [fetchingPlaces, setFetchingPlaces] = useState(false);
    const [{ location, busStops }, dispatch] = useContext(Store);

    useEffect(() => {
        if (coords)
            dispatch({
                type: 'RECEIVED_LOCATION',
                payload: { coords }
            });
    }, [coords, dispatch]);

    useEffect(() => {
        async function fetchBusStops() {
            const { coords } = location;
            const data = await fetch(`/api/busStops?latitude=${encodeURIComponent(coords.latitude)}&longitude=${encodeURIComponent(coords.longitude)}`);
            const dataJson = await data.json();
            dispatch({
                type: 'RECEIVED_BUS_STOPS',
                payload: dataJson
            });
        }

        if (busStops.length === 0 && location && !fetchingPlaces) {
            setFetchingPlaces(true);
            fetchBusStops();
        }
    }, [location, busStops, dispatch, fetchingPlaces]);

    return (
        <Grid align="left">
            {busStops.sort((busStop1, busStop2) => busStop1.name.localeCompare(busStop2.name))
                .map(busStop =>
                    <GridCell desktop={3} phone={4} tablet={4} align="top" key={busStop.id}>
                        <BusStopListItem {...busStop} />
                    </GridCell>)}
        </Grid>
    )
}

export default geolocated({ userDecisionTimeout: 5000 })(BusStopList);