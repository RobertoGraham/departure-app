import React, { useEffect, useContext, useState } from 'react';
import './App.css';
import { Store } from './Store';
import geolocator from 'geolocator';
const BusStopList = React.lazy(() => import('./BusStopList'));

function App() {
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [{ location }, dispatch] = useContext(Store);

  useEffect(() => {
    function fetchLocation() {
      geolocator.locate({ fallbackToIP: true }, (error, location) => {
        dispatch({
          type: 'RECEIVED_LOCATION',
          payload: error ? null : location
        })
      });
    }

    if (!location && geolocator.isGeolocationSupported() && !fetchingLocation) {
      setFetchingLocation(true);
      fetchLocation();
    }
  }, [location, fetchingLocation, dispatch]);

  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <BusStopList />
      </React.Suspense>
    </div>
  );
}

export default App;
