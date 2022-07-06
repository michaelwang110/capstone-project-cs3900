import React, {useState, useEffect} from 'react';
import EntryPoints from './EntryPoints';
import ScriptTag from './ScriptTag';
import Surveys from './Surveys';
import AuthDialog from '../../AuthoringDialog/Components/AuthDialog';
import { EntryPointResponse, SurveyInfo } from '../Types';
import { collectEntryPoints, collectSurveys } from '../Api';
import { blankSurveyInfo } from '../Constants';

interface SurveyAdminProps {
    companyGuid: string;
}

function SurveyAdmin(props: SurveyAdminProps) {
    const [entry_points, set_entry_points] = useState<Array<EntryPointResponse>>([]);
    const [surveys, set_surveys] = useState<Array<SurveyInfo>>([]);
    const [entry_points_collected, set_entry_points_collected] = useState(false);
    const [surveys_collected, set_surveys_collected] = useState(false);
    const [is_loading_entries, set_is_loading_entries] = useState(true);
    const [is_loading_surveys, set_is_loading_surveys] = useState(true);
    const [is_loading_script_tag, set_is_loading_script_tag] = useState(true);
    const [authoring_survey_info, set_authoring_survey_info] = useState(
        {
            ...blankSurveyInfo,
            CompanyGuid: props.companyGuid
        }
    );
    const [authoring_all_entry_points, set_authoring_all_entry_points] = useState<Array<string>>([]);
    const [open, set_open] = useState(false);
    const handle_click_open = () => set_open(true);
    const handle_click_close = () => set_open(false);
    const confirm_close = () =>
        confirm('Are you sure you want to exit questionnaire authoring? Unsaved changes will be lost.') && handle_click_close();
    const spinner =
        <div className='section shaded-form optional-vertical-scrollbar'>
            <img className='spinner' src='https://displayr-app-site.displayr.com/SharedWebUi/Images/spinner-large.gif?v=1' alt='Please Wait'/>
        </div>;

    useEffect(() => {
        set_is_loading_script_tag(false);
        collectEntryPoints(props.companyGuid)
        .then(set_entry_points)
        .then(() => set_entry_points_collected(true))
        .then(() => set_is_loading_entries(false));

        collectSurveys(props.companyGuid)
        .then(set_surveys)
        .then(() => set_surveys_collected(true))
        .then(() => set_is_loading_surveys(false));
    }, []);

    function updateSurveysMapping(entry_point: EntryPointResponse) {
        let updated_surveys = [] as string[];

        for (const survey of surveys) {
            if (survey.EntryPoints.includes(entry_point.Name)) {
                updated_surveys.push(survey.Name);
            }
        }

        return ({
            Name: entry_point.Name,
            Date: entry_point.Date,
            Surveys: updated_surveys
        });
    }

    const entry_points_with_surveys = entry_points.map(ep => updateSurveysMapping(ep));

    const entries_surveys_collected = entry_points_collected && surveys_collected;

    return (
        <div id='main-wrapper'>
            <div id='main'>
                <div id='main-content'>
                    <div id='licence' className='tab-body licence-tab-body selected'>
                        <AuthDialog
                            open = {open}
                            close = {handle_click_close}
                            confirmClose = {confirm_close}
                            surveyInfo = {authoring_survey_info}
                            entryPoints = {authoring_all_entry_points}
                            setIsLoadingSurveys = {set_is_loading_surveys}
                            setSurveys = {set_surveys}
                        />
                        <EntryPoints
                            entryPoints = {entry_points_with_surveys}
                            setEntryPoints = {set_entry_points}
                            companyGuid = {props.companyGuid}
                            updateSurveysMapping = {updateSurveysMapping}
                            setIsLoadingEntries ={set_is_loading_entries}
                            isLoadingEntries = {is_loading_entries}
                            entriesSurveysCollected = {entries_surveys_collected}
                            spinner = {spinner}
                        />
                        <ScriptTag
                            companyGuid={props.companyGuid}
                            isLoading = {is_loading_script_tag}
                            spinner = {spinner}
                        />
                        <Surveys
                            surveys = {surveys}
                            entryPoints = {entry_points}
                            setSurveys = {set_surveys}
                            companyGuid = {props.companyGuid}
                            setIsLoadingSurveys = {set_is_loading_surveys}
                            isLoadingSurveys = {is_loading_surveys}
                            setIsLoadingEntries = {set_is_loading_entries}
                            spinner = {spinner}
                            setAuthoringSurveyInfo = {set_authoring_survey_info}
                            setAuthoringAllEntryPoints = {set_authoring_all_entry_points}
                            openAuthoring = {handle_click_open}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SurveyAdmin;
