import React, { useState } from 'react';
import SurveyAdmin from './SurveyAdmin';
import { getCompanyGuid } from '../Api';
import ErrorBoundary from '../../../ErrorHandling/ErrorBoundary';

function App() {
    const [company_guid, set_company_guid] = useState('');

    getCompanyGuid()
    .then(set_company_guid);

    if (company_guid === '') {
        return null;
    }

    return (
        <ErrorBoundary>
            <SurveyAdmin companyGuid={company_guid}/>
        </ErrorBoundary>
    );
}

export default App;
