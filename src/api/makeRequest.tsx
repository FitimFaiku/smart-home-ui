import { Method } from './ApiMethodEnum';

export class AbstractRequestApi {

  defaultHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  async _makeRequest<T>( url: string, method: Method, body?: any, headers?: any): Promise<T> {
    const newHeaders = this._addHeader(headers);

    try {
      const response = await this.timeoutWrapper(
        this.getTimeout(),
        fetch(url, {
          headers: newHeaders,
          body: JSON.stringify(body),
          method,
        })
      );

      if (!response.ok) {
        const errorMsg: string = await response.json();
        throw new Error(errorMsg);
      }
      return response.json().then((data: any) => this.checkForErrorData(data));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  getTimeout(): number {
    return 50000;
  }

  checkForErrorData(data: any) {
    if (data.errors) {
      return Promise.reject(new Error(data.errors));
    }
    return data;
  }

  _addHeader(optionalHeaders?: string[]): any {
    const headers = this.defaultHeader;

    if (optionalHeaders) {
      Object.keys(optionalHeaders).forEach(key => (headers[key] = optionalHeaders[key]));
    }
    return headers;
  }


  timeoutWrapper(millis: number, promise): Promise<any> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("Error"));
      }, millis);
      promise.then(
        res => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        err => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    });
  }
}
