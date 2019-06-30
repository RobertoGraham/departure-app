import React, { useEffect, useContext, useState } from 'react';
import { Store } from './Store';
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import BusStopListItem from './BusStopListItem';

function BusStopList() {
    const [fetchingPlaces, setFetchingPlaces] = useState(false);
    const [{ location, places }, dispatch] = useContext(Store);

    useEffect(() => {
        async function fetchPlaces() {
            const { coords } = location;
            const data = await fetch(`/api/places/busStops?latitude=${encodeURIComponent(coords.latitude)}&longitude=${encodeURIComponent(coords.longitude)}`);
            const dataJson = await data.json();
            dispatch({
                type: 'RECEIVED_PLACES',
                payload: dataJson
            })
        }

        if (!places && location && !fetchingPlaces) {
            setFetchingPlaces(true);
            fetchPlaces();
        }
    }, [location, places, dispatch, fetchingPlaces]);

    return (
        <Grid align="left">
            {places && places.member ?
                places.member.map(member =>
                    <GridCell span={4} align="top" key={member.atcocode}>
                        <BusStopListItem {...member} />
                    </GridCell>)
                : <React.Fragment />}
        </Grid>
    )
}

export default BusStopList;