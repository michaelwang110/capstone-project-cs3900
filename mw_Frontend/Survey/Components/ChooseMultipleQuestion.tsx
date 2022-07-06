import React, {useState, useEffect} from 'react';
import '../Styles/TextQuestion.css';
import { QuestionInfo } from '../Types';

interface TextQuestionProps {
    questionInfo: QuestionInfo;
    saveResponse: (q_type: string, q_number: number, q_response: string) => void;
    questionNumber: number;
    lastQ: boolean;
}

function ChooseMultipleQuestion(props: TextQuestionProps) {
    const [choices, set_choices] = useState(Array(props.questionInfo.Options.length).fill(0));

        // reset state if the same component is used again
    // for a new question
    useEffect(() => {
        set_choices(Array(props.questionInfo.Options.length).fill(0));
    }, [props.questionNumber]);


    function handleChoice(choice_idx: number) {
        set_choices(choices.map((prev_val, idx) => {
            if (idx === choice_idx) {
                return prev_val ? 0 : 1;
            }
            return prev_val;
        }));
    }

    return (
        <div id='displayrsurvey-choose-response-container'>
            <div id='displayrsurvey-response-choices'>
                {props.questionInfo.Options.map((option, idx) =>
                    <input
                        className={choices[idx] ?
                            'displayrsurvey-choose-option displayrsurvey-selected'
                            :
                            'displayrsurvey-choose-option'
                        }
                        type='button'
                        key={idx}
                        value={option}
                        onClick={() => handleChoice(idx)}
                    />
                )}
            </div>
            {choices.filter(choice => choice).length ?
                <button
                id='displayrsurvey-next-button'
                onClick={() => props.saveResponse('Choose Multiple', props.questionNumber, `${choices.join(",")}`)}
                >
                    {props.lastQ ? 'Finish' : 'Next'}
                </button>
                :
                <button
                id='displayrsurvey-next-button'
                disabled={true}
                >
                    {props.lastQ ? 'Finish' : 'Next'}
                </button>
            }
        </div>
    );
}

export default ChooseMultipleQuestion;
