import { ExceptionReport } from './Types';

const API_URL = 'https://surveys.displayr.com';

function makePostRequestObject(path: string, request_body: any) {
    return new Request(API_URL + path, {
          method: 'POST',
          body: JSON.stringify(request_body),
          headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'dataType': 'json'})
      });
  }

export function logError(e: ExceptionReport) {
    const e_report = makePostRequestObject( '/Survey/LogError', e);
    return fetch(e_report);
}