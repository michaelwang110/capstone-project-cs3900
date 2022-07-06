import React from 'react';
import RatingQuestion from './RatingQuestion';
import TextQuestion from './TextQuestion';
import ChooseOneQuestion from './ChooseOneQuestion';
import ChooseMultipleQuestion from './ChooseMultipleQuestion';
import { QuestionInfo } from '../Types';

interface QuestionWraperProps {
    questionInfo: QuestionInfo;
    saveResponse: (q_type: string, q_number: number, q_response: string) => void;
    questionNumber: number;
    lastQ: boolean;
}

function QuestionWrapper(props: QuestionWraperProps) {

    switch (props.questionInfo.Type) {
        case 'Rating':
            return <RatingQuestion {...props}/>;
        case 'Choose One':
            return <ChooseOneQuestion {...props}/>;
        case 'Choose Multiple':
            return <ChooseMultipleQuestion {...props}/>;
        default:
            return <TextQuestion {...props}/>;
    }
}

export default QuestionWrapper;