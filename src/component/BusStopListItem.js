import React, { useContext, useState, useEffect } from "react";
import { Typography } from "@rmwc/typography";
import "@material/typography/dist/mdc.typography.css";
import { Card, CardPrimaryAction } from "@rmwc/card";
import { Link } from "react-router-dom";
import "@material/card/dist/mdc.card.css";
import "@material/button/dist/mdc.button.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import { LocationContext } from "../provider/LocationProvider";
import { getPreciseDistance, getDistance } from "geolib";

function BusStopListItem({ id, name, locality, longitude, latitude }) {
  const [{ coordinates }] = useContext(LocationContext);
  const myCoordinates = {
    longitude: coordinates.longitude,
    latitude: coordinates.latitude
  };
  const busStopCoordinates = { longitude, latitude };
  const [distance, setDistance] = useState(
    getDistance(myCoordinates, busStopCoordinates)
  );
  const [preciseDistance, setPreciseDistance] = useState(false);

  useEffect(() => {
    if (!preciseDistance) {
      setPreciseDistance(true);
      setDistance(getPreciseDistance(myCoordinates, busStopCoordinates));
    }
  }, [preciseDistance, myCoordinates, busStopCoordinates]);

  return (
    <Card>
      <CardPrimaryAction tag={Link} to={`/${id}/departures`}>
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          <Typography
            use="headline6"
            tag="h2"
            theme="textPrimaryOnBackground"
            style={{
              whiteSpace: "wrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {name}
          </Typography>
          <Typography
            use="subtitle2"
            tag="h3"
            theme="textSecondaryOnBackground"
            style={{
              marginTop: "-1rem",
              whiteSpace: "wrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {locality}
          </Typography>
          <Typography use="body1" tag="div" theme="textSecondaryOnBackground">
            {`${distance}m`}
          </Typography>
        </div>
      </CardPrimaryAction>
    </Card>
  );
}

export default BusStopListItem;
