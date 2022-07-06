import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import RatingQuestion from '../Components/RatingQuestion';
import 'babel-polyfill';
import ReactTestUtils, { SyntheticEventData } from 'react-dom/test-utils';
import { mock_rating_q } from './helpers/mockResponses';

describe('RatingQuestion', () => {

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
    let props = {questionNumber: 1, questionInfo: mock_rating_q, updateQuestion: mock_update};

    it('displays rating params correctly in selectors', async() => {
        render(<RatingQuestion {...props}/>, container);
        const num_options = document.getElementsByClassName('range-selector')[0] as HTMLInputElement;
        expect(num_options.value).toBe(mock_rating_q.NumOptions.toString());
        const start_at = document.getElementsByClassName('range-selector')[1] as HTMLInputElement;
        expect(start_at.value).toBe(mock_rating_q.StartNum.toString());
    });

    it('displays the range of rating options correctly as a vertical list', async() => {
        render(<RatingQuestion {...props}/>, container);
        const options = document.getElementsByClassName('rating-num');
        const first = options[0] as HTMLElement;
        expect(parseInt(first.innerText)).toBe(mock_rating_q.StartNum);
        const last = options[mock_rating_q.NumOptions - 1] as HTMLElement;
        expect(parseInt(last.innerText)).toBe(mock_rating_q.StartNum + mock_rating_q.NumOptions - 1);
    });

    it('displays rating tags correctly', async() => {
        render(<RatingQuestion {...props}/>, container);
        const min_tag = document.getElementsByClassName('rating-tag')[0] as HTMLInputElement;
        expect(min_tag.value).toBe(mock_rating_q.MinTag);
        const max_tag = document.getElementsByClassName('rating-tag')[1] as HTMLInputElement;
        expect(max_tag.value).toBe(mock_rating_q.MaxTag);
    });

    it('updates a rating tag when the user edits it\'s contents', async() => {
        render(<RatingQuestion {...props}/>, container);
        const min_tag = document.getElementsByClassName('rating-tag')[0] as HTMLInputElement;
        const event_data: unknown = {target: {value: 'test'}};
        ReactTestUtils.Simulate.change(min_tag!, event_data as SyntheticEventData);
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_rating_q,  MinTag: 'test'});
    });

    it('updates a rating tag when the user edits it\'s contents', async() => {
        render(<RatingQuestion {...props}/>, container);
        const num_options = document.getElementsByClassName('range-selector')[0] as HTMLInputElement;
        expect(parseInt(num_options.value)).toBe(mock_rating_q.NumOptions);
        const event_data: unknown = {target: {value: (mock_rating_q.NumOptions + 1).toString()}};
        ReactTestUtils.Simulate.change(num_options!, event_data as SyntheticEventData);
        expect(mock_update).toHaveBeenCalledWith(props.questionNumber, { ...mock_rating_q,  NumOptions: mock_rating_q.NumOptions + 1});
    });
});
