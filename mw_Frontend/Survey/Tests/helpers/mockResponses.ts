import { QuestionInfo, SurveyDesign, SurveysResponse } from '../../Types';

export const mock_survey = {
  SurveyQuestions: [
    {
      Type: 'Text',
      Text: 'test',
      MinTag: '',
      MaxTag: '',
      StartNum: 0,
      NumOptions: 0
    },
    {
      Type: 'Rating',
      Text: 'test2',
      MinTag: 'bad',
      MaxTag: 'good',
      StartNum: 1,
      NumOptions: 8
    },
    {
      Type: 'Choose One',
      Text: 'test',
      StartNum: 0,
      NumOptions: 0,
      MinTag: '',
      MaxTag: '',
      Options: ['First One', 'Middle One', 'Last One']
    },
    {
      Type: 'Choose Multiple',
      Text: 'test',
      StartNum: 0,
      NumOptions: 0,
      MinTag: '',
      MaxTag: '',
      Options: ['First One', 'Middle One', 'Last One']
    }
  ],
} as SurveyDesign;

export const expected_response_text =
  '{"SurveyGuid":"2","CompanyGuid":"3","QuestionResponses":[{"QuestionType":"Text","QuestionNumber":1,"UserResponse":"test"}],"RespondentId":"full survey","AdditionalInfo":"","ResponseInstance":"after 5 minutes"}';

export const expected_response_rating =
  '{"SurveyGuid":"2","CompanyGuid":"3","QuestionResponses":[{"QuestionType":"Text","QuestionNumber":1,"UserResponse":""},{"QuestionType":"Rating","QuestionNumber":2,"UserResponse":"1"}],"RespondentId":"full survey","AdditionalInfo":"","ResponseInstance":"after 5 minutes"}';

export const expected_response_choose_one =
  '{"SurveyGuid":"2","CompanyGuid":"3","QuestionResponses":[{"QuestionType":"Text","QuestionNumber":1,"UserResponse":""},{"QuestionType":"Rating","QuestionNumber":2,"UserResponse":"1"},{"QuestionType":"Choose One","QuestionNumber":3,"UserResponse":"1"}],"RespondentId":"full survey","AdditionalInfo":"","ResponseInstance":"after 5 minutes"}';

export const expected_response_choose_multiple =
  '{"SurveyGuid":"2","CompanyGuid":"3","QuestionResponses":[{"QuestionType":"Text","QuestionNumber":1,"UserResponse":""},{"QuestionType":"Rating","QuestionNumber":2,"UserResponse":"1"},{"QuestionType":"Choose One","QuestionNumber":3,"UserResponse":"1"},{"QuestionType":"Choose Multiple","QuestionNumber":4,"UserResponse":"1,0,0"}],"RespondentId":"full survey","AdditionalInfo":"","ResponseInstance":"after 5 minutes"}';

export const mock_text_q = {
  Type: 'Text',
  Text: 'test',
  MinTag: '',
  MaxTag: '',
  StartNum: 0,
  NumOptions: 0
} as QuestionInfo;

export const mock_rating_q = {
  Type: 'Rating',
  Text: 'test',
  StartNum: 2,
  NumOptions: 7,
  MinTag: 'unsatisfied',
  MaxTag: 'satisfied'
} as QuestionInfo;

export const mock_choose_one_q = {
  Type: 'Choose One',
  Text: 'test',
  StartNum: 0,
  NumOptions: 0,
  MinTag: '',
  MaxTag: '',
  Options: ['First One', 'Middle One', 'Last One']
} as QuestionInfo;

export const mock_choose_multiple_q = {
  Type: 'Choose Multiple',
  Text: 'test',
  StartNum: 0,
  NumOptions: 0,
  MinTag: '',
  MaxTag: '',
  Options: ['First One', 'Middle One', 'Last One']
} as QuestionInfo;

export const mock_surveys_should_appear: SurveysResponse = {
  RespondentSurveyData: [{
    SurveyGuid: 'should appear',
    Respondent: {
      CheckCount: 0,
      RespondentId: '1',
      CompletedResponseInstances: []
    }
  }]
};

export const mock_surveys_shouldnt_appear: SurveysResponse = {
  RespondentSurveyData: [{
    SurveyGuid: 'shouldnt appear',
    Respondent: {
      CheckCount: 0,
      RespondentId: '1',
      CompletedResponseInstances: []
    }
  }]
};

export const q_info_passing_text = {
  SurveyQuestions: [
    {
      Type: 'Text',
      Text: 'test',
      MinTag: '',
      MaxTag: '',
      StartNum: 0,
      NumOptions: 0
    },
    {
      Type: 'Text',
      Text: 'test: {Q1:A}',
      MinTag: '',
      MaxTag: '',
      StartNum: 0,
      NumOptions: 0
    },
  ],
} as SurveyDesign;

export const q_info_passing_rating = {
  SurveyQuestions: [
    {
      Type: 'Rating',
      Text: 'test',
      StartNum: 2,
      NumOptions: 7,
      MinTag: 'unsatisfied',
      MaxTag: 'satisfied'
    },
    {
      Type: 'Text',
      Text: 'test: {Q1:A}',
      MinTag: '',
      MaxTag: '',
      StartNum: 0,
      NumOptions: 0
    },
  ],
} as SurveyDesign;

export const q_info_passing_choose_one = {
  SurveyQuestions: [
    {
      Type: 'Choose One',
      Text: 'test',
      StartNum: 0,
      NumOptions: 0,
      MinTag: '',
      MaxTag: '',
      Options: ['First One', 'Middle One', 'Last One']
    },
    {
      Type: 'Text',
      Text: 'test: {Q1:A}',
      MinTag: '',
      MaxTag: '',
      StartNum: 0,
      NumOptions: 0
    },
  ],
} as SurveyDesign;

export const q_info_passing_choose_multiple = {
  SurveyQuestions: [
    {
      Type: 'Choose Multiple',
      Text: 'test',
      StartNum: 0,
      NumOptions: 0,
      MinTag: '',
      MaxTag: '',
      Options: ['First One', 'Middle One', 'Last One']
    },
    {
      Type: 'Text',
      Text: 'test: {Q1:A}',
      MinTag: '',
      MaxTag: '',
      StartNum: 0,
      NumOptions: 0
    },
  ],
} as SurveyDesign;