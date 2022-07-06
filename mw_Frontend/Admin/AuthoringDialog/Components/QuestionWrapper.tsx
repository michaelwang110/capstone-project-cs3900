import React, {useState, useEffect} from 'react';
import {typeInfo, optionsUsers, rangeUsers, DEFAULT_RATING_OPTIONS, DEFAULT_RATING_START} from '../Constants';
import ChooseOneQuestion from './ChooseQuestion';
import RatingQuestion from './RatingQuestion';
import { QuestionInfo } from '../Types';
import '../Styles/QuestionWrapper.css';
import { QUESTION_TEXT_HELP } from '../HelpText';

interface QuestionWrapperProps {
    questionNumber: number;
    questionInfo: QuestionInfo;
    removeQuestion: (question_number: number) => void;
    updateQuestion: (question_number: number, question: QuestionInfo) => void;
}

function QuestionWrapper(props: QuestionWrapperProps) {

    const [type, set_type] = useState(props.questionInfo.Type);
    useEffect(() => set_type(props.questionInfo.Type), [props.questionInfo.Type]);

    function updateType(new_type: string) {
        let new_question = {...props.questionInfo, Type: new_type};
        if (!optionsUsers.includes(new_type)) {
            new_question = {...new_question, Options: ['']};
        }
        if (!rangeUsers.includes(new_type)) {
            new_question = {...new_question,
                                MinTag: '',
                                MaxTag: '',
                                NumOptions: DEFAULT_RATING_OPTIONS,
                                StartNum: DEFAULT_RATING_START
            };
        }

        props.updateQuestion(props.questionNumber, new_question);
    }

    const close_button = (
        <button
            className='close-button'
            aria-label='Close'
            onClick={() => props.removeQuestion(props.questionNumber)}
        >
            <span className='tooltipstered'>&times;</span>
        </button>
    );

    const question_number_tag = (
        <h2 className='question-number-tag'>
            {'Q' + props.questionNumber}
        </h2>
    );

    const question_text_field = (
        <textarea
            className='question-text'
            placeholder='Enter your question here...'
            onChange={e =>
                props.updateQuestion(props.questionNumber,
                    {...props.questionInfo, Text: e.target.value}
            )}
            value={props.questionInfo.Text}
            rows={1}
        />
    );

    let question_fields = <div></div>;
    switch (type) {
        case 'Choose One':
        case 'Choose Multiple':
            question_fields = <ChooseOneQuestion {...props}/>;
            break;
        case 'Rating':
            question_fields = <RatingQuestion {...props}/>;
            break;

        // Note a text question does not require fields
    }

    const type_select = (
        <table className='form-table'>
            <tbody>
                <tr>
                    <td>
                        <label htmlFor={`type-select-${props.questionNumber}`}>
                            Question Type:
                        </label>
                    </td>
                    <td>
                        <select
                            className='question-type-selector'
                            id={`type-select-${props.questionNumber}`}
                            onChange={e => updateType(e.target.value)}
                            value={props.questionInfo.Type}
                        >
                            {typeInfo.map(cur_type =>
                                <option
                                value={cur_type.Type}
                                key={`${props.questionNumber}-${cur_type.Type}`}
                                >
                                    {cur_type.Type}
                                </option>
                            )}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    );

    return (
            <div className='question-wrapper-container section shaded-form'>
                <div className='question-header-bar'>
                    {question_number_tag}
                    {question_text_field}
                    {close_button}
                </div>
                <div className='help'>
                    {QUESTION_TEXT_HELP}
                </div>
                <div className='question-details'>
                    {type_select}
                    {question_fields}
                </div>
            </div>
    );
}

export default QuestionWrapper;
