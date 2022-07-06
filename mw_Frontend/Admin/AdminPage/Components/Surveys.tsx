import React, { useState } from 'react';
import { SurveyInfo, SurveyDeleteRequest, EntryPointResponse } from '../Types';
import { removeSurvey, sendSurvey } from '../Api';
import { blankSurveyInfo, API_URL } from '../Constants';
import { SURVEYS_HELP, SURVEY_WITHOUT_ENTRY_POINTS_TEXT } from '../HelpText';
import '../Styles/Surveys.css';

interface SurveysProps {
    surveys: SurveyInfo[];
    entryPoints: EntryPointResponse[];
    setSurveys: (surveys: Array<SurveyInfo>) => void;
    companyGuid: string;
    setIsLoadingSurveys: (is_loading_surveys: boolean) => void;
    isLoadingSurveys: boolean;
    setIsLoadingEntries: (is_loading_entries: boolean) => void;
    spinner: any;
    setAuthoringSurveyInfo: (authoring_survey_info: SurveyInfo) => void;
    setAuthoringAllEntryPoints: (all_entry_points: Array<string>) => void;
    openAuthoring: () => void;
}

function Surveys(props: SurveysProps) {

    function handleAdd() {
        props.setAuthoringSurveyInfo(
            {...blankSurveyInfo,
                CompanyGuid: props.companyGuid
            }
        );
        props.setAuthoringAllEntryPoints(props.entryPoints.map(e => e.Name));
        props.openAuthoring();
    }

    function handleEdit(survey: SurveyInfo) {
        props.setAuthoringSurveyInfo(survey);
        props.setAuthoringAllEntryPoints(props.entryPoints.map(e => e.Name));
        props.openAuthoring();
    }

    function handleDuplicate(survey: SurveyInfo) {
        const duplicate_survey_request = {
            ...survey,
            SurveyGuid: '',
            Name: `${survey.Name} (Copy)`
        } as SurveyInfo;

        props.setIsLoadingSurveys(true);
        sendSurvey(duplicate_survey_request)
        .then(props.setSurveys)
        .then(() => props.setIsLoadingSurveys(false));
    }

    function handleDelete(survey_guid: string) {
        const survey_delete_request = {
            CompanyGuid: props.companyGuid,
            SurveyGuid: survey_guid
        } as SurveyDeleteRequest;

        if (confirm('Are you sure?')) {
            props.setIsLoadingSurveys(true);
            removeSurvey(survey_delete_request)
            .then(props.setSurveys)
            .then(() => props.setIsLoadingSurveys(false));
        }
    }

    function handleExport(survey_guid: string) {
        window.location.assign(`${API_URL}/Admin/CreateTripleS?company_guid=${props.companyGuid}&survey_guid=${survey_guid}`);
    }

    function renderTableButtons(survey: SurveyInfo, index: number) {
        return (
            <>
                <td style={{width: '200%'}}></td>
                <td className='numeric-align'>
                    <button
                        className='edit-button'
                        aria-label='edit'
                        onClick={() => handleEdit(survey)}
                    >
                        Edit
                    </button>
                </td>
                <td className='numeric-align'>
                    <button
                        className='duplicate-button'
                        aria-label='duplicate'
                        onClick={() => handleDuplicate(survey)}
                    >
                        Duplicate
                    </button>
                </td>
                <td className='numeric-align'>
                    <button
                        className='delete-button'
                        aria-label='delete'
                        onClick={() => handleDelete(survey.SurveyGuid)}
                    >
                        Delete
                    </button>
                </td>
                <td className='numeric-align'>
                    <button
                        className='export-button'
                        aria-label='export'
                        id={`button-${index}`}
                        onClick={() => handleExport(survey.SurveyGuid)}
                    >
                        Export
                    </button>
                </td>
            </>
        );
    }

    const table_header =
        <thead>
            <tr>
                <th></th>
                <th>Entry Points</th>
            </tr>
        </thead>;

    const table_data =
        props.surveys.map((survey, idx) => {
            return (
                <tr key={survey.Name}>
                    <td style={{width: '25%'}}>{survey.Name}</td>
                    <td style={{width: '200%'}}>
                        {survey.EntryPoints.length > 0 ?
                            survey.EntryPoints.join(', ')
                            :
                            SURVEY_WITHOUT_ENTRY_POINTS_TEXT}
                    </td>
                    {renderTableButtons(survey, idx)}
                </tr>
            );
        });

    const add_button =
        <tr>
            <td></td>
            <td></td>
            <td align='right' colSpan={5}>
                <button
                    id='add-button'
                    aria-label='add'
                    onClick={() => handleAdd()}
                    style={{marginTop: '9px'}}
                >
                    Add
                </button>
            </td>
        </tr>;

    const no_surveys_message =
        <tr>
            <td className='spanning-columns' colSpan={7}>
                No surveys have been written. Click 'Add' to start.
            </td>
        </tr>;

    const table =
        <div className='section shaded-form'>
            <table id='surveys-table' className='form-table' style={{fontSize: '13px', fontFamily: 'Open Sans,Sans-Serif'}}>
                {table_header}
                <tbody id='surveys-table-body'>
                    {props.surveys !== null && props.surveys.length > 0 ?
                        table_data
                        :
                        no_surveys_message}
                    {add_button}
                </tbody>
            </table>
        </div>;

    const header_bar =
        <div className='header-bar'>
            <h2>
                Surveys
            </h2>
            <p className='help'>
                {SURVEYS_HELP}
            </p>
        </div>;

    return (
        <div id='surveys-container'>
            {header_bar}
            {props.isLoadingSurveys ? <div className='spinner'>{props.spinner}</div> : table}
        </div>
    );
}

export default Surveys;
