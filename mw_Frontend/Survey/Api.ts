// Need to determine exactly what happens to the app on a failed api call

import { QuestionInfo, SurveyResponse, SurveysRequest, RespondentInfo, UpdateRespondentInfoRequest, SurveyRespondentPair, SaveEntryPointRequest } from './Types';
import { API_URL } from './Constants';

function handleError(response: Response, set_error: (val: boolean) => void) {
    set_error(true);
    throw Error(response.statusText);
}

function checkForErrors(response: Response, set_error: (val: boolean) => void = () => {}) {
    if (!response.ok) {
        handleError(response, set_error);
    }
    return response;
}

function makePostRequestObject(path: string, request_body: any) {
    return new Request(API_URL + path, {
          method: 'POST',
          body: JSON.stringify(request_body),
          headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'dataType': 'json'})
      });
  }

export function sendResponse(s_response: SurveyResponse, set_error: (e: boolean) => void): void {
    const send_response = makePostRequestObject('/Survey/SaveResponse', s_response);

    fetch(send_response)
    .then(e => checkForErrors(e, set_error))
    .catch(error => handleError(error, set_error));
}

export function collectQuestions(company_guid: string, survey_guid: string, respondent_id: string,
    set_error: (e: boolean) => void): Promise<Array<QuestionInfo>> {

    return fetch(API_URL + `/Survey/GetSurvey?company_guid=${company_guid}&survey_guid=${survey_guid}&respondent_id=${respondent_id}`)
    .then(e => checkForErrors(e, set_error))
    .then(response => response.json())
    .then(survey => survey.SurveyQuestions)
    .catch(error => handleError(error, set_error));
}

export function getSurveys(company_guid: string, respondent_id: string, entry_point: string): Promise<SurveyRespondentPair[]> {
    const request_body = {
        CompanyGuid: company_guid,
        RespondentId: respondent_id,
        EntryPoint: entry_point
    } as SurveysRequest;

    const surveys_request = makePostRequestObject('/Survey/GetSurveysForEntryPoint', request_body);

    return fetch(surveys_request)
    .then(e => checkForErrors(e))
    .then(surveys => surveys.json())
    .then(surveys => surveys.RespondentSurveyData);
}

export function saveRespondentInfo(survey_guid: string, respondent: RespondentInfo,
    update_extra_respondent_data: boolean, company_id: string) {

    const res_update = {
        RespondentInfo: respondent,
        SurveyGuid: survey_guid,
        UpdateExtraRespondentData: update_extra_respondent_data,
        CompanyId: company_id
    } as UpdateRespondentInfoRequest;

    const save_res_request = makePostRequestObject('/Survey/UpdateRespondentData', res_update);

    fetch(save_res_request);
}

export function saveEntryPoint(company_guid: string, entry_point: string) {
    const entry_point_update = {
        CompanyGuid: company_guid,
        Name: entry_point
    } as SaveEntryPointRequest;

    const save_ep_request = makePostRequestObject( '/Survey/SaveEntryPoint', entry_point_update);
    fetch(save_ep_request);
}

export function runWhenToSurvey(company_id: string, respondent_id: string, survey_guid: string): Promise<string> {
    return fetch(API_URL + `/Survey/WhenToSurvey?company_id=${company_id}&respondent_id=${respondent_id}&survey_guid=${survey_guid}`)
    .then(e => checkForErrors(e))
    .then(response => response.json())
    .then(response => response.WhenToSurveyResult);
}