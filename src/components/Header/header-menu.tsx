import {BLIND, LANDING, LIGHT, WEATHER} from "../../constants/routes";

export const HEADER_MENU = {
  items: [
    {
      name: 'Home',
      to: LANDING,
      id: 'header-landing-link-id',
    },
    {
      name: 'Weather',
      to: WEATHER,
      id: 'header-weather-link-id',
    },
    {
      name: 'Light',
      to: LIGHT,
      id: 'header-light-link-id',
    },
    {
      name: 'Blind',
      to: BLIND,
      id: 'header-blind-link-id',
    },
  ],
};
