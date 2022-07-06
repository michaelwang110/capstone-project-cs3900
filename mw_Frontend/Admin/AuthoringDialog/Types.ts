export interface QuestionTypeInfo {
    Type: string;
    Description: string;
}

export interface SurveyRequest {
    CompanyGuid: string;
    SurveyGuid: string;
}

export interface QuestionInfo {
    Type: string;
    Text: string;
    MinTag: string;
    MaxTag: string;
    StartNum: number;
    NumOptions: number;
    Options: string[];
}

export interface SurveyDesign {
    SurveyQuestions: QuestionInfo[];
}

export interface SurveyInfo {
    Design: SurveyDesign;
    Name: string;
    SoftwareVersion: string;
    CompanyGuid: string;
    SurveyGuid: string;
    WhenToSurveyCode: string;
    ExtraRespondentDataURL: string;
    EntryPoints: string[];
}