import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import TextQuestion from '../Components/TextQuestion';
import 'babel-polyfill';
import ReactTestUtils, { SyntheticEventData } from 'react-dom/test-utils';
import {sleep, loadTime} from './helpers/sleep';

describe('TextQuestion', () => {

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

    let mock_submit = jasmine.createSpy('submit');
    let props = {questionNumber: 1, lastQ: false, saveResponse: mock_submit};

    it('displays the state in the response field and updates state onChange()', async() => {
        render(<TextQuestion {...props}/>, container);
        await loadTime();
        const text_field: HTMLInputElement = document.getElementById('displayrsurvey-response-field') as HTMLInputElement;
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(text_field!, event_data as SyntheticEventData);
        expect(text_field!.value).toEqual('test');
    });

    it('submits the response when next/finish button is pressed', async() => {
        render(<TextQuestion {...props}/>, container);
        await loadTime();
        const next_button: HTMLElement = document.getElementById('displayrsurvey-next-button') as HTMLElement;
        next_button.click();
        expect(mock_submit).toHaveBeenCalled();
    });

    it('clears the response field when next/finish button is pressed', async() => {
        render(<TextQuestion {...props}/>, container);
        await loadTime();
        let text_field: HTMLInputElement = document.getElementById('displayrsurvey-response-field') as HTMLInputElement;
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(text_field!, event_data as SyntheticEventData);
        props.questionNumber += 1;
        render(<TextQuestion {...props}/>, container);
        await loadTime();
        text_field = document.getElementById('displayrsurvey-response-field') as HTMLInputElement;
        expect(text_field.value).toBe('');
    });

    it('displays \'next\' on the next button if this is not the final question', async() => {
        props.lastQ = false;
        render(<TextQuestion {...props}/>, container);
        await loadTime();
        const next_button = document.getElementById('displayrsurvey-next-button');
        expect(next_button!.innerText).toBe('Next');
    });

    it('displays \'finish\' on the next button if this is the final question', async() => {
        props.lastQ = true;
        render(<TextQuestion {...props}/>, container);
        await loadTime();
        const next_button = document.getElementById('displayrsurvey-next-button');
        expect(next_button!.innerText).toBe('Finish');
    });

});
