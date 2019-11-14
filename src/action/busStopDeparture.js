import {
  BUS_STOP_DEPARTURES_REQUESTED,
  BUS_STOP_DEPARTURES_RECEIVED,
  BUS_STOP_DEPARTURES_ERROR
} from "../constant";

function requestBusStopDepartures() {
  return {
    type: BUS_STOP_DEPARTURES_REQUESTED
  };
}

function receiveBusStopDepartures(busStopId, busStopDepartures) {
  return {
    type: BUS_STOP_DEPARTURES_RECEIVED,
    payload: { busStopId: busStopId, busStopDepartures }
  };
}

function errorFetchingBusStopDepartures() {
  return {
    type: BUS_STOP_DEPARTURES_ERROR
  };
}

export {
  requestBusStopDepartures,
  receiveBusStopDepartures,
  errorFetchingBusStopDepartures
};
