// possible issue:
// if setinterval is tied to the window then clearing the react elements won't clear it
// i.e. the intervals are continuing to run between tests

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'babel-polyfill';
import AppManager from '../Components/AppManager';
import {sleep, loadTime} from './helpers/sleep';
import './helpers/fetch';
import './helpers/setInterval';
import { prevResponse, prevResponseInterval } from './helpers/fetch';
import { FINISH_DELAY } from '../Constants';

describe('AppManager', () => {

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

    const props_appear = {
        respondentId: '1',
        companyGuid: '3',
        entryPoint: 'should appear',
    };

    const props_no_appear = {
        respondentId: '1',
        companyGuid: '3',
        entryPoint: 'shouldnt appear',
    };

    it('increments check count once on page load', async() => {
        render(<AppManager {...props_no_appear}/>, container);
        await loadTime();
        await loadTime();
        // expect check count to be 2 because our mock setInterval runs immediately and once,
        // so a second count indicates an increment due to the page load
        expect(prevResponseInterval.includes('"CheckCount":2')).toBeTruthy();
    });

    it('does not display a survey if when_to_survey code fails', async() => {
        render(<AppManager {...props_no_appear}/>, container);
        await loadTime();
        let survey = document.getElementById('displayrsurvey-app-container');
        expect(survey).toEqual(null);
    });

    it('displays a survey when when_to_survey code succeeds', async() => {
        render(<AppManager {...props_appear}/>, container);
        await loadTime();
        let survey = document.getElementById('displayrsurvey-app-container');
        expect(survey).toBeDefined();
    });

    it('will not increment counter when survey is showing', async() => {
        render(<AppManager {...props_appear}/>, container);
        await loadTime();
        let survey = document.getElementById('displayrsurvey-app-container');
        expect(survey).toBeDefined();
        expect(prevResponseInterval.includes('"CheckCount":1')).toEqual(true);
    });

    it('will not consider a response instance completed just by rendering the survey', async() => {
        render(<AppManager {...props_appear}/>, container);
        await loadTime();
        let survey = document.getElementById('displayrsurvey-app-container');
        expect(survey).toBeDefined();
        expect(prevResponse).toBe('');
    });

    it('will consider a response instance completed if the survey is closed', async() => {
        render(<AppManager {...props_appear}/>, container);
        await loadTime();
        const close_button = document.getElementById('displayrsurvey-close-button') as HTMLInputElement;
        close_button.click();
        await loadTime();
        let survey = document.getElementById('displayrsurvey-app-container');
        expect(survey).toEqual(null);
        expect(prevResponse.includes('"ResponseInstance":"test"')).toBe(true);
    });

    it('will consider a response instance completed if the survey is answered', async() => {
        render(<AppManager {...props_appear}/>, container);
        await loadTime();
        const next_button = document.getElementById('displayrsurvey-next-button') as HTMLElement;
        next_button.click();
        await loadTime();
        const rating_option = document.getElementsByClassName('displayrsurvey-rating-option')[0] as HTMLElement;
        rating_option.click();
        await loadTime();
        const option = document.getElementsByClassName('displayrsurvey-choose-option')[0] as HTMLElement;
        option.click();
        await loadTime();
        const option_2 = document.getElementsByClassName('displayrsurvey-choose-option')[0] as HTMLElement;
        option_2.click();
        const next_button_2 = document.getElementById('displayrsurvey-next-button') as HTMLElement;
        next_button_2.click();
        await loadTime();
        expect(prevResponse.includes('"ResponseInstance":"test"')).toBe(true);
        await sleep(FINISH_DELAY + 100);
        let survey = document.getElementById('displayrsurvey-app-container');
        expect(survey).toEqual(null);
    });


});

