import React, { useContext, useEffect } from "react";
import { BusStopDepartureContext } from "../provider/BusStopDepartureProvider";
import "@rmwc/data-table/data-table.css";
import { SimpleDataTable } from "@rmwc/data-table";

function DepartureList({ busStop }) {
  const [
    { busStopDeparturesMap, fetchingBusStopDepartures },
    dispatchBusStopDepartureAction
  ] = useContext(BusStopDepartureContext);
  const busStopDepartures = busStopDeparturesMap[busStop.id];

  useEffect(() => {
    const requestBusStopDeparturesAction = () => {
      return {
        type: "BUS_STOP_DEPARTURES_REQUESTED"
      };
    };

    const receiveBusStopDeparturesAction = busStopDepartures => {
      return {
        type: "BUS_STOP_DEPARTURES_RECEIVED",
        payload: { busStopId: busStop.id, busStopDepartures }
      };
    };

    const errorFetchingBusStopDeparturesAction = () => {
      return {
        type: "BUS_STOP_DEPARTURES_ERROR"
      };
    };

    const shouldFetchBusStopDepartures = () => {
      return !busStopDepartures && !fetchingBusStopDepartures;
    };

    const fetchBusStopDepartures = async () => {
      dispatchBusStopDepartureAction(requestBusStopDeparturesAction());
      try {
        const response = await fetch(`/api/busStops/${busStop.id}/departures`);
        if (200 === response.status) {
          const busStopDepartures = await response.json();
          dispatchBusStopDepartureAction(
            receiveBusStopDeparturesAction(busStopDepartures)
          );
        } else {
          dispatchBusStopDepartureAction(
            errorFetchingBusStopDeparturesAction()
          );
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
  }, [
    busStopDepartures,
    fetchingBusStopDepartures,
    dispatchBusStopDepartureAction,
    busStop
  ]);

  return (
    <React.Fragment>
      {busStopDepartures ? (
        <SimpleDataTable
          getCellProps={(_cell, _index, isHead) => {
            return {
              theme: isHead
                ? "textSecondaryOnBackground"
                : "textPrimaryOnBackground"
            };
          }}
          headers={[["Service", "Destination", "Time"]]}
          data={busStopDepartures.map(busStopDeparture => [
            busStopDeparture.lineName,
            busStopDeparture.destination,
            new Date(busStopDeparture.epochSecond * 1000).toLocaleTimeString()
          ])}
        />
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
}

export default DepartureList;
