import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import QuestionWrapper from '../Components/QuestionWrapper';
import 'babel-polyfill';
import ReactTestUtils, { SyntheticEventData } from 'react-dom/test-utils';
import { mock_choose_one_q } from './helpers/mockResponses';

describe('QuestionWrapper', () => {

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

    let mock_update = jasmine.createSpy('updateQuestion');
    let mock_remove = jasmine.createSpy('removeQuestion');
    let props = {
        questionNumber: 1,
        questionInfo: mock_choose_one_q,
        updateQuestion: mock_update,
        removeQuestion: mock_remove
    };

    it('displays question text correctly for editing', async() => {
        render(<QuestionWrapper {...props}/>, container);
        const question_text = document.getElementsByClassName('question-text')[0] as HTMLInputElement;
        expect(question_text.value).toBe(mock_choose_one_q.Text);
    });

    it('updates question text when the user edits it\'s contents', async() => {
        render(<QuestionWrapper {...props}/>, container);
        const question_text = document.getElementsByClassName('question-text')[0] as HTMLInputElement;
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(question_text!, event_data as SyntheticEventData);
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_choose_one_q, Text: 'test'});
    });

    it('updates type when a Choose One question is changed to a Rating question and resets all other params to defaults', async() => {
        render(<QuestionWrapper {...props}/>, container);
        const type_selector = document.getElementsByClassName('question-type-selector')[0] as HTMLInputElement;
        const event_data: unknown = {target: {value: 'Rating'}};
        ReactTestUtils.Simulate.change(type_selector!, event_data as SyntheticEventData);
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_choose_one_q, Type: 'Rating', Options: ['']});
    });


    it('updates type when a Choose One question is changed to a Choose Multiple question, but options is not reset', async() => {
        render(<QuestionWrapper {...props}/>, container);
        const type_selector = document.getElementsByClassName('question-type-selector')[0] as HTMLInputElement;
        const event_data: unknown = {target: {value: 'Choose Multiple'}};
        ReactTestUtils.Simulate.change(type_selector!, event_data as SyntheticEventData);
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_choose_one_q, Type: 'Choose Multiple'});
    });

    it('removes the question when the remove question button is pressed', async() => {
        render(<QuestionWrapper {...props}/>, container);
        const remove_button = document.getElementsByClassName('close-button')[0] as HTMLElement;
        remove_button!.click();
        expect(mock_remove).toHaveBeenCalled();
    });

    it('displays 1-indexed question number correctly for each question', async() => {
        render(<QuestionWrapper {...props}/>, container);
        const question_number_tag = document.getElementsByClassName('question-number-tag')[0] as HTMLElement;
        expect(question_number_tag.innerText).toBe('Q1');
    });


});
