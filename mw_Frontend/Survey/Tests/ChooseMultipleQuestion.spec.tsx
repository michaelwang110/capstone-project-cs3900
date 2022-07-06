import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ChooseMultipleQuestion from '../Components/ChooseMultipleQuestion';
import {mock_choose_multiple_q} from './helpers/mockResponses';
import {sleep, loadTime} from './helpers/sleep';



describe('ChooseMultipleQuestion', () => {
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
    let question_info = mock_choose_multiple_q;
    const props = {questionInfo: question_info, questionNumber: 3, saveResponse: mock_submit, lastQ: true};

    it('displays options correctly', async() => {
        render(<ChooseMultipleQuestion {...props}/>, container);
        await loadTime();
        const options = document.getElementsByClassName('displayrsurvey-choose-option');
        expect(options.length).toBe(question_info.Options.length);
        const first_option = options[0];
        expect(first_option.getAttribute('value')).toBe('First One');
        const last_option = options[question_info.Options.length - 1];
        expect(last_option.getAttribute('value')).toBe('Last One');
    });

    it('highlights a selected option', async() => {
        render(<ChooseMultipleQuestion {...props}/>, container);
        await loadTime();
        const option = document.getElementsByClassName('displayrsurvey-choose-option')[0] as HTMLElement;
        option.click();
        const selected_option = document.getElementsByClassName('displayrsurvey-selected')[0] as HTMLElement;
        expect(selected_option.getAttribute('value')).toBe(option.getAttribute('value'));
    });

    it('unhighlights a selected option if clicked again', async() => {
        render(<ChooseMultipleQuestion {...props}/>, container);
        await loadTime();
        const option = document.getElementsByClassName('displayrsurvey-choose-option')[0] as HTMLElement;
        option.click();
        const selected_option = document.getElementsByClassName('displayrsurvey-selected')[0] as HTMLElement;
        expect(selected_option.getAttribute('value')).toBe(option.getAttribute('value'));
        option.click();
        expect(document.getElementsByClassName('displayrsurvey-selected').length).toBe(0);
    });

    it('does not submit when next button is pressed and no choice is selected', async() => {
        await spyOn(window, 'alert');
        render(<ChooseMultipleQuestion {...props}/>, container);
        await loadTime();
        const next_button = document.getElementById('displayrsurvey-next-button');
        next_button!.click();
        expect(mock_submit).not.toHaveBeenCalledWith('Choose Multiple', 3, '0,0,0');
    });

    it('submits when next button is pressed and a choice is selected', async() => {
        render(<ChooseMultipleQuestion {...props}/>, container);
        await loadTime();
        const option = document.getElementsByClassName('displayrsurvey-choose-option')[0] as HTMLElement;
        option.click();
        const next_button = document.getElementById('displayrsurvey-next-button');
        next_button!.click();
        expect(mock_submit).toHaveBeenCalledWith('Choose Multiple', 3, '1,0,0');
    });

    it('submits selected options correctly', async() => {
        render(<ChooseMultipleQuestion {...props}/>, container);
        await loadTime();
        const options = document.getElementsByClassName('displayrsurvey-choose-option');
        const first_option = options[0] as HTMLElement;
        first_option.click();
        const last_option = options[question_info.Options.length - 1] as HTMLElement;
        last_option.click();
        const next_button = document.getElementById('displayrsurvey-next-button');
        next_button!.click();
        expect(mock_submit).toHaveBeenCalledWith('Choose Multiple', 3, '1,0,1');
    });
});