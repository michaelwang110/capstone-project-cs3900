import React, {useState, useEffect} from 'react';
import SurveyEnd from './SurveyEnd';
import Survey from './Survey';
import 'react-app-polyfill/ie11';
import {FINISH_DELAY, SURVEY_FINISH_INFO} from '../Constants';
import '../Styles/App.css';

interface AppProps {
    companyGuid: string;
    surveyGuid: string;
    closeSurvey: () => void;
    respondentId: string;
    responseInstance: string;
}
function App(props: AppProps) {
    const [error, set_error] = useState(false);
    const [finished, set_finished] = useState(false);

    if (error) {
        props.closeSurvey();
        return null;
    } else if (finished) {
        setTimeout(() => props.closeSurvey(), FINISH_DELAY);
        return <SurveyEnd
                    setClosed={props.closeSurvey}
                    {...SURVEY_FINISH_INFO}
                />;
    }
    return <Survey
                {...props}
                setClosed={props.closeSurvey}
                setError={set_error}
                setFinished={set_finished}
            />;
}

export default App;