import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ProgressBar from '../Components/ProgressBar';

const props = {questionNumber: 3, lastQ: 7};

describe('ProgressBar', () => {

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

    it('displays a q-marker for each question', () => {
        render(<ProgressBar {...props}/>, container);
        const markers = document.getElementsByClassName('displayrsurvey-q-marker');
        expect(markers.length).toBe(props.lastQ + 1);
    });

    it('highlights q-marker representing the current question (just that one, no longer up to and including)', () => {
        render(<ProgressBar {...props}/>, container);
        const markers = document.getElementsByClassName('displayrsurvey-q-marker');
        expect(markers[props.questionNumber].classList.contains('displayrsurvey-finished')).toBeTruthy();
        const finished = document.getElementsByClassName('displayrsurvey-finished');
        expect(finished.length).toBe(1);
    });

});