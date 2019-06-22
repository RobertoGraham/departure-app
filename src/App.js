import React, { useState, useEffect } from 'react';
import './App.css';
import geolocator from 'geolocator';

function App() {
  const [location, setLocation] = useState();
  useEffect(() => {
    if (!location && geolocator.isGeolocationSupported()) {
      geolocator.locate({ fallbackToIP: true }, (error, location) => {
        if (!error)
          setLocation(location);
      });
    }
  }, [location]);
  const [places, setPlaces] = useState();
  useEffect(() => {
    if (!places && location) {
      const { coords } = location;
      fetch(`/api/places/busStops?latitude=${encodeURIComponent(coords.latitude)}&longitude=${encodeURIComponent(coords.longitude)}`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => setPlaces(response));
    }
  }, [places, location]);
  return (
    <div className="App">
      {places ?
        places.member.map(member => (
          <p>{member.atcocode}</p>
        ))
        : <React.Fragment />}
    </div>
  );
}

export default App;
