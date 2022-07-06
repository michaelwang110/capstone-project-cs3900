import { EntryPointResponse, EntryPointDeleteRequest, SurveyRequest, OutfilingRequest, SurveyInfo, SurveyDeleteRequest, CompanyGuidRequest } from './Types';
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

/** This is needed to allow cookies to be sent cross-origin from app.displayr.com to
 * surveys.displayr.com (or from localhost to localhost:5001 when testing locally). */
function fetchWithCredentials(url: RequestInfo) {
    return fetch(url, { credentials: 'include' });
}

export function collectEntryPoints(company_guid: string): Promise<Array<EntryPointResponse>> {
    return fetchWithCredentials(API_URL + `/Admin/GetEntryPoints?company_guid=${company_guid}`)
        .then(e => checkForErrors(e))
        .then(response => response.json())
        .then(entry_points => entry_points.EntryPoints)
        .catch(error => handleError(error));
}

export function collectSurveys(company_guid: string): Promise<Array<SurveyInfo>> {
    return fetchWithCredentials(API_URL + `/Admin/GetSurveys?company_guid=${company_guid}`)
        .then(e => checkForErrors(e))
        .then(response => response.json())
        .then(surveys => surveys.Surveys)
        .catch(error => handleError(error));
}

export function removeEntryPoint(entry_point_request: EntryPointDeleteRequest): Promise<Array<EntryPointResponse>> {
    const send_request = new Request(API_URL + '/Admin/RemoveEntryPoint', {
        method: 'POST',
        body: JSON.stringify(entry_point_request),
        headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'dataType': 'json' })
    });

    return fetchWithCredentials(send_request)
        .then(e => checkForErrors(e))
        .then(response => response.json())
        .then(entry_points => entry_points.EntryPoints)
        .catch(error => handleError(error));
}

export function removeSurvey(surveys_request: SurveyDeleteRequest): Promise<Array<SurveyInfo>> {
    const send_request = new Request(API_URL + '/Admin/RemoveSurvey', {
        method: 'POST',
        body: JSON.stringify(surveys_request),
        headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'dataType': 'json' })
    });

    return fetchWithCredentials(send_request)
        .then(e => checkForErrors(e))
        .then(response => response.json())
        .then(surveys => surveys.Surveys)
        .catch(error => handleError(error));
}

export function sendSurvey(survey_info: SurveyRequest): Promise<Array<SurveyInfo>> {
    const send_request = new Request(API_URL + '/Admin/SaveSurvey', {
        method: 'POST',
        body: JSON.stringify(survey_info),
        headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'dataType': 'json' })
    });

    return fetchWithCredentials(send_request)
        .then(e => checkForErrors(e))
        .then(response => response.json())
        .then(surveys => surveys.Surveys)
        .catch(error => handleError(error));
}

export function getCompanyGuid() {
    return fetchWithCredentials(API_URL + `/Admin/GetCompanyGuid`)
        .then(e => checkForErrors(e))
        .then(response => response.json())
        .then(company_guid => company_guid.CompanyGuid)
        .catch(error => handleError(error));
}
