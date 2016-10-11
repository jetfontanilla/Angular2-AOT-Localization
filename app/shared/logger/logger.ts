export interface Logger {
    log(...args): void;

    error(message: string,
        e?: any,
        code?: number,
        additionalInfo?: Object): void;

    trackEvent(message: string,
               label?: string,
               additionalInfo?: Object): void;
}
