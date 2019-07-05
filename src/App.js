import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import BusStopList from './BusStopList'
import DeparturesBoard from './DeparturesBoard'
import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.css';
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Grid align="left">
        <GridCell span={12}>
          <Typography
            use="headline6"
            tag={Link}
            to="/busStops"
            theme="textPrimaryOnBackground"
            style={{
              margin: '0',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
            Stops
          </Typography>
        </GridCell>
      </Grid>} />
      <Route exact path="/busStops" component={BusStopList} />
      <Route exact path="/busStops/:id/departures" component={DeparturesBoard} />
      <Route render={() => <Grid align="left">
        <GridCell phone={4} tablet={8} desktop={12}>
          <Typography
            use="headline6"
            tag="h1"
            theme="textPrimaryOnBackground"
            style={{
              margin: '0',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
            No such route configured
          </Typography>
        </GridCell>
      </Grid>} />
    </Switch>
  );
}

export default App;
