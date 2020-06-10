import React, { useEffect, useContext } from "react";
import { Grid, GridCell } from "@rmwc/grid";
import "@rmwc/grid/styles";
import BusStopListItem from "./BusStopListItem";
import { LocationContext } from "../provider/LocationProvider";
import { BusStopContext } from "../provider/BusStopProvider";
import {
  requestBusStops,
  receiveBusStops,
  errorFetchingBusStops
} from "../action";

function BusStopList() {
  const [
    {
      coordinates: { latitude, longitude }
    }
  ] = useContext(LocationContext);
  const [
    { busStops, busStopsReceived, fetchingBusStops },
    dispatchBusStopAction
  ] = useContext(BusStopContext);

  useEffect(() => {
    const shouldFetchBusStops = () => {
      return !busStopsReceived && latitude && longitude && !fetchingBusStops;
    };

    const fetchBusStops = async () => {
      dispatchBusStopAction(requestBusStops());
      try {
        const response = await fetch(
          `/api/busStops?latitude=${encodeURIComponent(
            latitude
          )}&longitude=${encodeURIComponent(longitude)}`
        );
        if (200 === response.status) {
          const busStops = await response.json();
          dispatchBusStopAction(receiveBusStops(busStops));
        } else {
          dispatchBusStopAction(errorFetchingBusStops());
        }
      } catch (error) {
        dispatchBusStopAction(errorFetchingBusStops());
      }
    };

    const fetchBusStopsIfNeeded = () => {
      if (shouldFetchBusStops()) {
        fetchBusStops();
      }
    };

    fetchBusStopsIfNeeded();
  }, [
    busStops,
    dispatchBusStopAction,
    fetchingBusStops,
    busStopsReceived,
    latitude,
    longitude
  ]);

  return (
    <Grid align="left">
      {busStops.map(busStop => (
        <GridCell desktop={4} phone={4} tablet={4} align="top" key={busStop.id}>
          <BusStopListItem {...busStop} />
        </GridCell>
      ))}
    </Grid>
  );
}

export default BusStopList;
