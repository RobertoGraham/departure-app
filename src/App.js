import React, { useEffect, useContext } from 'react';
import './App.css';
import { Store } from './Store';
import geolocator from 'geolocator';
const BusStopList = React.lazy(() => import('./BusStopList'));

function App() {
  const [{ location }, dispatch] = useContext(Store);

  useEffect(() => {
    if (!location && geolocator.isGeolocationSupported())
      geolocator.locate({ fallbackToIP: true }, (error, location) => {
        return dispatch({
          type: 'RECEIVED_LOCATION',
          payload: error ? null : location
        });
      });
  }, [location, dispatch]);

  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <BusStopList />
      </React.Suspense>
    </div>
  );
}

export default App;
