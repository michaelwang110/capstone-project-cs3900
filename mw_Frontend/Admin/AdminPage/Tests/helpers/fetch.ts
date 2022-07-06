import { mock_entry_points, mock_surveys } from './mockResponses';

export let prevResponse = '';

function getUrlParameter(url: string, name: string) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(url);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function fetch(request: Request | string) {
    if (typeof request === 'string') {
        if (request.includes('/GetEntryPoints')) {
            const query_parameters = {
                CompanyGuid: getUrlParameter(request, 'company_guid'),
            };
            prevResponse = JSON.stringify(query_parameters);
            return Promise.resolve({ok: true, json: () => {return {EntryPoints: mock_entry_points}; }});
        }
        if (request.includes('/GetSurveys')) {
            const query_parameters = {
                CompanyGuid: getUrlParameter(request, 'company_guid'),
            };
            prevResponse = JSON.stringify(query_parameters);
            return Promise.resolve({ok: true, json: () => {return {Surveys: mock_surveys}; }});
        }
        if (request.includes('/GetCompanyGuid')) {
            return Promise.resolve({ok: true, json: () => {return {CompanyGuid: '1'}; }});
        }
    } else {
        if (request.url.endsWith('/SaveSurvey')) {
            request.text().then(body => prevResponse = body);
            return Promise.resolve({ok: true, json: () => {return {Surveys: mock_surveys}; }});
        }
        if (request.url.endsWith('/RemoveEntryPoint')) {
            request.text().then(body => prevResponse = body);
            return Promise.resolve({ok: true, json: () => {return {EntryPoints: mock_entry_points}; }});
        }
        if (request.url.endsWith('/RemoveSurvey')) {
            request.text().then(body => prevResponse = body);
            return Promise.resolve({ok: true, json: () => {return {Surveys: mock_surveys}; }});
        }
    }
}

const globalAny: any = global;
globalAny.fetch = fetch;
