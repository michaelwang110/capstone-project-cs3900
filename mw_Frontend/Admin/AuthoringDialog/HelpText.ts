export const WHEN_TO_SURVEY_HELP =
`C# code snippet that will be run to determine when this questionnaire
should be given to a customer.
Leave blank to show the survey immediately and have it completed once.
This code is able to access the 'CheckCounter' which is unique to each user and
increments whenever they load a page this survey could be displayed on
and every 5 minutes they spend on the page thereafter.
To show the survey, the code is expected to set the value of a variable 'Result' to a response instance
(string to indicate why the user was shown the survey)
`;

export const EXTRA_RESPONDENT_DATA_HELP =
`Provide an API end point to be called for each customer before they surveyed.
In the url provided the toke '<RESPONDENT-ID>' will be replaced with the
current session's respondent id provided in the script tag.
The end point is expected to respond with a JSON object
containing further information on the customer.
This information will then be accessible along-side the customer's response
when the survey's results are exported.`;

export const QUESTION_TEXT_HELP =
`Variables provided by your Extra Respondent Data URL are accessible in the question text within {}.
e.g.
{name} will resolve to the provided name for the respondent.

The respondent's answers to previous questions are accessible by similar means using {Q<question-number>:A}
e.g.
{Q1:A} will resolve to the answer the respondent gave to the first question.
`;