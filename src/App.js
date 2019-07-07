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
      <Route exact path="/" component={BusStopList} />
      <Route exact path="/:id/departures" component={DeparturesBoard} />
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
