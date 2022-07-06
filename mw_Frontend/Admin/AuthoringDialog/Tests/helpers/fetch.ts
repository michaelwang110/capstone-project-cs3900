export let prevResponse = '';

function fetch(request: Request) {
  if (request.url.endsWith('/SaveSurvey')) {
    request.text().then(body => prevResponse = body);
    return Promise.resolve({ok: true, json: () => {return {Surveys: []}; }});
  }
}

const globalAny: any = global;
globalAny.fetch = fetch;
