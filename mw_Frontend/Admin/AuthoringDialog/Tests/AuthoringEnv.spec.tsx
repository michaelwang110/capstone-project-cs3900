import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'babel-polyfill';
import ReactTestUtils, { SyntheticEventData } from 'react-dom/test-utils';
import AuthoringEnv from '../Components/AuthoringEnv';
import { loadTime } from './helpers/sleep';
import './helpers/fetch';
import { prevResponse } from './helpers/fetch';
import { DEFAULT_RATING_OPTIONS } from '../Constants';
import { expected_save_survey_body, blankSurveyInfo } from './helpers/mockResponses';

describe('AuthoringEnv', () => {

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
    let mock_confirm_close = jasmine.createSpy('confirm_close');
    let mock_loading_surveys = jasmine.createSpy('setIsLoadingSurveys');
    let mock_set_surveys = jasmine.createSpy('setSurveys');
    const props = {surveyInfo: blankSurveyInfo, allEntrypoints: ['test'], close: mock_close,
        confirmClose: mock_confirm_close, setIsLoadingSurveys: mock_loading_surveys, setSurveys: mock_set_surveys};

    it('displays when to survey js for editing', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const when_to_survey = document.getElementById('when-to-survey-field') as HTMLInputElement;
        expect(when_to_survey.value).toBe(blankSurveyInfo.WhenToSurveyCode);
    });

    it('updates when to survey js when the user edits it\'s contents', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const when_to_survey = document.getElementById('when-to-survey-field') as HTMLInputElement;
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(when_to_survey!, event_data as SyntheticEventData);
        await loadTime();
        expect(when_to_survey.value).toBe('test');
    });

    it('displays extra respondent data url for editing', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const extra_data_url = document.getElementById('extra-repondent-data-field') as HTMLInputElement;
        expect(extra_data_url.value).toBe(blankSurveyInfo.ExtraRespondentDataURL);
    });

    it('updates when to survey js when the user edits it\'s contents', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const extra_data_url = document.getElementById('extra-repondent-data-field') as HTMLInputElement;
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(extra_data_url!, event_data as SyntheticEventData);
        await loadTime();
        expect(extra_data_url.value).toBe('test');
    });

    it('adds a question of the appropriate type when an add question button is pressed', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const add_rating_button = document.getElementsByClassName('add-question-button')[2] as HTMLInputElement;
        expect(add_rating_button.value).toBe('Rating');
        add_rating_button.click();
        await loadTime();
        const questions = document.getElementsByClassName('question-wrapper-container');
        expect(questions.length).toBe(1);
        expect(document.getElementsByClassName('rating-container')).toBeDefined();
    });

    it('updates how a rating question is displayed when its params are updated', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const add_rating_button = document.getElementsByClassName('add-question-button')[2] as HTMLInputElement;
        expect(add_rating_button.value).toBe('Rating');
        add_rating_button.click();
        await loadTime();
        expect(document.getElementsByClassName('rating-num').length).toBe(DEFAULT_RATING_OPTIONS);
        const num_options = document.getElementsByClassName('range-selector')[0] as HTMLInputElement;
        const event_data: unknown = {target: {value: '10'}};
        ReactTestUtils.Simulate.change(num_options!, event_data as SyntheticEventData);
        expect(document.getElementsByClassName('rating-num').length).toBe(10);
    });

    it('updates how a choose question is displayed when its params are updated', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const add_choose_one_question_button = document.getElementsByClassName('add-question-button')[0] as HTMLInputElement;
        add_choose_one_question_button.click();
        await loadTime();
        expect(document.getElementsByClassName('option').length).toBe(1);
        const add_option = document.getElementsByClassName('add-option-button')[0] as HTMLInputElement;
        add_option.click();
        await loadTime();
        expect(document.getElementsByClassName('option').length).toBe(2);
    });

    it('does not display any extra editable fields when a text question is selected', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const add_text_question_button = document.getElementsByClassName('add-question-button')[3] as HTMLInputElement;
        add_text_question_button.click();
        await loadTime();
        expect(document.getElementsByClassName('option').length).toBe(0);
        expect(document.getElementsByClassName('rating-num').length).toBe(0);
    });

    it('sends off the survey info to be stored when the OK button is pressed', async() => {
        render(<AuthoringEnv {...props}/>, container);
        await loadTime();
        const extra_data_url = document.getElementById('extra-repondent-data-field') as HTMLInputElement;
        let event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(extra_data_url!, event_data as SyntheticEventData);
        await loadTime();
        const add_text_question_button = document.getElementsByClassName('add-question-button')[3] as HTMLInputElement;
        add_text_question_button.click();
        await loadTime();
        const ok_button = document.getElementById('ok-button') as HTMLElement;
        ok_button.click();
        await loadTime();
        expect(prevResponse).toBe(expected_save_survey_body);
    });

});

