import React from 'react';
import '../Styles/RatingQuestion.css';
import { QuestionInfo } from '../Types';

interface RatingQuestionProps {
    questionInfo: QuestionInfo;
    questionNumber: number;
    saveResponse: (q_type: string, q_number: number, q_response: string) => void;
}

function RatingQuestion(props: RatingQuestionProps) {
    let range_nums = [...Array(props.questionInfo.NumOptions)].map((val, i) => i + props.questionInfo.StartNum);

    return (
        <div id='displayrsurvey-rating-response-container'>
            <div id='displayrsurvey-rating-tags-container'>
                <h5 className='displayrsurvey-rating-tag' id='displayrsurvey-min-tag'>{props.questionInfo.MinTag}</h5>
                <h5 className='displayrsurvey-rating-tag' id='displayrsurvey-max-tag'>{props.questionInfo.MaxTag}</h5>
            </div>
            <div id='displayrsurvey-rating-container'>
                {range_nums.map(num =>
                    <input
                        className='displayrsurvey-rating-option'
                        type='button'
                        key={num}
                        value={num}
                        onClick={() => props.saveResponse('Rating', props.questionNumber, num.toString())}
                    />)
                }
            </div>
        </div>
    );
}

export default RatingQuestion;