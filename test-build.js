const expect = require('expect');
const jest = require('jest-mock');
const MuiditorPlugin = require('./dist').default;
const URL = require('./dist/MuiditorPlugin').URL;

const onData = jest.fn();
const onSaveProject = jest.fn();
const onSaveComponent = jest.fn();
const onError = jest.fn();
const onSwitchOS = jest.fn();
const onSwitchOrientation = jest.fn();

const plugin = new MuiditorPlugin({
  container: 'test',
  onData,
  onSaveComponent,
  onSaveProject,
  onError,
  onSwitchOS,
  onSwitchOrientation
});
[
  [MuiditorPlugin.LISTENER_ON_DATA, onData],
  [MuiditorPlugin.LISTENER_ON_SAVE_PROJECT, onSaveProject],
  [MuiditorPlugin.LISTENER_ON_ERROR, onError],
  [MuiditorPlugin.LISTENER_ON_SAVE_COMPONENT, onSaveComponent],
  [MuiditorPlugin.LISTENER_ON_SWITCH_ORIENTATION, onSwitchOrientation],
  [MuiditorPlugin.LISTENER_ON_SWITCH_OS, onSwitchOS],

].forEach(function(item) {
  plugin.onMessage({ data: JSON.stringify([item[0], { foo: 'bar' }]), origin: URL });
  expect(item[1]).toBeCalledTimes(1);
});

