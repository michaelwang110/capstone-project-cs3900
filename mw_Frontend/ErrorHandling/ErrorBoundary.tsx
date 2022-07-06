import * as React from 'react';
import { ExceptionReport, BrowserDiagnostics, Plugin, ActiveElement } from './Types';
import { logError } from './Api';

interface IErrorBoundaryState {
    isError: boolean;
}

class ErrorBoundary extends React.Component<{}, IErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = {isError: false};
    }

    getBrowserDiagnostics(): BrowserDiagnostics {
        let browser_diagnostics = null;

            let plugins = [] as Plugin[];
            try {
                if (navigator.plugins) { // Firefox, Chrome
                    for (let i = 0; i < navigator.plugins.length; i++) {
                        let p = navigator.plugins[i];
                        plugins.push({
                            Name: p.name,
                            Filename: p.filename,
                            Description: p.description,
                        });
                    }
                }
            } catch {
            }

            let active_element: ActiveElement | string;
            try {
                let actv = document.activeElement;
                if (actv) {
                    active_element = {
                        TagName: actv.tagName,
                        Id: actv.id || '',
                        ClassName: actv.className || '',
                        Style: actv.getAttribute('style') || ''
                    };
                } else {
                    active_element = 'none';
                }
            } catch (e) {
                active_element = 'ERROR:' + e.toString();
            }

            browser_diagnostics = {
                WindowLocation: window.location.href,
                DocumentCookie: document.cookie,
                NavigatorUserAgent: navigator.userAgent,
                NavigatorPlatform: navigator.platform,
                NavigatorLanguage: navigator.language,
                ScreenWidthHeight: screen.width + ' x ' + screen.height,
                WindowWidthHeight: window.innerWidth + ' x ' + window.innerHeight,
                TimezoneOffset: new Date().getTimezoneOffset(),
                Plugins: plugins,
                ActiveElement: active_element
            } as BrowserDiagnostics;

        return browser_diagnostics;
    }

    componentDidCatch(error: Error, error_info: React.ErrorInfo): void {
        const stack_trace = (error.stack) ? error.stack : '';
        const browser_diagnostics = this.getBrowserDiagnostics();
        logError({
            Exception: JSON.stringify({
                StackTrace: stack_trace,
                Type: error.name,
                Message: error.message,
                InnerExceptions: []
            }),
            ComponentStackTrace: error_info.componentStack.toString(),
            BrowserDiagnostics: JSON.stringify(browser_diagnostics)
        });
        this.setState({ isError: true});
    }

    render() {
        if (this.state.isError) {
            return null;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;