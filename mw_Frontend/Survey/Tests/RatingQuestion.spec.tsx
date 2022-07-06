import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import RatingQuestion from '../Components/RatingQuestion';
import {mock_rating_q} from './helpers/mockResponses';


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

    let mock_submit = jasmine.createSpy('submit');
    let question_info = mock_rating_q;
    const props = {questionInfo: question_info, questionNumber: 3, saveResponse: mock_submit};

    it('displays tags correctly', () => {
        render(<RatingQuestion {...props}/>, container);
        let min_tag = document.getElementById('displayrsurvey-min-tag');
        expect(min_tag!.innerText).toBe('unsatisfied');
        let max_tag = document.getElementById('displayrsurvey-max-tag');
        expect(max_tag!.innerText).toBe('satisfied');
    });

    it('displays correct number of buttons', () => {
        render(<RatingQuestion {...props}/>, container);
        const rating_options = document.getElementsByClassName('displayrsurvey-rating-option');
        expect(rating_options.length).toBe(question_info.NumOptions);
    });

    it('displays correct range of numeric choices', () => {
        render(<RatingQuestion {...props}/>, container);
        const rating_options = document.getElementsByClassName('displayrsurvey-rating-option');
        expect(rating_options[0].getAttribute('value')).toBe(question_info.StartNum.toString());
        expect(rating_options[question_info.NumOptions - 1].getAttribute('value'))
        .toBe((question_info.NumOptions + 1).toString());
    });

    it('submits when a button is pressed', () => {
        render(<RatingQuestion {...props}/>, container);
        const rating_option: HTMLElement = document.getElementsByClassName('displayrsurvey-rating-option')[0] as HTMLElement;
        rating_option.click();
        expect(mock_submit).toHaveBeenCalled();
    });
});