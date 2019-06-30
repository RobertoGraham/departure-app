import React, { useState, useContext, useEffect } from 'react';
import { Store } from './Store';
import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.css';
import { Card } from '@rmwc/card';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';

function BusStopListItem({ name, atcocode, description }) {
    const [fetchingDepartures, setFetchingDepartures] = useState(false);
    const [{ departures }, dispatch] = useContext(Store);

    useEffect(() => {
        async function fetchDepartures() {
            const data = await fetch(`/api/bus/departures/${atcocode}`);
            const dataJson = await data.json();
            dispatch({
                type: 'RECEIVED_DEPARTURES',
                payload: dataJson
            })
        }

        if (!departures[atcocode] && !fetchingDepartures) {
            setFetchingDepartures(true);
            fetchDepartures();
        }
    }, [departures, dispatch, fetchingDepartures, atcocode]);

    const atcoCodeDepartures = departures[atcocode];

    return (
        <Card>
            <div style={{ padding: '0 1rem' }}>
                <Typography
                    use="headline6"
                    tag="h2"
                    theme="textPrimaryOnBackground"
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                    {name}
                </Typography>
                <Typography
                    use="subtitle2"
                    tag="h3"
                    theme="textSecondaryOnBackground"
                    style={{
                        marginTop: '-1rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                    {atcoCodeDepartures ? atcoCodeDepartures.locality : description}
                </Typography>
            </div>
        </Card>
    );
}

export default BusStopListItem;