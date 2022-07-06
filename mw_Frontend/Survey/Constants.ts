export const API_URL = 'https://surveys.displayr.com';

const MEDIA_PATH = '/';
export const FINISH_DELAY = 3000;
export const MAX_RESPONSE_LENGTH = 250;

export const IMG_PATH = API_URL + MEDIA_PATH + 'Placeholder-Icon.png';
export const APP_NAME = 'DisplayrSurvey';

export const ATTR_NAMES = ['RespondentId', 'CompanyId', 'SurveyGuid'];
export const ATTR_ENTRY_POINT = 'DisplayrSurveyAttributes';

export const SURVEY_FINISH_INFO = {
    title: 'Thank You!',
    message: `Your feedback means a lot to us and will
    help us build a better product for you.`
};

// 5 minutes
export const CHECKCOUNT_INCREMENT_DELAY = 5 * 60 * 1000;
