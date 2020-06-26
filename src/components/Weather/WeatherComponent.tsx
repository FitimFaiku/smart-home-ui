import * as React from 'react';
import CardHeader from "../Card/CardHeader/CardHeader";
import Icon from "../Icon/Icon";
import CardBody from "../Card/CardBody/CardBody";
import Card from "../Card/Card";
import WeatherApi from "../../api/weather/Weather.api";
import {useEffect} from "react";
import {useState} from "react";
import {IWindAndDirectionObject} from "../../api/weather/Weather.interface";


interface IWeatherProps {
  iconText:String,
  value:String
}
const WeatherComponent: React.FC<IWeatherProps> = props => {

  const  {
    iconText,value
  } = props;
  return (
      <div className="WeatherComponent__Element"><Icon icon={iconText} /> <div>Vorhersage:{value}</div></div>
  );
};

export default WeatherComponent;
