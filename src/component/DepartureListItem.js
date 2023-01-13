import React from "react";
import { Card } from "@rmwc/card";
import "@rmwc/card/styles";
import { Typography } from "@rmwc/typography";
import "@rmwc/typography/styles";
import {
  ListDivider,
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
} from "@rmwc/list";
import "@rmwc/list/styles";

function DepartureListItem({ line, operator, busStopDepartures }) {
  return (
    <Card>
      <div style={{ padding: "0 1rem" }}>
        <Typography
          use="headline6"
          tag="h3"
          theme="textPrimaryOnBackground"
          style={{
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {line}
        </Typography>
        <Typography
          use="subtitle2"
          tag="h4"
          theme="textSecondaryOnBackground"
          style={{
            marginTop: "-1rem",
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {operator}
        </Typography>
      </div>
      <ListDivider />
      <List twoLine>
        {busStopDepartures.map((busStopDeparture) => {
          const { epochSecond, destination } = busStopDeparture;
          const timeString = new Date(1000 * epochSecond).toLocaleTimeString();

          return (
            <ListItem key={busStopDeparture.epochSecond}>
              <ListItemText>
                <ListItemPrimaryText>{timeString}</ListItemPrimaryText>
                <ListItemSecondaryText>{destination}</ListItemSecondaryText>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}

export default DepartureListItem;
