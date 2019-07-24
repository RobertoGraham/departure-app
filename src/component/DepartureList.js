import React, { useContext, useEffect, useState } from "react";
import { BusStopDepartureContext } from "../provider/BusStopDepartureProvider";
import { Grid, GridCell } from "@rmwc/grid";
import "@material/layout-grid/dist/mdc.layout-grid.css";
import DepartureListItem from "./DepartureListItem";
import groupArray from "group-array";

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
      return !busStopDeparturesFetched && !fetchingBusStopDepartures;
    };

    const fetchBusStopDepartures = async () => {
      dispatchBusStopDepartureAction(requestBusStopDeparturesAction());
      try {
        const response = await fetch(`/api/busStops/${busStop.id}/departures`);
        if (200 === response.status) {
          const busStopDepartures = await response.json();
          setBusStopDeparturesFetched(true);
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
