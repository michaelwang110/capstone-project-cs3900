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

export interface QuestionResponse {
    QuestionNumber: number;
    QuestionType: string;
    UserResponse: string;
}

export interface SurveyResponse {
    SurveyGuid: string;
    CompanyGuid: string;
    QuestionResponses: QuestionResponse[];
    RespondentId: string;
    AdditionalInfo: string;
    ResponseInstance: string;
}

export interface CSVContent {
    Csv: string;
}

export interface ExternalAttributes {
    [index: string]: string;
    RespondentId: string;
    CompanyGuid: string;
    EntryPoint: string;
}

export interface OutfilingRequest {
    CompanyGuid: string;
    SurveyGuid: string;
    AuthToken: string;
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

export interface SurveysRequest {
    CompanyGuid: string;
    RespondentId: string;
    EntryPoint: string;
}

export interface RespondentInfo {
    CheckCount: number;
    RespondentId: string;
    CompletedResponseInstances: string[];
}

export interface SurveyRespondentPair {
    SurveyGuid: string;
    Respondent: RespondentInfo;
}

export interface SurveysResponse {
    RespondentSurveyData: SurveyRespondentPair[];
}

export interface UpdateRespondentInfoRequest {
    RespondentInfo: RespondentInfo;
    SurveyGuid: string;
    UpdateExtraRespondentData: boolean;
    CompanyId: string;
}

export interface SaveEntryPointRequest {
    CompanyGuid: string;
    Name: string;
}