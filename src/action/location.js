import { SET_LOCATION } from "../constant";

function setLocation(location) {
  return {
    type: SET_LOCATION,
    payload: location
  };
}

export { setLocation };
