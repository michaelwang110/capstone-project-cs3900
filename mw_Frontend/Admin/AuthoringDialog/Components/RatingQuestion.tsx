import React, {useState} from 'react';
import 'react-app-polyfill/ie11';
import '../Styles/RatingQuestion.css';
import { MAX_RATING_START, MIN_RATING_START, MAX_RATING_OPTIONS, MIN_RATING_OPTIONS } from '../Constants';
import { QuestionInfo } from '../Types';

interface QuestionWrapperProps {
    questionNumber: number;
    questionInfo: QuestionInfo;
    updateQuestion: (question_number: number, question: QuestionInfo) => void;
}


function RatingQuestion(props: QuestionWrapperProps) {

    const num_options = props.questionInfo.NumOptions;
    const start_at = props.questionInfo.StartNum;
    const first_label = props.questionInfo.MinTag;
    const last_label = props.questionInfo.MaxTag;

    function buildChoiceRange(range_min: number, range_max: number, id: string, choice_val: number, prop_key: string) {
        const range = [...Array(range_max - range_min + 1)].map((val, i) => i + range_min);
        return (
            <select
                className='range-selector'
                value={choice_val}
                onChange={e =>
                    props.updateQuestion(props.questionNumber,
                        {...props.questionInfo, [prop_key]: parseInt(e.target.value)}
                )}
            >
                {range.map((val, idx) =>
                    <option
                        key={`${prop_key}-${props.questionNumber}-${val}`}
                        value={val}
                    >
                        {val}
                    </option>
                )}
            </select>
        );
    }

    const nums_range = [...Array(num_options)].map((val, i) => i + start_at);

    const rating_params_bar =
        <div className='rating-params-bar'>
            <div className='rating-param'>
                <label className='rating-params-label' htmlFor={`num-options-${props.questionNumber}`}>
                    Number of Options:
                </label>
                {buildChoiceRange(MIN_RATING_OPTIONS, MAX_RATING_OPTIONS,
                        `num-options-${props.questionNumber}`, num_options, 'NumOptions')}
            </div>
                <div className='rating-param'>
                <label className='rating-params-label' htmlFor={`start-at-${props.questionNumber}`}>
                    Start At:
                </label>
                {buildChoiceRange(MIN_RATING_START, MAX_RATING_START,
                    `start-at-${props.questionNumber}`, start_at, 'StartNum')
                }
            </div>
        </div>;

    function rangeEndPoint(num: number, label: string, placeholder: string, prop_key: string) {
        return (
            <tr className='rating-tag-container'>
                <td>
                    <div className='rating-num'>
                        {num}
                    </div>
                </td>
                <td>
                    <input
                        className='rating-tag'
                        type='text'
                        value={label}
                        placeholder={placeholder}
                        onChange={e =>
                            props.updateQuestion(props.questionNumber,
                                {...props.questionInfo, [prop_key]: e.target.value}
                            )
                        }
                    />
                </td>
            </tr>
        );
    }

    return (
        <div className='rating-container'>
            {rating_params_bar}
            <table className='form-table'>
                <tbody>
                        {rangeEndPoint(nums_range[0], first_label, 'Add First Label...', 'MinTag')}
                        {nums_range.map((val, idx) =>
                            (idx === 0 || idx === nums_range.length - 1) ?
                                null
                                :
                                <tr key={`rating_nums-${props.questionNumber}-${val}`}><td>
                                    <div className='rating-num'>
                                        {val}
                                    </div>
                                </td></tr>
                        )}
                        {rangeEndPoint(nums_range[nums_range.length - 1], last_label, 'Add Last Label...', 'MaxTag')}
                </tbody>
            </table>
        </div>
    );
}

export default RatingQuestion;
