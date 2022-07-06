import React from 'react';
import { SCRIPT_TAG_HELP } from '../HelpText';
import { DEFAULT_SCRIPT_TAG } from '../Constants';

interface ScriptTagProps {
    companyGuid: string;
    spinner: any;
    isLoading: boolean;
}

function ScriptTag(props: ScriptTagProps) {
    let script_tag = DEFAULT_SCRIPT_TAG;
    script_tag = script_tag.replace('<COMPANY ID>', props.companyGuid);
    const header_bar =
        <h2>
            Script Tag
        </h2>;

    return (
        <div id='script-container'>
            {header_bar}
            <div id='script-tag-help'>
                <p className='help' style={{whiteSpace: 'pre-wrap'}}>
                    {SCRIPT_TAG_HELP}
                </p>
            </div>
            <div id='script-tag'>
                {props.isLoading ?
                    <div className='spinner'>{props.spinner}</div>
                    :
                    <code style={{whiteSpace: 'pre-wrap'}}>
                        {script_tag}
                    </code>
                }
            </div>
        </div>
    );
}

export default ScriptTag;
