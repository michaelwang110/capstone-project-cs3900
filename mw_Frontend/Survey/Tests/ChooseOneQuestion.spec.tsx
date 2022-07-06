import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ChooseOneQuestion from '../Components/ChooseOneQuestion';
import {mock_choose_one_q} from './helpers/mockResponses';


describe('ChooseOneQuestion', () => {

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
    let question_info = mock_choose_one_q;
    const props = {questionInfo: question_info, questionNumber: 3, saveResponse: mock_submit};

    it('displays options correctly', () => {
        render(<ChooseOneQuestion {...props}/>, container);
        const options = document.getElementsByClassName('displayrsurvey-choose-option');
        expect(options.length).toBe(question_info.Options.length);
        const first_option = options[0];
        expect(first_option.getAttribute('value')).toBe('First One');
        const last_option = options[question_info.Options.length - 1];
        expect(last_option.getAttribute('value')).toBe('Last One');
    });

    it('submits when a button is pressed', () => {
        render(<ChooseOneQuestion {...props}/>, container);
        const option = document.getElementsByClassName('displayrsurvey-choose-option')[0] as HTMLElement;
        option.click();
        expect(mock_submit).toHaveBeenCalled();
    });
});