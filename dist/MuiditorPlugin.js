"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var PLUGIN_URL = 'https://api.muiditor.com/plugin/token';
exports.URL = 'https://muiditor.com';
var commonConfig = {
    container: 'muiditor-plugin',
    autosave: false,
    uid: 'client_uid_',
    secret: 'client_secret'
};
var MuiditorPlugin = /** @class */ (function () {
    function MuiditorPlugin(config) {
        var _this = this;
        this.onMessage = function (event) {
            var data = JSON.parse(event.data);
            if (event.origin !== exports.URL) {
                return;
            }
            var payload = data[1];
            switch (data[0]) {
                case MuiditorPlugin.LISTENER_ON_DATA:
                    _this.config.onData && _this.config.onData(payload);
                    break;
                case MuiditorPlugin.LISTENER_ON_ERROR:
                    _this.config.onError && _this.config.onError(payload);
                    break;
                case MuiditorPlugin.LISTENER_ON_SAVE_PROJECT:
                    _this.config.onSaveProject && _this.config.onSaveProject(payload);
                    break;
                case MuiditorPlugin.LISTENER_ON_SAVE_COMPONENT:
                    _this.config.onSaveComponent && _this.config.onSaveComponent(payload[0], payload[1]);
                    break;
                case MuiditorPlugin.LISTENER_ON_SWITCH_ORIENTATION:
                    _this.config.onSwitchOrientation && _this.config.onSwitchOrientation(payload);
                    break;
                case MuiditorPlugin.LISTENER_ON_SWITCH_OS:
                    _this.config.onSwitchOS && _this.config.onSwitchOS(payload);
                    break;
            }
        };
        this.config = Object.assign(commonConfig, config);
    }
    MuiditorPlugin.prototype.switchOrientation = function () {
        this.performAction(MuiditorPlugin.FRAME_PRO_ACTION_SWITCH_ORIENTATION);
    };
    MuiditorPlugin.prototype.setIOSMode = function (value) {
        this.performAction(MuiditorPlugin.FRAME_PRO_ACTION_SET_IOS, value);
    };
    MuiditorPlugin.prototype.switchAutoSave = function () {
        this.performAction(MuiditorPlugin.FRAME_PRO_ACTION_SWITCH_AUTO_SAVE);
    };
    MuiditorPlugin.prototype.makeScreenshot = function () {
        this.performAction(MuiditorPlugin.FRAME_PRO_ACTION_MAKE_SCREENSHOT);
    };
    MuiditorPlugin.prototype.setProject = function (data) {
        this.performAction(MuiditorPlugin.FRAME_PRO_ACTION_SET_PROJECT, data);
    };
    MuiditorPlugin.prototype.performAction = function (action) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this.postMessage.apply(this, __spreadArrays([action], rest));
    };
    MuiditorPlugin.prototype.getToken = function (uid, secret) {
        var config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "grant_type=password&uid=" + uid + "&secret=" + secret
        };
        return fetch(new Request(PLUGIN_URL, config)).then(function (response) { return response.text(); });
    };
    MuiditorPlugin.prototype.startEditor = function (token) {
        this.makeFrame(token, MuiditorPlugin.TYPE_EDITOR);
    };
    MuiditorPlugin.prototype.startViewer = function (token) {
        this.makeFrame(token, MuiditorPlugin.TYPE_VIEWER);
    };
    MuiditorPlugin.prototype.makeFrame = function (token, type) {
        var container = document.getElementById(this.config.container);
        var frame = document.createElement('iframe');
        frame.src = exports.URL + "/" + type + "?token=" + token;
        frame.id = type;
        window.addEventListener('message', this.onMessage, false);
        container && container.appendChild(frame);
        this.frame = frame;
        this.performAction(MuiditorPlugin.FRAME_DATA_CONFIG, this.config);
    };
    MuiditorPlugin.prototype.postMessage = function (action) {
        var message = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            message[_i - 1] = arguments[_i];
        }
        this.frame && this.frame.contentWindow.postMessage(JSON.stringify(__spreadArrays([action], message)), '*');
    };
    MuiditorPlugin.prototype.dispose = function () {
        window.removeEventListener('message', this.onMessage, false);
    };
    MuiditorPlugin.LISTENER_ON_DATA = 'editor_on_data';
    MuiditorPlugin.LISTENER_ON_SAVE_PROJECT = 'editor_on_save_project';
    MuiditorPlugin.LISTENER_ON_SAVE_COMPONENT = 'editor_on_save_component';
    MuiditorPlugin.LISTENER_ON_SWITCH_ORIENTATION = 'on_switch_orientation';
    MuiditorPlugin.LISTENER_ON_SWITCH_OS = 'on_switch_os';
    MuiditorPlugin.LISTENER_ON_ERROR = 'on_error';
    MuiditorPlugin.FRAME_DATA_CONFIG = 'config';
    MuiditorPlugin.FRAME_PRO_ACTION_SWITCH_ORIENTATION = 'switch_orientation';
    MuiditorPlugin.FRAME_PRO_ACTION_SET_IOS = 'set_ios';
    MuiditorPlugin.FRAME_PRO_ACTION_SWITCH_AUTO_SAVE = 'switch_auto_save';
    MuiditorPlugin.FRAME_PRO_ACTION_SET_PROJECT = 'set_project';
    MuiditorPlugin.FRAME_PRO_ACTION_MAKE_SCREENSHOT = 'make_screenshot';
    MuiditorPlugin.TYPE_EDITOR = 'editor';
    MuiditorPlugin.TYPE_VIEWER = 'viewer';
    return MuiditorPlugin;
}());
exports["default"] = MuiditorPlugin;
//# sourceMappingURL=MuiditorPlugin.js.map