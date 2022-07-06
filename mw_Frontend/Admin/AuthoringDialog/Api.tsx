import { SurveyRequest, SurveyInfo } from './Types';
import { API_URL } from './Constants';

function handleError(response: Response) {
    // redirect to login page if unauthorized acces
    if (response.status === 401) {
        window.location.replace('https://app.displayr.com/Login');
    } else {
        throw Error(response.statusText);
    }
}
function checkForErrors(response: Response) {
    if (!response.ok) {
        handleError(response);
    }
    return response;
}

export function sendSurvey(survey_info: SurveyRequest): Promise<Array<SurveyInfo>> {
    const send_request = new Request(API_URL + '/Admin/SaveSurvey', {
        method: 'POST',
        body: JSON.stringify(survey_info),
        headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'dataType': 'json'})
    });

    return fetchWithCredentials(send_request)
    .then(e => checkForErrors(e))
    .then(response => response.json())
    .then(surveys => surveys.Surveys)
    .catch(error => handleError(error));
}

/** This is needed to allow cookies to be sent cross-origin from app.displayr.com to
 * surveys.displayr.com (or from localhost to localhost:5001 when testing locally). */
function fetchWithCredentials(url: RequestInfo) {
    return fetch(url, { credentials: 'include' });
}