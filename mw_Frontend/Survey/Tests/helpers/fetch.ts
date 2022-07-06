import { mock_survey, mock_surveys_should_appear, mock_surveys_shouldnt_appear, q_info_passing_text, q_info_passing_choose_one, q_info_passing_rating, q_info_passing_choose_multiple } from './mockResponses';
import { API_URL } from '../../Constants';

export let prevResponse = '';
export let prevResponseInterval = '';

async function fetch(request: Request | string) {
  prevResponse = '';
  // get requests
  if (typeof request === 'string') {
    if (request.startsWith(API_URL + '/Survey/GetSurvey')) {
      if (request.includes("q_info_pass: text")) {
        return Promise.resolve({ok: true, json: () => {return q_info_passing_text; }});
      } else if (request.includes("q_info_pass: rating")) {
        return Promise.resolve({ok: true, json: () => {return q_info_passing_rating; }});
      } else if (request.includes("q_info_pass: choose one")) {
        return Promise.resolve({ok: true, json: () => {return q_info_passing_choose_one; }});
      } else if (request.includes("q_info_pass: choose multiple")) {
        return Promise.resolve({ok: true, json: () => {return q_info_passing_choose_multiple; }});
      } else {
        return Promise.resolve({ok: true, json: () => {return mock_survey; }});
      }
    }

    if (request.startsWith(API_URL + '/Survey/WhenToSurvey')) {
      if (request.includes('should appear')) {
        return Promise.resolve({ok: true, json: () => {return {WhenToSurveyResult: 'test'}; }});
      } else  {
        return Promise.resolve({ok: true, json: () => {return {WhenToSurveyResult: ''}; }});
      }
    }


  // post requests
  } else {
    if (request.url.endsWith('/LogError')) {
      request.text().then(body => prevResponse = body);
      return Promise.resolve({ok: true});
    }

    if (request.url.endsWith('/SaveResponse')) {
      request.text().then(body => prevResponse = body);
      return Promise.resolve({ok: true});
    }

    if (request.url.endsWith('/UpdateRespondentData')) {
      request.text().then(body => prevResponseInterval = body);
      return Promise.resolve({ok: true});
    }

    if (request.url.endsWith('/GetSurveysForEntryPoint')) {
      const body = await request.text();
      if (body.includes('"should appear"')) {
        return Promise.resolve({ok: true, json: () => {return JSON.parse(JSON.stringify(mock_surveys_should_appear)); }});
      } else  {
        return Promise.resolve({ok: true, json: () => {return JSON.parse(JSON.stringify(mock_surveys_shouldnt_appear)); }});
      }
    }
  }
}

const globalAny: any = global;
globalAny.fetch = fetch;