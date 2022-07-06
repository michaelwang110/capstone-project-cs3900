
import React from 'react';
import '../Styles/SurveyEnd.css';
import { IMG_PATH } from '../Constants';

interface SurveyEndProps {
    title: string;
    message: string;
    setClosed: (val: boolean) => void;
}

function SurveyEnd(props: SurveyEndProps) {

    const image = <img
        id='displayrsurvey-logo'
        src={IMG_PATH}
        alt={'logo'}
    />;

const close_button = (<button
        id='displayrsurvey-close-button'
        aria-label='Close'
        onClick={() => props.setClosed(true)}
    >
        Close
    </button>);
    return (
        <div id='displayrsurvey-end-container'>
            {image}
            <h4 id='displayrsurvey-end-title'>{props.title}</h4>
            <p id='displayrsurvey-end-message'>
                {props.message}
            </p>
            {close_button}
        </div>
    );
}

export default SurveyEnd;