import { QuestionInfo, SurveyDesign, SurveyInfo } from '../../Types';

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


  export const mock_rating_q = {
  Type: 'Rating',
  Text: 'test question',
  StartNum: 2,
  NumOptions: 7,
  MinTag: 'unsatisfied',
  MaxTag: 'satisfied'
} as QuestionInfo;

export const mock_choose_one_q = {
  Type: 'Choose One',
  Text: 'test question',
  StartNum: 1,
  NumOptions: 5,
  MinTag: '',
  MaxTag: '',
  Options: ['First One', 'Middle One', 'Last One']
} as QuestionInfo;

export const mock_choose_multiple_q = {
  Type: 'Choose Multiple',
  Text: 'test question',
  StartNum: 1,
  NumOptions: 5,
  MinTag: '',
  MaxTag: '',
  Options: ['First One', 'Middle One', 'Last One']
} as QuestionInfo;

export const blankSurveyDesign: SurveyDesign = {
  SurveyQuestions: []
};

export const blankSurveyInfo: SurveyInfo = {
  Design: blankSurveyDesign,
  Name: '',
  SoftwareVersion: '1',
  CompanyGuid: '',
  SurveyGuid: '',
  WhenToSurveyCode: '',
  ExtraRespondentDataURL: '',
  EntryPoints: []
};

export const full_survey_info = {
  Design: blankSurveyDesign,
  Name: 'test',
  SoftwareVersion: '1',
  CompanyGuid: '1',
  SurveyGuid: '1',
  WhenToSurveyCode: 'now',
  ExtraRespondentDataURL: 'URL'
};


export const expected_save_survey_body =
  '{"Design":{"SurveyQuestions":[{"Type":"Text","Text":"","MinTag":"","MaxTag":"","StartNum":1,"NumOptions":5,"Options":[""]}]},"Name":"","SoftwareVersion":"1","CompanyGuid":"","SurveyGuid":"","WhenToSurveyCode":"","ExtraRespondentDataURL":"test","EntryPoints":[]}';
