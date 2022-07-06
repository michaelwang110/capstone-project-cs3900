import React, {useState, useEffect} from 'react';
import { MAX_RESPONSE_LENGTH } from '../Constants';
import '../Styles/TextQuestion.css';

interface TextQuestionProps {
  questionNumber: number;
  lastQ: boolean;
  saveResponse: (q_type: string, q_number: number, q_response: string) => void;
}

function TextQuestion(props: TextQuestionProps) {
    const [response, set_response] = useState('');

    // reset state if the same component is used again
    // for a new question
    useEffect(() => {
        set_response('');
    }, [props.questionNumber]);

    return (
        <div id='displayrsurvey-text-response-container'>
            <textarea
                id='displayrsurvey-response-field'
                placeholder='Type your answer here...'
                maxLength={MAX_RESPONSE_LENGTH}
                value={response}
                onChange={e => {
                    set_response(e.target.value);
                }}
            />
            <button
                id='displayrsurvey-next-button'
                onClick={() => {
                    props.saveResponse('Text', props.questionNumber, response);
                }}>
                    {props.lastQ ? 'Finish' : 'Next'}
            </button>
        </div>
    );
}

export default TextQuestion;