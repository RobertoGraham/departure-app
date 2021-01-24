import React, { useContext, useState, useEffect, useMemo } from "react";
import { Typography } from "@rmwc/typography";
import "@rmwc/typography/styles";
import { Card, CardPrimaryAction } from "@rmwc/card";
import "@rmwc/card/styles";
import { Link } from "react-router-dom";
import { LocationContext } from "../provider/LocationProvider";
import { getPreciseDistance, getDistance } from "geolib";

function BusStopListItem({ id, name, locality, longitude, latitude }) {
  const [{ coordinates }] = useContext(LocationContext);
  const myCoordinates = useMemo(() => {
    return {
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
    };
  }, [coordinates]);
  const busStopCoordinates = useMemo(() => {
    return { longitude, latitude };
  }, [longitude, latitude]);
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
              textOverflow: "ellipsis",
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
              textOverflow: "ellipsis",
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
