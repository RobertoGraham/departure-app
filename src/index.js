import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./component/App";
import { ThemeProvider } from "@rmwc/theme";
import "@rmwc/theme/styles";
import { BusStopDepartureProvider } from "./provider/BusStopDepartureProvider";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { LocationProvider } from "./provider/LocationProvider";
import { BusStopProvider } from "./provider/BusStopProvider";

ReactDOM.render(
  <BrowserRouter>
    <LocationProvider>
      <BusStopProvider>
        <BusStopDepartureProvider>
          <ThemeProvider
            options={{
              primary: "#24aee9",
              secondary: "#e539ff",
              error: "#b00020",
              background: "#212121",
              surface: "#37474F",
              onPrimary: "rgba(255,255,255,.87)",
              onSecondary: "rgba(0,0,0,0.87)",
              onSurface: "rgba(255,255,255,.87)",
              onError: "#fff",
              textPrimaryOnBackground: "rgba(255, 255, 255, 1)",
              textSecondaryOnBackground: "rgba(255, 255, 255, 0.7)",
              textHintOnBackground: "rgba(255, 255, 255, 0.5)",
              textDisabledOnBackground: "rgba(255, 255, 255, 0.5)",
              textIconOnBackground: "rgba(255, 255, 255, 0.5)",
              textPrimaryOnLight: "rgba(0, 0, 0, 0.87)",
              textSecondaryOnLight: "rgba(0, 0, 0, 0.54)",
              textHintOnLight: "rgba(0, 0, 0, 0.38)",
              textDisabledOnLight: "rgba(0, 0, 0, 0.38)",
              textIconOnLight: "rgba(0, 0, 0, 0.38)",
              textPrimaryOnDark: "white",
              textSecondaryOnDark: "rgba(255, 255, 255, 0.7)",
              textHintOnDark: "rgba(255, 255, 255, 0.5)",
              textDisabledOnDark: "rgba(255, 255, 255, 0.5)",
              textIconOnDark: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <App />
          </ThemeProvider>
        </BusStopDepartureProvider>
      </BusStopProvider>
    </LocationProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
