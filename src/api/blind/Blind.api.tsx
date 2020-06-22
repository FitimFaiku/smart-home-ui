import {AbstractRequestApi} from '../makeRequest';
import {Method} from "../ApiMethodEnum";

export class BlindApi extends AbstractRequestApi {

  fetchBlinds():Promise<any> {
    return this.getBlinds()
  }
  private getBlinds():Promise<Response> {
    console.log("Bin Hier");
    return this._makeRequest("/blind/all/position",Method.GET);
  }

}

export default new BlindApi();
