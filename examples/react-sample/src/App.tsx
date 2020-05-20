import React from 'react';
import './App.css';
import MuiditorPlugin from 'muiditor-plugin';

function App() {
  const onLoad = (payload: { ios: boolean; portrait: boolean; autoSave: boolean }) => {
    console.log(payload);
  }
  const onData = (payload: { [key: string]: any }) => {
    console.log(payload);
  };
  const [muiEditor] = React.useState(
    new MuiditorPlugin({
      uid: 'your_client_uid',
      secret: 'your_client_secret',
      container: 'muiditor-plugin-container',
      onLoad,
      onData
    })
  );

  React.useEffect(() => {
    muiEditor
      .getToken(muiEditor.config.uid || '', muiEditor.config.secret || '')
      .then((token: string) => muiEditor.startEditor(token));
    return () => {
      muiEditor.dispose();
    }
  }, [muiEditor]);
  return (
    <div id="muiditor-plugin-container" className="App" />
  );
}

export default App;
