import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import BusStopList from "./BusStopList";
import DeparturesBoard from "./DeparturesBoard";
import { Typography } from "@rmwc/typography";
import "@material/typography/dist/mdc.typography.css";
import { Grid, GridCell } from "@rmwc/grid";
import "@material/layout-grid/dist/mdc.layout-grid.css";
import { LocationContext } from "../provider/LocationProvider";
import { usePosition } from "use-position";

function App() {
  const [
    {
      coordinates: { latitude: lat, longitude: lon }
    },
    dispatchLocationAction
  ] = useContext(LocationContext);

  const { latitude, longitude } = usePosition(true);

  useEffect(() => {
    const setLocationAction = coords => {
      return {
        type: "SET_LOCATION",
        payload: coords
      };
    };

    if (latitude !== lat || longitude !== lon) {
      dispatchLocationAction(setLocationAction({ latitude, longitude }));
    }
  }, [lat, lon, latitude, longitude, dispatchLocationAction]);

  return (
    <Switch>
      <Route exact path="/" component={BusStopList} />
      <Route exact path="/:id/departures" component={DeparturesBoard} />
      <Route
        render={() => (
          <Grid align="left">
            <GridCell phone={4} tablet={8} desktop={12}>
              <Typography
                use="headline6"
                tag="h1"
                theme="textPrimaryOnBackground"
                style={{
                  margin: "0",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                No such route configured
              </Typography>
            </GridCell>
          </Grid>
        )}
      />
    </Switch>
  );
}

export default App;
