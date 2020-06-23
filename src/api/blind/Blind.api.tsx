import {AbstractRequestApi} from '../makeRequest';
import {Method} from "../ApiMethodEnum";
import {IBlindInterface} from "./Blind.interface";

export class BlindApi extends AbstractRequestApi {

  addBlind(blind:IBlindInterface){
    return this._makeRequest("/blind/add", Method.POST, blind)
  }

  deleteBlind(id:String){
    return this._makeRequest(`/blind/delete/${id}`, Method.DELETE)
  }

  setBlindPosition(id:String, value:number):Promise<any> {
    return this._makeRequest(`/blind/position/${id}/${value}`, Method.POST)
  }

  fetchBlinds():Promise<any> {
    return this.getBlinds()
  }
  private getBlinds():Promise<Response> {
    console.log("Bin Hier");
    return this._makeRequest("/blind/all",Method.GET);
  }

}

export default new BlindApi();
