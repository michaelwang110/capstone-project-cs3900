export interface ExceptionReport {
    Exception: string;
    ComponentStackTrace: string;
    BrowserDiagnostics: string;
}

export interface BrowserDiagnostics {
    WindowLocation: string;
    DocumentCookie: string;
    NavigatorUserAgent: string;
    NavigatorPlatform: string;
    NavigatorLanguage: string;
    ScreenWidthHeight: string;
    WindowWidthHeight: string;
    TimezoneOffset: number;
    Plugins: Plugin[];
    ActiveElement: ActiveElement;
}

export interface Plugin {
    Name: string;
    Filename: string;
    Description: string;
}

export interface ActiveElement {
    TagName: string;
    Id: string;
    ClassName: string;
    Style: string;
}

export interface ErrorException {
    Type: string;
    Message: string;
    StackTrace: string;
    InnerExceptions: ErrorException[];
}