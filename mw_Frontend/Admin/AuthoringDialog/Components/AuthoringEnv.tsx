import React, {useState} from 'react';
import 'react-app-polyfill/ie11';
import { typeInfo, defaultQuestionValues } from '../Constants';
import {  WHEN_TO_SURVEY_HELP, EXTRA_RESPONDENT_DATA_HELP } from '../HelpText';
import QuestionWrapper from './QuestionWrapper';
import { QuestionInfo, SurveyInfo } from '../Types';
import '../Styles/AuthoringEnv.css';
import { sendSurvey } from '../Api';

interface AuthoringEnvProps {
    surveyInfo: SurveyInfo;
    allEntrypoints: string[];
    close: () => void;
    confirmClose: () => void;
    setIsLoadingSurveys: (is_loading_surveys: boolean) => void;
    setSurveys: (surveys: Array<SurveyInfo>) => void;
}

function AuthoringEnv(props: AuthoringEnvProps) {

    const [questions, set_questions] = useState(props.surveyInfo.Design.SurveyQuestions);
    const [when_to_survey, set_when_to_survey] = useState(props.surveyInfo.WhenToSurveyCode);
    const [extra_respondent_data, set_extra_respondent_data] = useState(props.surveyInfo.ExtraRespondentDataURL);
    const [selected_entrypoints, set_selected_entrypoints] = useState(props.surveyInfo.EntryPoints);
    const [name, set_name] = useState(props.surveyInfo.Name);

    function removeQuestion(question_number: number) {
        set_questions(questions.filter((val, idx) => question_number - 1 !== idx));
    }

    function updateQuestion(question_number: number, new_question: QuestionInfo) {
        set_questions(questions.map((question, idx) => {
            return (question_number - 1 === idx) ? new_question : question;
        }));
    }

    function saveSurvey() {
        const survey = {
            ...props.surveyInfo,
            Name: name,
            Design: {SurveyQuestions: questions},
            WhenToSurveyCode: when_to_survey,
            ExtraRespondentDataURL: extra_respondent_data,
            EntryPoints: selected_entrypoints
        } as SurveyInfo;

        props.setIsLoadingSurveys(true);
        sendSurvey(survey)
        .then(props.setSurveys)
        .then(() => props.setIsLoadingSurveys(false));
        props.close();
    }

    function updateEntrypoint(entrypoint: string) {
        let new_selected_entrypoints = selected_entrypoints;
        if (selected_entrypoints.includes(entrypoint)) {
            new_selected_entrypoints = new_selected_entrypoints.filter(e => e !== entrypoint);
        } else {
            new_selected_entrypoints = new_selected_entrypoints.concat(entrypoint);
        }

        set_selected_entrypoints(new_selected_entrypoints);
    }

    const name_field =
        <table className='form-table name-container'>
            <tbody>
                <tr>
                    <td>
                        <label
                            htmlFor='name-field'
                            id='name-label'
                        >
                            Questionnaire Name:
                        </label>
                    </td>
                    <td>
                        <input
                            id='name-field'
                            type='text'
                            placeholder='Questionnaire Name...'
                            value={name}
                            onChange={e => set_name(e.target.value)}
                        />
                    </td>
                </tr>
            </tbody>
        </table>;


    const header_bar =
        <div id='header-bar'>
            <h2 id='header-text'>
                {props.allEntrypoints.length ?
                    'Show questionnaire from these entry points (pages):'
                    :
                    `No entry points available: Either a script tag has not yet been added
                        to a page on your website or that page has not been visited since.`
                }
            </h2>
            <div id='entry-points'>
                {props.allEntrypoints.length &&
                    props.allEntrypoints.map((entrypoint, idx) =>
                        <div
                            className={`entry-point${selected_entrypoints.includes(entrypoint) ? ' selected' : ''}`}
                            onClick={() => updateEntrypoint(entrypoint)}
                            key={entrypoint}
                        >
                            {entrypoint}
                        </div>
                    )
                }
            </div>
        </div>;

    const questions_container =
        <div id='questions-container'>
            {questions.map((q_info, idx) => {
                return <QuestionWrapper
                            key={idx + 1}
                            questionInfo={q_info}
                            questionNumber={idx + 1}
                            removeQuestion={removeQuestion}
                            updateQuestion={updateQuestion}
                        />;
                })
            }
        </div>;

    const add_question_buttons =
        <div id='add-question-buttons-container'>
            {typeInfo.map(question_type =>
                <button
                    key={question_type.Type}
                    className='add-question-button'
                    aria-label={question_type.Type}
                    value={question_type.Type}
                    onClick={() => set_questions([...questions, {
                        Type: question_type.Type,
                        ...defaultQuestionValues
                        } as QuestionInfo]
                    )}
                >
                    <h4 className='add-button-title'><u>Add {question_type.Type} Question</u></h4>
                    <br/>
                    {question_type.Description}
                </button>
            )}
        </div>;

    const when_to_survey_snippet =
        <div className='help'>
            e.g.
            <br/>
            if (CheckCount == 13)
            <br/>
            &emsp; Result = "after 1 hour";
        </div>;

    const footer_fields =
        <table className='form-table' id='footer-fields'>
            <tbody>
                <tr>
                    <td className='footer-field-tag'>
                        <label htmlFor='when-to-survey-field'>
                            <h2>
                                When to survey:
                            </h2>
                        </label>
                    </td>
                    <td><textarea
                        id='when-to-survey-field'
                        placeholder='Code'
                        value={when_to_survey}
                        onChange={e => set_when_to_survey(e.target.value)}
                    /></td>
                </tr>
                 <tr>
                    <td colSpan={2}>
                         <div className='when-to-survey-tooltip help'>
                            {WHEN_TO_SURVEY_HELP}
                            <br/>
                            {when_to_survey_snippet}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='footer-field-tag'>
                        <label htmlFor='extra-repondent-data-field'>
                            <h2>
                                Fetch extra respondent data:
                            </h2>
                        </label>
                    </td>
                    <td>
                        <input
                            id='extra-repondent-data-field'
                            type='text'
                            placeholder='URL'
                            value={extra_respondent_data}
                            onChange={e => set_extra_respondent_data(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                            <div className='when-to-survey-tooltip help'>
                            {EXTRA_RESPONDENT_DATA_HELP}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>;

    const footer_buttons =
        <div id='footer-buttons'>
            <button
                id='ok-button'
                className='footer-button'
                aria-label='submit'
                onClick={saveSurvey}
            >
                OK
            </button>
            <button
                id='close-button'
                className='footer-button'
                aria-label='close'
                onClick={() => props.confirmClose()}
            >
                Cancel
            </button>
        </div>;

    return (
        <div id='authoring-env-container'>
            {name_field}
            {header_bar}
            {questions_container}
            {add_question_buttons}
            <div id='footer-container'>
                {footer_fields}
                {footer_buttons}
            </div>
        </div>
    );
}

export default AuthoringEnv;
