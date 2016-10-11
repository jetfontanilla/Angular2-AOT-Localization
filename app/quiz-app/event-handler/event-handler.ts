export interface EventHandler {
    addExternalInterface(methodName: string);
    subscribe(eventName: string, callback: (data?: any) => void);
    publish(eventName: string, data?: any);
    initialize();
    initializeActivity(activity: any);
    getType(): string;
}
