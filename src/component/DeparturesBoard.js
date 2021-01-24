import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@rmwc/typography";
import "@rmwc/typography/styles";
import { BusStopContext } from "../provider/BusStopProvider";
import DepartureList from "./DepartureList";
import { useParams } from "react-router-dom";
import {
  requestBusStop,
  receiveBusStop,
  errorFetchingBusStop,
} from "../action";

function DeparturesBoard() {
  const { id } = useParams();
  const [{ busStops, fetchingBusStop }, dispatchBusStopAction] = useContext(
    BusStopContext
  );
  const busStop = busStops.find((busStop) => busStop.id === id);
  const [busStopExists, setBusStopExists] = useState(true);

  useEffect(() => {
    const shouldFetchBusStop = () => {
      return !busStop && busStopExists && !fetchingBusStop;
    };

    const fetchBusStop = async () => {
      dispatchBusStopAction(requestBusStop());
      try {
        const response = await fetch(`/api/busStops/${id}`);
        if (200 === response.status) {
          const busStop = await response.json();
          dispatchBusStopAction(receiveBusStop(busStop));
        } else {
          if (404 === response.status) {
            setBusStopExists(false);
          }
          dispatchBusStopAction(errorFetchingBusStop());
        }
      } catch (error) {
        dispatchBusStopAction(errorFetchingBusStop());
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
            textOverflow: "ellipsis",
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
            textOverflow: "ellipsis",
          }}
        >
          {subtitleText}
        </Typography>
      </header>
      {busStop ? (
        <DepartureList key={busStop.id} busStopId={busStop.id} />
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
}

export default DeparturesBoard;
