import React, {useState} from 'react';
import '../Styles/TextQuestion.css';
import { QuestionInfo } from '../Types';
import '../Styles/ChooseQuestion.css';

interface TextQuestionProps {
    questionInfo: QuestionInfo;
    saveResponse: (q_type: string, q_number: number, q_response: string) => void;
    questionNumber: number;
}

function ChooseOneQuestion(props: TextQuestionProps) {
    return (
        <div id='displayrsurvey-choose-response-container'>
            <div id='displayrsurvey-response-choices'>
                {props.questionInfo.Options.map((option, idx) =>
                    <input
                        className='displayrsurvey-choose-option'
                        type='button'
                        key={idx}
                        value={option}
                        onClick={() => props.saveResponse('Choose One', props.questionNumber, (idx + 1).toString())}
                    />
                )}
            </div>
        </div>
    );
}

export default ChooseOneQuestion;