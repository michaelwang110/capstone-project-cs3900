import { QuestionTypeInfo, SurveyDesign, SurveyInfo } from './Types';

export const API_URL = 'https://surveys.displayr.com';

export const blankSurveyDesign: SurveyDesign = {
    SurveyQuestions: []
};

export const blankSurveyInfo: SurveyInfo = {
    Design: blankSurveyDesign,
    Name: '',
    SoftwareVersion: '1',
    CompanyGuid: '',
    SurveyGuid: '',
    WhenToSurveyCode: '',
    ExtraRespondentDataURL: '',
    EntryPoints: []
};

export const optionsUsers = ['Choose One', 'Choose Multiple'];
export const rangeUsers = ['Rating'];

export const DEFAULT_SCRIPT_TAG =
`<script>
    (function (w, d, s, o, f, js, fjs) {
        w['DisplayrSurvey'] = o; w[o] = w[o] || function () { (w[o].attrs = arguments[0]) };
        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
        js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
    }(window, document, 'script', 'DisplayrSurveyAttributes', 'https://surveys.displayr.com/bundle.min.js'));

    DisplayrSurveyAttributes({RespondentId: <RESPONDENT IDENTIFIER> , CompanyGuid: <COMPANY ID>, EntryPoint: <ENTRY POINT>});
</script>`;
