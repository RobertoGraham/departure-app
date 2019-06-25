import React, { useEffect, useContext, useState } from 'react';
import { Store } from './Store';
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
        <React.Fragment>
            {places && places.member ?
                <div>
                    {places.member.map(member => <BusStopListItem key={member.atcocode} {...member} />)}
                </div>
                : <React.Fragment />}
        </React.Fragment>
    )
}

export default BusStopList;