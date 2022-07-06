import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'babel-polyfill';
import ScriptTag from '../Components/ScriptTag';
import './helpers/fetch';
import { DEFAULT_SCRIPT_TAG } from '../Constants';
import { SCRIPT_TAG_HELP } from '../HelpText';

describe('ScriptTag', () => {
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

    let mock_spinner = 'Spinner';
    const company_guid = '5';
    const header_name_text = 'Script Tag';
    const script_tag_guide_text = SCRIPT_TAG_HELP.replace(/(\r\n|\n|\r)/gm, '');
    const script_tag = DEFAULT_SCRIPT_TAG.replace('<COMPANY ID>', company_guid).replace(/(\r\n|\n|\r)/gm, '');
    let props = { companyGuid: company_guid, spinner: mock_spinner, isLoading: false};

    it('displays the correct header', () => {
        render(<ScriptTag {...props}/>, container);
        const header_name = document.getElementById('script-container')!.getElementsByTagName('h2')[0].innerText;
        expect(header_name_text).toBe(header_name);
    });

    it('displays the script tag guide', () => {
        render(<ScriptTag {...props}/>, container);
        const script_tag_guide = document.getElementById('script-tag-help')!.innerText.replace(/(\r\n|\n|\r)/gm, '');
        expect(script_tag_guide_text).toBe(script_tag_guide);
    });

    it('displays the script tag with all attributes filled correctly', () => {
        render(<ScriptTag {...props}/>, container);
        const script_tag_text = document.getElementById('script-tag')!.innerText.replace(/(\r\n|\n|\r)/gm, '');
        expect(script_tag_text).toBe(script_tag);
    });

    it('displays a spinner when company guid are being loaded', () => {
        props.isLoading = true;
        render(<ScriptTag {...props}/>, container);
        const spinner = document.getElementsByClassName('spinner')[0].innerHTML;
        expect(spinner).toBe(mock_spinner);
        props.isLoading = false;
    });

});
