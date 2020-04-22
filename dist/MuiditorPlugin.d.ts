interface IMuiConfig {
    container: string;
    autosave?: boolean;
    titleLink?: string;
    title?: string;
    uid?: string;
    secret?: string;
    hideHeader?: boolean;
    dictionary?: {
        [key: string]: string;
    };
    data?: {
        [key: string]: any;
    };
    onData?: (data: {
        [key: string]: any;
    }) => void;
    onSaveProject?: (data: {
        [key: string]: any;
    }) => void;
    onSaveComponent?: (data: {
        [key: string]: any;
    }, base64: string) => void;
    onError?: (error: string) => void;
    onSwitchOS?: (os: 'ios' | 'android') => void;
    onSwitchOrientation?: (orientation: 'portrait' | 'landscape') => void;
}
export declare const URL = "http://localhost:3000";
declare class MuiditorPlugin {
    static LISTENER_ON_DATA: string;
    static LISTENER_ON_SAVE_PROJECT: string;
    static LISTENER_ON_SAVE_COMPONENT: string;
    static LISTENER_ON_SWITCH_ORIENTATION: string;
    static LISTENER_ON_SWITCH_OS: string;
    static LISTENER_ON_ERROR: string;
    static FRAME_DATA_CONFIG: string;
    static FRAME_PRO_ACTION_SWITCH_ORIENTATION: string;
    static FRAME_PRO_ACTION_SET_IOS: string;
    static FRAME_PRO_ACTION_SWITCH_AUTO_SAVE: string;
    static FRAME_PRO_ACTION_SET_PROJECT: string;
    static FRAME_PRO_ACTION_MAKE_SCREENSHOT: string;
    config: IMuiConfig;
    frame?: HTMLIFrameElement;
    constructor(config: IMuiConfig);
    switchOrientation(): void;
    setIOSMode(value: boolean): void;
    switchAutoSave(): void;
    makeScreenshot(): void;
    setProject(data: {
        [key: string]: any;
    }): void;
    performAction(action: string, ...rest: (string | boolean | {
        [key: string]: any;
    })[]): void;
    getToken(uid: string, secret: string): Promise<string>;
    startEditor(token: string | null): void;
    onMessage: (event: MessageEvent) => void;
    postMessage(action: string, ...message: (string | {
        [key: string]: any;
    } | boolean)[]): void;
    dispose(): void;
}
export default MuiditorPlugin;
