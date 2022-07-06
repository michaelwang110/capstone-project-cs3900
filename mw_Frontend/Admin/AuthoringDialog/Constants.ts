import { QuestionTypeInfo } from './Types';

export const API_URL = '';

export const typeInfo = [{
    Type: 'Choose One',
    Description: 'Choose one option from a list'
},
{
    Type: 'Choose Multiple',
    Description: 'Choose one or more options from a list'
},
{
    Type: 'Rating',
    Description: 'Give a rating (e.g., out of 10)'
},
{
    Type: 'Text',
    Description: 'An open text field where the user can type into a box'
}
] as QuestionTypeInfo[];

export const MIN_RATING_OPTIONS = 5;
export const MAX_RATING_OPTIONS = 11;
export const MIN_RATING_START = 0;
export const MAX_RATING_START = 5;

export const DEFAULT_RATING_OPTIONS = 5;
export const DEFAULT_RATING_START = 1;

export const defaultQuestionValues = {
    Text: '',
    MinTag: '',
    MaxTag: '',
    StartNum: DEFAULT_RATING_START,
    NumOptions: DEFAULT_RATING_OPTIONS,
    Options: ['']
};

export const optionsUsers = ['Choose One', 'Choose Multiple'];
export const rangeUsers = ['Rating'];