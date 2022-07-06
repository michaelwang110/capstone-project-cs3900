import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AuthoringEnv from './AuthoringEnv';
import { SurveyInfo } from '../Types';

interface AuthDialogProps {
    open: boolean;
    close: () => void;
    confirmClose: () => void;
    surveyInfo: SurveyInfo;
    entryPoints: string[];
    setIsLoadingSurveys: (is_loading_surveys: boolean) => void;
    setSurveys: (surveys: Array<SurveyInfo>) => void;
}

function AuthDialog(props: AuthDialogProps) {
    return (
        <Dialog maxWidth={false} onClose={props.confirmClose} aria-labelledby='dialog' open={props.open}>
                <AuthoringEnv
                    surveyInfo={props.surveyInfo}
                    allEntrypoints={props.entryPoints}
                    close={props.close}
                    confirmClose={props.confirmClose}
                    setIsLoadingSurveys={props.setIsLoadingSurveys}
                    setSurveys={props.setSurveys}
                />
        </Dialog>
    );
}

  export default AuthDialog;
