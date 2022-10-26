import { Grid, GridCell } from "@rmwc/grid";
import { Typography } from "@rmwc/typography";

function UnknownRoute() {
  return (
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
            textOverflow: "ellipsis",
          }}
        >
          No such route configured
        </Typography>
      </GridCell>
    </Grid>
  );
}

export default UnknownRoute;
