import React, { useContext, useEffect } from "react";
import BusStopList from "./BusStopList";
import DeparturesBoard from "./DeparturesBoard";
import UnknownRoute from "./UnknownRoute";
import "@rmwc/typography/styles";
import "@rmwc/grid/styles";
import { LocationContext } from "../provider/LocationProvider";
import { setLocation } from "../action";
import useGeolocation from "react-hook-geolocation";
import { Routes, Route } from "react-router-dom";

function App() {
  const [
    {
      coordinates: { latitude, longitude },
    },
    dispatchLocationAction,
  ] = useContext(LocationContext);

  const { latitude: newLatitude, longitude: newLongitude } = useGeolocation();

  useEffect(() => {
    if (newLatitude !== latitude || newLongitude !== longitude) {
      dispatchLocationAction(
        setLocation({ latitude: newLatitude, longitude: newLongitude })
      );
    }
  }, [latitude, longitude, newLatitude, newLongitude, dispatchLocationAction]);

  return (
    <Routes>
      <Route exact path="/" element={<BusStopList />} />
      <Route exact path="/:id/departures" element={<DeparturesBoard />} />
      <Route path="*" element={<UnknownRoute />} />
    </Routes>
  );
}

export default App;
