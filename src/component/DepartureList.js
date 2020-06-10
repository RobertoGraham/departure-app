import React, { useContext, useEffect, useState } from "react";
import { BusStopDepartureContext } from "../provider/BusStopDepartureProvider";
import { Grid, GridCell } from "@rmwc/grid";
import "@rmwc/grid/styles";
import DepartureListItem from "./DepartureListItem";
import groupArray from "group-array";
import {
  receiveBusStopDepartures,
  requestBusStopDepartures,
  errorFetchingBusStopDepartures
} from "../action";

function DepartureList({ busStop }) {
  const [busStopDeparturesFetched, setBusStopDeparturesFetched] = useState(
    false
  );
  const [
    { busStopDeparturesMap, fetchingBusStopDepartures },
    dispatchBusStopDepartureAction
  ] = useContext(BusStopDepartureContext);
  const busStopDepartures = busStopDeparturesMap[busStop.id]
    ? busStopDeparturesMap[busStop.id]
    : [];

  useEffect(() => {
    const shouldFetchBusStopDepartures = () => {
      return !busStopDeparturesFetched && !fetchingBusStopDepartures;
    };

    const fetchBusStopDepartures = async () => {
      dispatchBusStopDepartureAction(requestBusStopDepartures());
      try {
        const response = await fetch(`/api/busStops/${busStop.id}/departures`);
        if (200 === response.status) {
          const busStopDepartures = await response.json();
          setBusStopDeparturesFetched(true);
          dispatchBusStopDepartureAction(
            receiveBusStopDepartures(busStop.id, busStopDepartures)
          );
        } else {
          dispatchBusStopDepartureAction(errorFetchingBusStopDepartures());
        }
      } catch (error) {
        dispatchBusStopDepartureAction(errorFetchingBusStopDepartures());
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
    busStop,
    busStopDeparturesFetched
  ]);

  const lineToOperatorToBusStopDeparturesMap = groupArray(
    busStopDepartures,
    "lineName",
    "operatorName"
  );

  return (
    <Grid align="left">
      {Object.keys(lineToOperatorToBusStopDeparturesMap).flatMap(line => {
        const operatorToBusStopDeparturesMap =
          lineToOperatorToBusStopDeparturesMap[line];
        return Object.keys(operatorToBusStopDeparturesMap).flatMap(operator => {
          const busStopDepartures = operatorToBusStopDeparturesMap[operator];
          return (
            <GridCell
              desktop={3}
              phone={4}
              tablet={4}
              align="top"
              key={`${line}.${operator}`}
            >
              <DepartureListItem
                line={line}
                operator={operator}
                busStopDepartures={busStopDepartures}
              />
            </GridCell>
          );
        });
      })}
    </Grid>
  );
}

export default DepartureList;
