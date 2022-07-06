import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'babel-polyfill';
import SurveyAdmin from '../Components/SurveyAdmin';
import { loadTime } from './helpers/sleep';
import './helpers/fetch';
import { prevResponse } from './helpers/fetch';
import { expected_request_collect_entries_points, expected_request_collect_surveys } from './helpers/mockResponses';

describe('SurveyAdmin', () => {

    let container: HTMLDivElement;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container!);
        container!.remove();
    });

    const props = { companyGuid: '1' };

    it('loads entries correctly on mount', async() => {
        render(<SurveyAdmin {...props}/>, container);
        await loadTime();
        expect(prevResponse).toBe(expected_request_collect_entries_points);
    });

    it('loads surveys correctly on mount', async() => {
        render(<SurveyAdmin {...props}/>, container);
        await loadTime();
        expect(prevResponse).toBe(expected_request_collect_surveys);
    });
});
