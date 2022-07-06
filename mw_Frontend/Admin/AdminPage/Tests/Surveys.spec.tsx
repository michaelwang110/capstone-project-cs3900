import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'babel-polyfill';
import Surveys from '../Components/Surveys';
import { loadTime } from './helpers/sleep';
import './helpers/fetch';
import { prevResponse } from './helpers/fetch';
import { blankSurveyInfo, API_URL } from '../Constants';
import { mock_entry_points, mock_surveys, expected_request_remove_survey, expected_request_duplicate_survey, expected_request_outfile_survey, expected_request_get_triple_s } from './helpers/mockResponses';
import { SURVEY_WITHOUT_ENTRY_POINTS_TEXT } from '../HelpText';

describe('Surveys', () => {
    let container: HTMLDivElement;
    beforeEach(() => {
        // setup a DOM element as a render target
        spyOn(window, 'confirm').and.callFake(function () {
            return true;
        });

        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container!);
        container!.remove();
    });

    const header_name_text = 'Surveys';
    const empty_entry_points_text = SURVEY_WITHOUT_ENTRY_POINTS_TEXT;
    const no_surveys_message = 'No surveys have been written. Click \'Add\' to start.';
    let mock_set_surveys = jasmine.createSpy('setSurveys');
    let mock_set_is_loading_surveys = jasmine.createSpy('setIsLoadingSurveys');
    let mock_set_is_loading_entries = jasmine.createSpy('setIsLoadingEntries');
    let mock_spinner = 'Spinner';
    let mock_set_authoring_survey_info = jasmine.createSpy('setAuthoringSurveyInfo');
    let mock_set_authoring_all_entry_points = jasmine.createSpy('setAuthoringAllEntryPoints');
    let mock_open_authoring = jasmine.createSpy('openAuthoring');

    let props = {
        surveys: mock_surveys,
        entryPoints: mock_entry_points,
        setSurveys: mock_set_surveys,
        companyGuid: '1',
        setIsLoadingSurveys: mock_set_is_loading_surveys,
        isLoadingSurveys: false,
        setIsLoadingEntries: mock_set_is_loading_entries,
        spinner: mock_spinner,
        setAuthoringSurveyInfo: mock_set_authoring_survey_info,
        setAuthoringAllEntryPoints: mock_set_authoring_all_entry_points,
        openAuthoring: mock_open_authoring
    };

    it('displays the correct header', () => {
        render(<Surveys {...props}/>, container);
        const header_name = document.getElementById('surveys-container')!.getElementsByTagName('h2')[0].innerText;
        expect(header_name_text).toBe(header_name);
    });

    it('displays a spinner when surveys are being loaded', () => {
        props.isLoadingSurveys = true;
        render(<Surveys {...props}/>, container);
        const spinner = document.getElementsByClassName('spinner')[0].innerHTML;
        expect(spinner).toBe(mock_spinner);
        props.isLoadingSurveys = false;
    });

    it('displays a table of surveys correctly', () => {
        render(<Surveys {...props}/>, container);
        const e = document.getElementById('surveys-table') as HTMLTableElement;

        expect(e.rows.length - 2).toBe(props.surveys.length);

        for (let i = 0; i < e.rows.length; i++) {
            if (i === 0) {
                expect(e.rows[i].cells[0].innerHTML).toBe('');
                expect(e.rows[i].cells[1].innerHTML).toBe('Entry Points');
                expect(e.rows[i].cells.length).toBe(2);
                continue;
            } else if (i === e.rows.length - 1) {
                expect(e.rows[i].cells.length).toBe(3);
                break;
            }

            expect(e.rows[i].cells[0].innerHTML).toBe(props.surveys[i - 1].Name);

            expect(e.rows[i].cells[1].innerHTML).toBe(
                props.surveys[i - 1].EntryPoints.length > 0 ?
                    props.surveys[i - 1].EntryPoints.join(', ')
                    :
                    empty_entry_points_text
            );

            expect(e.rows[i].cells.length).toBe(7);
        }
    });

    it('displays a no surveys message if the list of surveys is empty', () => {
        props.surveys = [];
        render(<Surveys {...props}/>, container);
        const no_surveys = document.getElementById('surveys-table-body')!.getElementsByTagName('td')[0];

        expect(no_surveys.innerHTML).toBe(no_surveys_message);
        props.surveys = mock_surveys;
    });

    it('opens the questionnaire authoring modal when the add button is pressed', async () => {
        render(<Surveys {...props}/>, container);

        const add_button = document.getElementById('add-button') as HTMLElement;
        add_button!.click();
        await loadTime();
        expect(mock_set_authoring_survey_info).toHaveBeenCalledWith({...blankSurveyInfo, CompanyGuid: props.companyGuid});
        expect(mock_set_authoring_all_entry_points).toHaveBeenCalledWith(props.entryPoints.map(e => e.Name));
        expect(mock_open_authoring).toHaveBeenCalled();
    });

    it('opens the questionnaire authoring modal when the row\'s edit button is pressed', async() => {
        render(<Surveys {...props}/>, container);

        const edit_button = document.getElementsByClassName('edit-button')[0] as HTMLElement;
        edit_button!.click();
        await loadTime();
        expect(mock_set_authoring_survey_info).toHaveBeenCalledWith(props.surveys[0]);
        expect(mock_set_authoring_all_entry_points).toHaveBeenCalledWith(props.entryPoints.map(e => e.Name));
        expect(mock_open_authoring).toHaveBeenCalled();
    });

    it('duplicates the current survey row when the row\'s duplicate button is pressed', async() => {
        render(<Surveys {...props}/>, container);

        const duplicate_button = document.getElementsByClassName('duplicate-button')[0] as HTMLElement;
        duplicate_button!.click();
        await loadTime();
        await loadTime();
        expect(mock_set_is_loading_surveys).toHaveBeenCalledWith(true);
        expect(prevResponse).toBe(expected_request_duplicate_survey);
        expect(mock_set_is_loading_surveys).toHaveBeenCalledWith(false);
    });

    it('removes a survey row from the table when the row\'s delete button is pressed', async() => {
        render(<Surveys {...props}/>, container);

        const delete_button = document.getElementsByClassName('delete-button')[0] as HTMLElement;
        delete_button!.click();
        await loadTime();
        await loadTime();
        expect(mock_set_is_loading_surveys).toHaveBeenCalledWith(true);
        expect(prevResponse).toBe(expected_request_remove_survey);
        expect(mock_set_is_loading_surveys).toHaveBeenCalledWith(false);
    });
});
