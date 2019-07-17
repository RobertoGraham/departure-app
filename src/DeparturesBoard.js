import React, { useState, useContext, useEffect } from 'react';
import { Store } from './Store';
import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.css';

function DeparturesBoard({ match }) {
    const [fetchingBusStopDepartures, setFetchingBusStopDepartures] = useState(false);
    const [{ busStopDepartures, busStops }, dispatch] = useContext(Store);
    const { params } = match;
    const { id } = params;

    useEffect(() => {
        async function fetchDepartures() {
            const data = await fetch(`/api/busStops/${id}/departures`);
            const dataJson = await data.json();
            dispatch({
                type: 'RECEIVED_BUS_STOP_DEPARTURES',
                payload: { busStopId: id, busStopDepartures: dataJson }
            });
        }

        if (!busStopDepartures[id] && !fetchingBusStopDepartures) {
            setFetchingBusStopDepartures(true);
            fetchDepartures();
        }
    }, [busStopDepartures, dispatch, fetchingBusStopDepartures, id]);

    const busStop = busStops.find(busStop => busStop.id === id);
    const departures = busStopDepartures[id];
    const titleText = busStop ? busStop.name : `No bus stop found with id: ${id}`;
    const subtitleText = busStop ? busStop.locality : '';
    return (
        <header style={{ padding: '0 1rem', textAlign: 'center' }}>
            <Typography
                use="headline6"
                tag="h2"
                theme="textPrimaryOnBackground"
                style={{
                    whiteSpace: 'wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                {titleText}
            </Typography>
            <Typography
                use="subtitle2"
                tag="h3"
                theme="textSecondaryOnBackground"
                style={{
                    marginTop: '-1rem',
                    whiteSpace: 'wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                {subtitleText}
            </Typography>
        </header>
    );
}

export default DeparturesBoard;