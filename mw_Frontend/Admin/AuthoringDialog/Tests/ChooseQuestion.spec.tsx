import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ChooseQuestion from '../Components/ChooseQuestion';
import 'babel-polyfill';
import ReactTestUtils, { SyntheticEventData } from 'react-dom/test-utils';
import { mock_choose_one_q } from './helpers/mockResponses';

describe('ChooseQuestion', () => {

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
    let props = {questionNumber: 1, questionInfo: mock_choose_one_q, updateQuestion: mock_update};

    it('displays options correctly for editing', async() => {
        render(<ChooseQuestion {...props}/>, container);
        const options = document.getElementsByClassName('option');
        expect(options.length).toBe(mock_choose_one_q.Options.length);
    });

    it('adds a new empty option when the add button is pressed', async() => {
        render(<ChooseQuestion {...props}/>, container);
        const add_button = document.getElementsByClassName('add-option-button')[0] as HTMLElement;
        add_button!.click();
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_choose_one_q, Options: [...mock_choose_one_q.Options, ''] });
    });

    it('removes an option when it\'s remove button is pressed', async() => {
        render(<ChooseQuestion {...props}/>, container);
        let remove_button = document.getElementsByClassName('remove-option-button')[0] as HTMLElement;
        remove_button!.click();
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_choose_one_q, Options: [...mock_choose_one_q.Options.slice(1)] });
        remove_button = document.getElementsByClassName('remove-option-button')[mock_choose_one_q.Options.length - 1] as HTMLElement;
        remove_button!.click();
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_choose_one_q, Options: [...mock_choose_one_q.Options.slice(-(mock_choose_one_q.Options.length - 1))] });
    });

    it('updates an option when the user edits it\'s contents', async() => {
        render(<ChooseQuestion {...props}/>, container);
        const option: HTMLInputElement = document.getElementsByClassName('option')[0] as HTMLInputElement;
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(option!, event_data as SyntheticEventData);
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_choose_one_q, Options: ['test', ...mock_choose_one_q.Options.slice(1)] });
    });

});
