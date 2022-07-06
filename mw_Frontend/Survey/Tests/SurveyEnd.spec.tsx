import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import SurveyEnd from '../Components/SurveyEnd';
import 'babel-polyfill';

describe('SurveyEnd', () => {

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
    const props  = {
        setClosed: mock_close,
        title: 'test title',
        message: 'test message'
    };

    it('displays props correctly', async() => {
        render(<SurveyEnd {...props}/>, container);
        const title = document.getElementById('displayrsurvey-end-title');
        expect(title!.innerText).toBe('test title');
        const message = document.getElementById('displayrsurvey-end-message');
        expect(message!.innerText).toBe('test message');
    });

    it('closes survey when close button is pressed', async() => {
        render(<SurveyEnd {...props}/>, container);
        const close_button = document.getElementById('displayrsurvey-close-button') as HTMLElement;
        close_button.click();
        expect(mock_close).toHaveBeenCalled();
    });



});