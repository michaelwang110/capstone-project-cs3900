import React, {useState, useEffect, useRef} from 'react';
import QuestionWrapper from './QuestionWrapper';
import ProgressBar from './ProgressBar';
import { IMG_PATH } from '../Constants';
import {QuestionInfo, QuestionResponse, SurveyResponse, ExternalAttributes} from '../Types';
import {collectQuestions, sendResponse} from '../Api';
import '../Styles/Survey.css';

interface SurveyProps {
  setClosed: (val: boolean) => void;
  setError: (val: boolean) => void;
  setFinished: (val: boolean) => void;
  companyGuid: string;
  surveyGuid: string;
  respondentId: string;
  responseInstance: string;
}

function Survey(props: SurveyProps) {
    const survey_guid = props.surveyGuid;
    const company_guid = props.companyGuid;
    const respondent_id = props.respondentId;
    const response_instance = props.responseInstance;

    const close_survey = () => {
        submitQuestion();
        props.setClosed(true);
    };

    const [question_number, set_question_number] = useState(0);
    const [responses, set_responses] = useState<QuestionResponse[]>([]);

    function substituteQuestionText(q: QuestionInfo) {
        const regexp = /{Q(\d+):A}/g;
        let match = regexp.exec(q.Text);
        while (match !== null) {
            try {
                const prev_response_idx = parseInt(match[1]) - 1;
                if (prev_response_idx < responses.length) {
                    const prev_response = responses[prev_response_idx];
                    let prev_answer = prev_response.UserResponse;
                    const prev_question = questions[prev_response_idx];
                    switch (prev_question.Type) {
                        case 'Choose One':
                            prev_answer = prev_question.Options[parseInt(prev_answer) - 1];
                            break;
                        case 'Choose Multiple':
                            const answers = JSON.parse(prev_answer) as boolean[];
                            const chosen_answers = prev_question.Options.filter((option, idx) => answers[idx]);
                            prev_answer = JSON.stringify(chosen_answers);
                            break;
                    }
                    q.Text = q.Text.replace(match[0], prev_answer);
                }
            } catch {
            }
            match = regexp.exec(q.Text);
        }
    }

    // save a response by the user for a question
    // submitQuestion is separated to deal with set_responses being async
    function saveResponse(q_type: string, q_number: number, q_answer: string) {
        const q_response: QuestionResponse = {
            QuestionType: q_type,
            QuestionNumber: q_number + 1,
            UserResponse: q_answer
        };
        set_responses([...responses, q_response]);
    }

    function submitQuestion(): void {
        const s_response: SurveyResponse = {
            SurveyGuid: survey_guid,
            CompanyGuid: company_guid,
            QuestionResponses: responses,
            RespondentId: respondent_id,
            AdditionalInfo: '',
            ResponseInstance: response_instance
        };
        sendResponse(s_response, props.setError);
        set_question_number(question_number + 1);
    }

    // submit question whenever question_number is updated
    // first_update flag used to stop submitting on initial mount
    const first_update = useRef(true);
    useEffect(() => {
        if (first_update.current) {
            first_update.current = false;
            return;
        }
        submitQuestion();
    }, [responses]);

    const [questions, set_questions] = useState<QuestionInfo[]>([]);
    // hook equivalent to setting the questions on mount
    useEffect(() => {
        collectQuestions(company_guid, survey_guid, respondent_id, props.setError)
        .then(set_questions);
        }, []);

    // Survey is done after last question is answered
    const last_q_number = questions.length - 1;
    if (questions.length && question_number > last_q_number) {
        props.setFinished(true);
    }

    const image = <img
                        id='displayrsurvey-logo'
                        src={IMG_PATH}
                        alt={'logo'}
                    />;
    const close_button = (<button
                                id='displayrsurvey-close-button'
                                aria-label='Close'
                                onClick={() => close_survey()}
                            >
                                &times;
                            </button>);

    if (questions.length === 0 || question_number > last_q_number) {
        return (<div></div>);
    }

    substituteQuestionText(questions[question_number]);

    return (
        <div id='displayrsurvey-app-container'>
            <div id='displayrsurvey-survey-container'>
                <div id='displayrsurvey-survey-header'>
                    {image}
                    {close_button}
                </div>
                <div id='displayrsurvey-question-container'>
                    <div id='displayrsurvey-speech-bubble-container'>
                        <div id='displayrsurvey-speech-bubble'>
                            {questions[question_number].Text}
                        </div>
                    </div>
                    <QuestionWrapper
                        saveResponse={saveResponse}
                        questionNumber={question_number}
                        lastQ={question_number === last_q_number}
                        questionInfo={questions[question_number]}
                    />
                    <ProgressBar
                        questionNumber={question_number}
                        lastQ={last_q_number}
                    />
                </div>
            </div>
        </div>
    );
}

export default Survey;
