import React, { useEffect, useContext } from 'react';
import { Store } from './Store';
import { geolocated } from "react-geolocated";
import BusStopList from './BusStopList'

function App({ coords, isGeolocationAvailable, isGeolocationEnabled, positionError }) {
  const [, dispatch] = useContext(Store);

  useEffect(() => {
    if (coords)
      dispatch({
        type: 'RECEIVED_LOCATION',
        payload: { coords }
      })
  }, [coords, dispatch]);

  return (
    <BusStopList />
  );
}

export default geolocated({ userDecisionTimeout: 5000 })(App);
