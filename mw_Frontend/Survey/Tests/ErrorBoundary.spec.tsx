// possible issue:
// if setinterval is tied to the window then clearing the react elements won't clear it
// i.e. the intervals are continuing to run between tests

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'babel-polyfill';
import AppManager from '../Components/AppManager';
import { loadTime } from './helpers/sleep';
import './helpers/fetch';
import './helpers/setInterval';
import { prevResponse } from './helpers/fetch';
import ErrorBoundary from '../../ErrorHandling/ErrorBoundary';

declare global {
    interface Window {
        onerror: any;
    }
}

describe('Error Boundary', () => {

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

    const props_test_errors = {
        respondentId: '1',
        companyGuid: '3',
        entryPoint: 'should appear',
        test_error_handler: true
    };

    it('will log an error thrown in the survey component', async() => {
        spyOn(console, 'error'); // silence error logs because we want to cause an error

        render(
            <ErrorBoundary>
                 <AppManager {...props_test_errors}/>
            </ErrorBoundary>
        , container);
        await loadTime();
        await loadTime();
        expect(prevResponse.includes('test error')).toBe(true);
    });


});

