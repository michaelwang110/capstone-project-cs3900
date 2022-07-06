import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import QuestionWrapper from '../Components/QuestionWrapper';
import {mock_rating_q} from './helpers/mockResponses';
import { QuestionInfo } from '../../Admin/AuthoringDialog/Types';

const props = {questionInfo: {
    Type: 'Rating',
    Text: 'test',
    StartNum: 2,
    NumOptions: 7,
    MinTag: 'unsatisfied',
    MaxTag: 'satisfied'
  } as QuestionInfo, questionNumber: 3, lastQ: false, saveResponse: () => {}};

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

    it('displays a question to match the provided question type', () => {

        render(<QuestionWrapper {...props}/>, container);
        let rating_question = document.getElementById('displayrsurvey-rating-response-container');
        expect(rating_question).toBeTruthy();

        let text_question = document.getElementById('kkhkkpor');
        expect(text_question).toBeFalsy();

        props.questionInfo.Type = 'Text';
        render(<QuestionWrapper {...props}/>, container);
        text_question = document.getElementById('displayrsurvey-text-response-container');
        expect(text_question).toBeTruthy();
    });

});

