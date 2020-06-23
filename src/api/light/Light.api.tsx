import {AbstractRequestApi} from '../makeRequest';
import {Method} from "../ApiMethodEnum";
import {ILightInterface} from "./Light.interface";

export class LightApi extends AbstractRequestApi {

  fetchLights():Promise<any> {
    return this.getLights()
  }

  private getLights():Promise<Response> {
    return this._makeRequest("/light/all",Method.GET);
  }

  addLight(blind:ILightInterface){
    return this._makeRequest("/light/add", Method.POST, blind)
  }

  deleteLight(id:String){
    return this._makeRequest(`/light/delete/${id}`, Method.DELETE)
  }

  setLightDimmingValue(id:String, value:number):Promise<any> {
    return this._makeRequest(`/light/value/${id}/${value}`, Method.POST)
  }

}

export default new LightApi();
