import 'react-app-polyfill/ie11';
import 'polyfill-array-includes';
import React from 'react';
import ReactDOM from 'react-dom';
import AppManager from './Components/AppManager';
import ErrorBoundary from '../ErrorHandling/ErrorBoundary';
import {APP_NAME, ATTR_NAMES, ATTR_ENTRY_POINT} from './Constants';
import {ExternalAttributes} from './Types';
import 'circular-std';

declare global {
    interface Window {
        [APP_NAME]: string;
        [ATTR_ENTRY_POINT]: AttrContainer;
    }
}

interface AttrContainer {
    attrs: ExternalAttributes;
}

function Index(window: Window) {
    // window[APP_NAME] is set if app is being loaded asynchronously
    // i.e. the internals of this if statement
    // are for synchronous loading only
    if (!window[APP_NAME]) {
        let tag = document.getElementById(APP_NAME + 'Script');

        if (!tag) {
            throw Error(`Cannot find script tag with id {$APP_NAME}Script`);
        }

        let sync_attrs = {
            RespondentId: 'N/A',
            CompanyGuid: 'N/A',
            EntryPoint: 'N/A'
        } as ExternalAttributes;

        ATTR_NAMES.map(attr_name => {
            let attr = tag!.getAttribute(attr_name);
            if (attr) {
                sync_attrs[attr_name] = attr;
            }
        });



        let placeholder = {attrs: sync_attrs} as AttrContainer;
        window[ATTR_ENTRY_POINT] = placeholder;
    }

    let attr_container = window[ATTR_ENTRY_POINT] as AttrContainer;
    if (attr_container && attr_container.attrs) {
        const app_container = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(app_container);

        ReactDOM.render(
            <ErrorBoundary>
                <AppManager
                    companyGuid={attr_container.attrs.CompanyGuid}
                    respondentId={attr_container.attrs.RespondentId}
                    entryPoint={attr_container.attrs.EntryPoint}
                />
            </ErrorBoundary>, app_container
        );
    }
}

Index(window);

export default Index;