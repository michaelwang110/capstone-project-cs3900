import { QuestionInfo, SurveyDesign } from '../../Types';
import { blankSurveyDesign } from '../../Constants';

export const mock_entry_points = [
  {
    Name: 'Contact',
    Date: '10 Feb 2020',
    Surveys: ['Survey 1']
  },
  {
    Name: 'Email',
    Date: '10 Feb 2020',
    Surveys: ['Survey 1', 'Survey 2', 'Survey 3']
  },
  {
    Name: 'Home',
    Date: '10 Feb 2020',
    Surveys: []
  },
  {
    Name: 'Index',
    Date: '10 Feb 2020',
    Surveys: ['Survey 3', 'Survey 5']
  },
  {
    Name: 'Test',
    Date: '10 Feb 2020',
    Surveys: ['Survey 3']
  }
];

export const expected_request_remove_entry_point =
  '{"CompanyGuid":"1","Name":"Contact"}';

export const expected_request_get_triple_s =
  '{"CompanyGuid":"1","SurveyGuid":"1"}'

export const mock_surveys = [
  {
    Design: blankSurveyDesign,
    Name: 'Survey 1',
    SoftwareVersion: '1',
    CompanyGuid: '1',
    SurveyGuid: '1',
    WhenToSurveyCode: '',
    ExtraRespondentDataURL: '',
    EntryPoints: ['Contact', 'Email']
  },
  {
    Design: blankSurveyDesign,
    Name: 'Survey 2',
    SoftwareVersion: '1',
    CompanyGuid: '1',
    SurveyGuid: '2',
    WhenToSurveyCode: '',
    ExtraRespondentDataURL: '',
    EntryPoints: ['Email']
  },
  {
    Design: blankSurveyDesign,
    Name: 'Survey 3',
    SoftwareVersion: '1',
    CompanyGuid: '1',
    SurveyGuid: '3',
    WhenToSurveyCode: '',
    ExtraRespondentDataURL: '',
    EntryPoints: ['Email', 'Index', 'Test']
  },
  {
    Design: blankSurveyDesign,
    Name: 'Survey 4',
    SoftwareVersion: '1',
    CompanyGuid: '1',
    SurveyGuid: '4',
    WhenToSurveyCode: '',
    ExtraRespondentDataURL: '',
    EntryPoints: []
  },
  {
    Design: blankSurveyDesign,
    Name: 'Survey 5',
    SoftwareVersion: '1',
    CompanyGuid: '1',
    SurveyGuid: '5',
    WhenToSurveyCode: '',
    ExtraRespondentDataURL: '',
    EntryPoints: ['Index']
  }
];

export const expected_request_remove_survey =
  '{"CompanyGuid":"1","SurveyGuid":"1"}';

export const expected_request_duplicate_survey =
  '{"Design":{"SurveyQuestions":[]},"Name":"Survey 1 (Copy)","SoftwareVersion":"1","CompanyGuid":"1","SurveyGuid":"","WhenToSurveyCode":"","ExtraRespondentDataURL":"","EntryPoints":["Contact","Email"]}';

export const expected_request_outfile_survey =
  '{"CompanyGuid":"1","SurveyGuid":"1"}';

export const expected_request_collect_entries_points =
  '{"CompanyGuid":"1"}';

export const expected_request_collect_surveys =
  '{"CompanyGuid":"1"}';

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
