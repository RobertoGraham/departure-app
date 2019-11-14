import {
  BUS_STOPS_REQUESTED,
  BUS_STOPS_RECEIVED,
  BUS_STOPS_ERROR,
  BUS_STOP_REQUESTED,
  BUS_STOP_RECEIVED,
  BUS_STOP_ERROR
} from "../constant";

function requestBusStops() {
  return {
    type: BUS_STOPS_REQUESTED
  };
}

function receiveBusStops(busStops) {
  return {
    type: BUS_STOPS_RECEIVED,
    payload: busStops
  };
}

function errorFetchingBusStops() {
  return {
    type: BUS_STOPS_ERROR
  };
}

function requestBusStop() {
  return {
    type: BUS_STOP_REQUESTED
  };
}

function receiveBusStop(busStop) {
  return {
    type: BUS_STOP_RECEIVED,
    payload: busStop
  };
}

function errorFetchingBusStop() {
  return {
    type: BUS_STOP_ERROR
  };
}

export {
  requestBusStops,
  receiveBusStops,
  errorFetchingBusStops,
  requestBusStop,
  receiveBusStop,
  errorFetchingBusStop
};
