import React from 'react';
import { EntryPointResponse, EntryPointDeleteRequest } from '../Types';
import { removeEntryPoint } from '../Api';
import { ENTRY_POINT_WITHOUT_SURVEYS_TEXT, EMPTY_ENTRY_POINTS_HELP, ENTRY_POINTS_HELP } from '../HelpText';

interface EntryPointsProps {
    entryPoints: EntryPointResponse[];
    setEntryPoints: (entry_points: Array<EntryPointResponse>) => void;
    companyGuid: string;
    updateSurveysMapping: (entry_point: EntryPointResponse) => EntryPointResponse;
    setIsLoadingEntries: (is_loading_entries: boolean) => void;
    isLoadingEntries: boolean;
    entriesSurveysCollected: boolean;
    spinner: any;
}

function EntryPoints(props: EntryPointsProps) {

    function handleForgetButton(name: string) {
        const entry_point_request = {
            CompanyGuid: props.companyGuid,
            Name: name
        } as EntryPointDeleteRequest;

        if (confirm('Are you sure?')) {
            props.setIsLoadingEntries(true);
            removeEntryPoint(entry_point_request)
            .then(x => x.map(props.updateSurveysMapping))
            .then(props.setEntryPoints)
            .then(() => props.setIsLoadingEntries(false));
        }
    }

    function renderForgetButton(name: string) {
        return (
            <button
                className='forget-button'
                aria-label='forget'
                onClick={() => handleForgetButton(name)}
            >
                Forget
            </button>
        );
    }

    const table_header =
        <thead>
            <tr>
                <th></th>
                <th>Last Seen</th>
                <th>Surveys</th>
            </tr>
        </thead>;

    const table_data =
        props.entryPoints.map(entry_point => {
            return (
                <tr key={entry_point.Name}>
                    <td>{entry_point.Name}</td>
                    <td style={{minWidth: '80px'}}>{entry_point.Date}</td>
                    <td>
                        {entry_point.Surveys.length > 0 ?
                            entry_point.Surveys.join(', ')
                            :
                            ENTRY_POINT_WITHOUT_SURVEYS_TEXT}
                    </td>
                    <td className='numeric-align'>{renderForgetButton(entry_point.Name)}</td>
                </tr>
            );
        });

    const no_entry_points_message =
    <tr key={'no-entry-points'}>
        <td id='no-entry-points-message' className='spanning-columns' colSpan={4}>
            {EMPTY_ENTRY_POINTS_HELP}
        </td>
    </tr>;

    const table =
        <div className='section shaded-form'>
            <table id='entry-points-table' className='form-table' style={{fontSize: '13px', fontFamily: 'Open Sans,Sans-Serif'}}>
                {table_header}
                <tbody id='entry-points-table-body'>
                    {props.entryPoints !== null && props.entryPoints.length > 0 ?
                        table_data
                        :
                        no_entry_points_message}
                </tbody>
            </table>
        </div>;

    const header_bar =
        <div className='header-bar'>
            <h2>
                Survey Entry Points
            </h2>
            <p className='help' style={{whiteSpace: 'pre-wrap'}}>
                {ENTRY_POINTS_HELP}
            </p>
        </div>;

    return (
        <div id='entry-points-container'>
            {header_bar}
            {!props.entriesSurveysCollected || props.isLoadingEntries ? <div className='spinner'>{props.spinner}</div> : table}
        </div>
    );
}

export default EntryPoints;
