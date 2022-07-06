import React, {useState, useEffect} from 'react';
import 'react-app-polyfill/ie11';
import { RespondentInfo } from '../Types';
import App from './App';
import { getSurveys, saveEntryPoint, saveRespondentInfo, runWhenToSurvey } from '../Api';
import '../Styles/App.css';
import '../modernizr/modernizr';
import { CHECKCOUNT_INCREMENT_DELAY } from '../Constants';

declare global {
    interface Window {
        Modernizr: {
            [index: string]: boolean;
        };
    }
}

// check if the user's browser supports the features required to run the survey widget
function checkSupported(): boolean {
    let supported = true;
    let modernizr = window.Modernizr;

    for (let feature in modernizr) {
        if (!modernizr[feature]) {
            supported = false;
            break;
        }
    }
    return supported;
}


function checkRunSurvey(company_guid: string, survey_guid: string, respondent: RespondentInfo, interval_id: number | null, set_survey: (s: SurveyLoadInfo) => void) {
    return runWhenToSurvey(company_guid, respondent.RespondentId, survey_guid)
    .then(response_instance => {
        if (response_instance && !respondent.CompletedResponseInstances.includes(response_instance)) {
            respondent = {...respondent, CompletedResponseInstances: [...respondent.CompletedResponseInstances, response_instance]};
            set_survey({
                surveyGuid: survey_guid,
                respondent: respondent,
                responseInstance: response_instance
            });
            if (interval_id !== null) {
                clearInterval(interval_id);
            }
            return true;
        }
    return false;
    });

}

function updateRespondentInfo(survey_guid: string, respondent: RespondentInfo,
    update_extra_respondent_data: boolean, company_guid: string) {
    respondent.CheckCount += 1;
    saveRespondentInfo(survey_guid, respondent, update_extra_respondent_data, company_guid);
}

function setupSurveyTimer(survey_guid: string, respondent: RespondentInfo,
    company_guid: string, set_survey: (s: SurveyLoadInfo) => void) {
    // 'any' used because webpack and typescript disagree on the return type of setInterval
    // causing compilation issues
    let interval_id: any = setInterval(() => {
        updateRespondentInfo(survey_guid, respondent, false, company_guid);
        checkRunSurvey(company_guid, survey_guid, respondent, interval_id, set_survey);
    },
    CHECKCOUNT_INCREMENT_DELAY);
}

interface SurveyLoadInfo {
    surveyGuid: string;
    respondent: RespondentInfo;
    responseInstance: string;
}

interface AppManagerProps {
    companyGuid: string;
    respondentId: string;
    entryPoint: string;
    test_error_handler?: boolean;
}

function AppManager(props: AppManagerProps) {

    const [supported, set_supported] = useState(false);
    const [survey, set_survey] = useState<SurveyLoadInfo| null>(null);

    if (props.test_error_handler) {
        throw Error('test error');
    }

    const close_survey = () => {
        setupSurveyTimer(survey!.surveyGuid, survey!.respondent, props.companyGuid, set_survey);
        set_survey(null);
    };

    useEffect(() => {
        set_supported(checkSupported());
    }, []);

    useEffect(() => {
        if (supported) {
            saveEntryPoint(props.companyGuid, props.entryPoint);

            getSurveys(props.companyGuid, props.respondentId, props.entryPoint)
            .then(surveys => surveys.map(sp => {
                // update count on page load
                // if this does not trigger a survey, set interval
                updateRespondentInfo(sp.SurveyGuid, sp.Respondent, true, props.companyGuid);
                checkRunSurvey(props.companyGuid, sp.SurveyGuid, sp.Respondent, null, set_survey)
                .then(running => {
                    if (!running) {
                        setupSurveyTimer(sp.SurveyGuid, sp.Respondent, props.companyGuid, set_survey);
                    }
                });
            }));
        }
    }, [supported]);

    return (supported && survey) ?
        <App
            companyGuid={props.companyGuid}
            surveyGuid={survey.surveyGuid}
            closeSurvey={close_survey}
            respondentId={survey.respondent.RespondentId}
            responseInstance={survey!.responseInstance}
        />
        :
        null;
}

export default AppManager;