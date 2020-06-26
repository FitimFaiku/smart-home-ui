import {AbstractRequestApi} from '../makeRequest';
import {Method} from "../ApiMethodEnum";
import {IWindAndDirectionObject} from "./Weather.interface";

export class WeatherApi extends AbstractRequestApi {

  getForecast(): string []{
    return [
      "Sonnig: 25°C",
      "Sonnig: 30°C",
      "Regnerisch: 17°C",
      "Bewölkt: 20°C",
      "Bewölkt: 17°C",
      "Sonnig: 23°C",
      "Regnerisch: 20°C",
      "Sonnig: 25°C"
          ]
  }
  getTemperature () {
    return 21;
  }

  getWindAndDirection():IWindAndDirectionObject {
    return {wind: 100, direction: "WEST"}
  }




}

export default new WeatherApi();
