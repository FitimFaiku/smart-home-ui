import * as React from 'react';
import CardHeader from "../../components/Card/CardHeader/CardHeader";
import Icon from "../../components/Icon/Icon";
import CardBody from "../../components/Card/CardBody/CardBody";
import Card from "../../components/Card/Card";
import WeatherApi from "../../api/weather/Weather.api";
import {useEffect} from "react";
import {useState} from "react";
import {IWindAndDirectionObject} from "../../api/weather/Weather.interface";
import WeatherComponent from "../../components/Weather/WeatherComponent";
import Section from "../../components/Section/Section";


const Weather: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(20);
  const [windAndDirection, setWindAndDirection] = useState<IWindAndDirectionObject>(null);
  const [forecast, setForecast] = useState<string[]>(null);
  const [forecastMap, setForecastMap] = useState<{icon:string, value:string}[]>(null);


  useEffect(() => {
    const temperature = WeatherApi.getTemperature();
    const windAndDirection = WeatherApi.getWindAndDirection();
    const forecast = WeatherApi.getForecast();


    setTemperature(temperature);
    setWindAndDirection(windAndDirection);
    setForecast(forecast);

    let iconAndForecast: {icon:string, value:string}[] = [];
    if(forecast != null){
      forecast.forEach(value => {
        console.log("Bin beim map value:",value);
        if(value.match("Sonnig")){
          console.log("Bin beim sonnig");
          iconAndForecast.push({icon:"weather-good", value:value});
          console.log(iconAndForecast);
        }
        if(value.match("Regnerisch")){
          iconAndForecast.push({icon:"weather-rainy", value:value});
        }
        if(value.match("Bewölkt")){
          iconAndForecast.push({icon:"weather-cloudy", value:value});
        }

      });
      setForecastMap(iconAndForecast);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  let weatherIcon = "";
  if(temperature != null && temperature>=22){
     weatherIcon = "weather-good"
  } else {
    weatherIcon = "weather-cloudy"
  }

  let directionIcon = "";
   if(windAndDirection != null) {
     directionIcon = "arrow-" + windAndDirection.direction
   }

  const createForecasts = () => {
    console.log("createForecasts", forecastMap);
    // const element;
    // Array.from(forecastMap.values())
    //  forecastMap.forEach((icon:string, value:string) => {
    return forecastMap.map(element => {
      return (<WeatherComponent iconText={element.icon} value={element.value}/>)
    });
     // });
  };

  return (
      <Section id={"Weather"} title={"Weather"} color={"warmgrey"}>
        <Card id={"Weather"} plain={true}>

          <CardHeader title={"Weather"} icon={weatherIcon}>
            <div className={"Weather__windAndDirection"}>
              {windAndDirection != null && <div>Aktuelle Windgeschwindigkeit: {windAndDirection.wind}</div>}
            {directionIcon != "" && <div> Aktuelle Windrichtung <Icon icon={directionIcon}></Icon> {windAndDirection.direction}</div>}
            </div>
          </CardHeader>
          <CardBody>
            <div className={"Weather__div__wrapper"}>
              {forecastMap!=null && createForecasts()}
            </div>
          </CardBody>
        </Card>
      </Section>
  );
};

export default Weather;
