import React, {useState} from 'react';
import 'react-app-polyfill/ie11';
import { QuestionInfo } from '../Types';

interface QuestionWrapperProps {
    questionNumber: number;
    questionInfo: QuestionInfo;
    updateQuestion: (question_number: number, question: QuestionInfo) => void;
}

function ChooseQuestion(props: QuestionWrapperProps) {

    const options = props.questionInfo.Options;

    function updateOption(new_val: string, option_idx: number) {
        const new_options = options.map((original_val, idx) => {
            return (idx === option_idx) ? new_val : original_val;
        });

        props.updateQuestion(props.questionNumber, {...props.questionInfo, Options: new_options});
    }

    function removeOption(remove_idx: number) {
        if (options.length > 1) {
            const new_options = options.filter((option, idx) => idx !== remove_idx);
            props.updateQuestion(props.questionNumber, {...props.questionInfo, Options: new_options});
        }
    }

    return (

        <table className='form-table choose-one-container'>
            <tbody>
                {options.map((option, idx) =>
                    <tr className='option-container' key={`${props.questionNumber}-${idx}`}>
                        <td>
                            <input
                                className='option'
                                type='text'
                                value={option}
                                placeholder='Add option...'
                                onChange={e => updateOption(e.target.value, idx)}
                            />
                        </td>
                        <td>
                            <button className='remove-option-button'
                                onClick={e => removeOption(idx)}
                            >
                                <span className='tooltipstered'>
                                    &times;
                                </span>
                            </button>
                        </td>
                    </tr>
                )}
                <tr>
                    <td>
                        <button className='add-option-button'
                            onClick={e =>
                            props.updateQuestion(props.questionNumber,
                                {...props.questionInfo, Options: [...options, '']}
                            )}
                        >
                            +Add Option
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default ChooseQuestion;
