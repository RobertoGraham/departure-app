import React, { useContext, useEffect, useState } from 'react';
import { BusStopDepartureContext } from '../provider/BusStopDepartureProvider';
import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.css';
import { BusStopContext } from '../provider/BusStopProvider';

function DeparturesBoard({ match }) {
    const [{ busStopDeparturesMap, fetchingBusStopDepartures }, dispatchBusStopDepartureAction] = useContext(BusStopDepartureContext);
    const { params } = match;
    const { id } = params;
    const busStopDepartures = busStopDeparturesMap[id];
    const [{ busStops, fetchingBusStop }, dispatchBusStopAction] = useContext(BusStopContext);
    const busStop = busStops.find(busStop => busStop.id === id);
    const [busStopExists, setBusStopExists] = useState(true);

    useEffect(() => {
        const requestBusStopAction = () => {
            return {
                type: 'BUS_STOP_REQUESTED'
            }
        };

        const receiveBusStopAction = (busStop) => {
            return {
                type: 'BUS_STOP_RECEIVED',
                payload: busStop
            };
        };

        const errorFetchingBusStopAction = () => {
            return {
                type: 'BUS_STOP_ERROR'
            };
        };

        const shouldFetchBusStop = () => {
            return !busStop
                && busStopExists
                && !fetchingBusStop;
        };

        const fetchBusStop = async () => {
            dispatchBusStopAction(requestBusStopAction());
            try {
                const response = await fetch(`/api/busStops/${id}`);
                if (200 === response.status) {
                    const busStop = await response.json();
                    dispatchBusStopAction(receiveBusStopAction(busStop))
                } else {
                    if (404 === response.status) {
                        setBusStopExists(false);
                    }
                    dispatchBusStopAction(errorFetchingBusStopAction());
                }
            } catch (error) {
                dispatchBusStopAction(errorFetchingBusStopAction());
            }
        };

        const fetchBusStopIfNeeded = () => {
            if (shouldFetchBusStop()) {
                fetchBusStop();
            }
        };

        fetchBusStopIfNeeded();
    }, [busStop, dispatchBusStopAction, fetchingBusStop, id, busStopExists])

    useEffect(() => {
        const requestBusStopDeparturesAction = () => {
            return {
                type: 'BUS_STOP_DEPARTURES_REQUESTED'
            };
        };

        const receiveBusStopDeparturesAction = (busStopDepartures) => {
            return {
                type: 'BUS_STOP_DEPARTURES_RECEIVED',
                payload: { busStopId: id, busStopDepartures }
            };
        };

        const errorFetchingBusStopDeparturesAction = () => {
            return {
                type: 'BUS_STOP_DEPARTURES_ERROR'
            };
        };

        const shouldFetchBusStopDepartures = () => {
            return busStop
                && !busStopDepartures
                && !fetchingBusStopDepartures;
        };

        const fetchBusStopDepartures = async () => {
            dispatchBusStopDepartureAction(requestBusStopDeparturesAction());
            try {
                const response = await fetch(`/api/busStops/${id}/departures`);
                if (200 === response.status) {
                    const busStopDepartures = await response.json();
                    dispatchBusStopDepartureAction(receiveBusStopDeparturesAction(busStopDepartures));
                } else {
                    dispatchBusStopDepartureAction(errorFetchingBusStopDeparturesAction());
                }
            } catch (error) {
                dispatchBusStopDepartureAction(errorFetchingBusStopDeparturesAction());
            }
        };

        const fetchBusStopDeparturesIfNeeded = () => {
            if (shouldFetchBusStopDepartures()) {
                fetchBusStopDepartures();
            }
        };

        fetchBusStopDeparturesIfNeeded();
    }, [busStopDepartures, fetchingBusStopDepartures, id, dispatchBusStopAction, dispatchBusStopDepartureAction, busStop]);

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