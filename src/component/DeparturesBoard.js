import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@rmwc/typography";
import "@material/typography/dist/mdc.typography.css";
import { BusStopContext } from "../provider/BusStopProvider";
import DepartureList from "./DepartureList";
import { Grid, GridCell } from "@rmwc/grid";
import "@material/layout-grid/dist/mdc.layout-grid.css";

function DeparturesBoard({ match }) {
  const { params } = match;
  const { id } = params;
  const [{ busStops, fetchingBusStop }, dispatchBusStopAction] = useContext(
    BusStopContext
  );
  const busStop = busStops.find(busStop => busStop.id === id);
  const [busStopExists, setBusStopExists] = useState(true);

  useEffect(() => {
    const requestBusStopAction = () => {
      return {
        type: "BUS_STOP_REQUESTED"
      };
    };

    const receiveBusStopAction = busStop => {
      return {
        type: "BUS_STOP_RECEIVED",
        payload: busStop
      };
    };

    const errorFetchingBusStopAction = () => {
      return {
        type: "BUS_STOP_ERROR"
      };
    };

    const shouldFetchBusStop = () => {
      return !busStop && busStopExists && !fetchingBusStop;
    };

    const fetchBusStop = async () => {
      dispatchBusStopAction(requestBusStopAction());
      try {
        const response = await fetch(`/api/busStops/${id}`);
        if (200 === response.status) {
          const busStop = await response.json();
          dispatchBusStopAction(receiveBusStopAction(busStop));
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
  }, [busStop, dispatchBusStopAction, fetchingBusStop, id, busStopExists]);

  const titleText = busStop ? busStop.name : `No bus stop found with id: ${id}`;
  const subtitleText = busStop ? busStop.locality : "";

  return (
    <React.Fragment>
      <header style={{ padding: "0 1rem", textAlign: "center" }}>
        <Typography
          use="headline6"
          tag="h2"
          theme="textPrimaryOnBackground"
          style={{
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {titleText}
        </Typography>
        <Typography
          use="subtitle2"
          tag="h3"
          theme="textSecondaryOnBackground"
          style={{
            marginTop: "-1rem",
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {subtitleText}
        </Typography>
      </header>
      {busStop ? (
        <Grid align="middle">
          <GridCell desktop={6} phone={4} tablet={6}>
            <DepartureList busStop={busStop} />
          </GridCell>
        </Grid>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
}

export default DeparturesBoard;