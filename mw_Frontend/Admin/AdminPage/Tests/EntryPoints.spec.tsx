import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'babel-polyfill';
import EntryPoints from '../Components/EntryPoints';
import { loadTime } from './helpers/sleep';
import './helpers/fetch';
import { prevResponse } from './helpers/fetch';
import { mock_entry_points, expected_request_remove_entry_point } from './helpers/mockResponses';
import { ENTRY_POINT_WITHOUT_SURVEYS_TEXT } from '../HelpText';

describe('EntryPoints', () => {

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

    const header_name_text = 'Survey Entry Points';
    const empty_surveys_text = ENTRY_POINT_WITHOUT_SURVEYS_TEXT;
    const mock_spinner = 'Spinner';
    const no_entry_points_message = 'No entry-points found. To set up an entry point add your script tag (see below) to a page on your website and reload the page.';
    let mock_set_entry_points = jasmine.createSpy('setEntryPoints');
    let mock_update_surveys_mapping = jasmine.createSpy('updateSurveysMapping');
    let mock_set_is_loading_entries = jasmine.createSpy('setIsLoadingEntries');

    let props = {
        entryPoints: mock_entry_points,
        setEntryPoints: mock_set_entry_points,
        companyGuid: '1',
        updateSurveysMapping: mock_update_surveys_mapping,
        setIsLoadingEntries: mock_set_is_loading_entries,
        isLoadingEntries: false,
        entriesSurveysCollected: true,
        spinner: mock_spinner
    };

    it('displays the correct header', () => {
        render(<EntryPoints {...props}/>, container);
        const header_name = document.getElementById('entry-points-container')!.getElementsByTagName('h2')[0].innerText;
        expect(header_name_text).toBe(header_name);
    });

    it('displays a spinner when entries are being loaded', () => {
        props.isLoadingEntries = true;
        render(<EntryPoints {...props}/>, container);
        const spinner = document.getElementsByClassName('spinner')[0].innerHTML;
        expect(spinner).toBe(mock_spinner);
        props.isLoadingEntries = false;
    });

    it('displays a table of entry points correctly', () => {
        render(<EntryPoints {...props}/>, container);
        const e = document.getElementById('entry-points-table') as HTMLTableElement;

        expect(e.rows.length - 1).toBe(props.entryPoints.length);

        for (let i = 0; i < e.rows.length; i++) {
            if (i === 0) {
                expect(e.rows[i].cells[0].innerHTML).toBe('');
                expect(e.rows[i].cells[1].innerHTML).toBe('Last Seen');
                expect(e.rows[i].cells[2].innerHTML).toBe('Surveys');
                expect(e.rows[i].cells.length).toBe(3);
                continue;
            }
            expect(e.rows[i].cells[0].innerHTML).toBe(props.entryPoints[i - 1].Name);
            expect(e.rows[i].cells[1].innerHTML).toBe(props.entryPoints[i - 1].Date);

            expect(e.rows[i].cells[2].innerHTML).toBe(
                props.entryPoints[i - 1].Surveys.length > 0 ?
                    props.entryPoints[i - 1].Surveys.join(', ')
                    :
                    empty_surveys_text
            );

            expect(e.rows[i].cells.length).toBe(4);
        }
    });

    it('displays a no entry points message if the list of entrypoints is empty', () => {
        props.entryPoints = [];
        render(<EntryPoints {...props}/>, container);
        const no_entry_points = document.getElementById('entry-points-table-body')!;

        expect(no_entry_points.innerText).toBe(no_entry_points_message);
        props.entryPoints = mock_entry_points;
    });

    it('removes an entry point row from the table when the row\'s forget button is pressed', async() => {
        render(<EntryPoints {...props}/>, container);

        const forget_button = document.getElementsByClassName('forget-button')[0] as HTMLElement;
        forget_button!.click();
        await loadTime();
        await loadTime();
        expect(mock_set_is_loading_entries).toHaveBeenCalledWith(true);
        expect(prevResponse).toBe(expected_request_remove_entry_point);
    });
});
