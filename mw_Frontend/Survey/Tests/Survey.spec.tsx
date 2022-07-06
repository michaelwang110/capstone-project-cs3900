import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'babel-polyfill';
import ReactTestUtils, { SyntheticEventData } from 'react-dom/test-utils';
import App from '../Components/App';
import {sleep, loadTime} from './helpers/sleep';
import {expected_response_text, expected_response_rating, expected_response_choose_one,
    expected_response_choose_multiple } from './helpers/mockResponses';
import './helpers/fetch';
import {prevResponse} from './helpers/fetch';
import { FINISH_DELAY } from '../Constants';


describe('Survey', () => {

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


    let mock_close = jasmine.createSpy('close');
    const props = {
        respondentId: 'full survey',
        surveyGuid: '2',
        companyGuid: '3',
        responseInstance: 'after 5 minutes',
        closeSurvey: mock_close

    };

    it('displays questions collected from api call', async() => {
        render(<App {...props}/>, container);
        await loadTime();
        let survey = document.getElementById('displayrsurvey-speech-bubble');
        expect(survey!.innerText).toBe('test');
    });

    it('moves to the next question when answer to current question has been submitted', async() => {
        render(<App {...props}/>, container);
        await loadTime();
        const next_button = document.getElementById('displayrsurvey-next-button') as HTMLElement;
        next_button.click();
        await loadTime();
        let survey = document.getElementById('displayrsurvey-speech-bubble');
        expect(survey!.innerText).toBe('test2');
    });

    it('accurately passes the user\'s response to a text question to the backend', async() => {
        render(<App {...props}/>, container);
        await loadTime();
        const text_field = document.getElementById('displayrsurvey-response-field');
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(text_field!, event_data as SyntheticEventData);
        await loadTime();
        const next_button = document.getElementById('displayrsurvey-next-button') as HTMLElement;
        next_button.click();
        await loadTime();
        expect(prevResponse).toBe(expected_response_text);
    });

    it('accurately passes the user\'s response to a rating question to the backend', async() => {
        render(<App {...props}/>, container);
        await loadTime();
        const next_button = document.getElementById('displayrsurvey-next-button') as HTMLElement;
        next_button.click();
        await loadTime();
        const rating_option = document.getElementsByClassName('displayrsurvey-rating-option')[0] as HTMLElement;
        rating_option.click();
        await loadTime();
        expect(prevResponse).toBe(expected_response_rating);
    });

    it('accurately passes the user\'s response to a choose one question to the backend', async() => {
        render(<App {...props}/>, container);
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
        expect(prevResponse).toBe(expected_response_choose_one);
    });

    it('accurately passes the user\'s response to a choose multiple question to the backend', async() => {
        render(<App {...props}/>, container);
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
        expect(prevResponse).toBe(expected_response_choose_multiple);
    });

    it('closes the survey when the close button is pressed', async() => {
        render(<App {...props}/>, container);
        await loadTime();
        const close_button = document.getElementById('displayrsurvey-close-button') as HTMLElement;
        close_button.click();
        await loadTime();
        expect(mock_close).toHaveBeenCalled();
    });

    it('displays survey end after all questions', async() => {
        render(<App {...props}/>, container);
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
        expect(document.getElementById('displayrsurvey-end-container')).toBeTruthy();
    });

    it('closes survey after a short interval when all questions are answered ', async() => {
        render(<App {...props}/>, container);
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
        await sleep(FINISH_DELAY + 100);
        expect(document.getElementById('displayrsurvey-survey-container')).toBeFalsy();
    });

    it('can display answers from a previous text question in the question text ', async() => {
        props.respondentId = 'q_info_pass: text'
        render(<App {...props}/>, container);
        await loadTime();
        const text_field = document.getElementById('displayrsurvey-response-field');
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(text_field!, event_data as SyntheticEventData);
        await loadTime();
        const next_button = document.getElementById('displayrsurvey-next-button') as HTMLElement;
        next_button.click();
        await loadTime();
        const speech_bubble = document.getElementById('displayrsurvey-speech-bubble') as HTMLElement;
        expect(speech_bubble.innerText).toBe('test: test')

        props.respondentId = 'full survey'
    });

    it('can display answers from a previous rating question in the question text ', async() => {
        props.respondentId = 'q_info_pass: rating'
        render(<App {...props}/>, container);
        await loadTime();
        const rating_option = document.getElementsByClassName('displayrsurvey-rating-option')[0] as HTMLElement;
        rating_option.click();
        await loadTime();
        const speech_bubble = document.getElementById('displayrsurvey-speech-bubble') as HTMLElement;
        expect(speech_bubble.innerText).toBe('test: 2')
        props.respondentId = 'full survey'
    });
    
    it('can display answers from a previous choose one question in the question text ', async() => {
        props.respondentId = 'q_info_pass: choose one'
        render(<App {...props}/>, container);
        await loadTime();
        const option = document.getElementsByClassName('displayrsurvey-choose-option')[0] as HTMLElement;
        option.click();
        await loadTime();
        const speech_bubble = document.getElementById('displayrsurvey-speech-bubble') as HTMLElement;
        expect(speech_bubble.innerText).toBe('test: First One')

        props.respondentId = 'full survey'
    });

    it('can display answers from a previous choose multiple question in the question text ', async() => {
        props.respondentId = 'q_info_pass: choose multiple'
        render(<App {...props}/>, container);
        await loadTime();
        const option = document.getElementsByClassName('displayrsurvey-choose-option')[0] as HTMLElement;
        option.click();
        await loadTime();
        const option_2 = document.getElementsByClassName('displayrsurvey-choose-option')[1] as HTMLElement;
        option_2.click();
        const next_button = document.getElementById('displayrsurvey-next-button') as HTMLElement;
        next_button.click();
        await loadTime();
        const speech_bubble = document.getElementById('displayrsurvey-speech-bubble') as HTMLElement;
        expect(speech_bubble.innerText).toBe('test: {Q1:A}')

        props.respondentId = 'full survey'
    });
});

