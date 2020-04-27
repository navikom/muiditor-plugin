### install

```sh
npm i --save muiditor-plugin
```
### or
```sh
yarn add muiditor-plugin
```
## React component with typescript
```js
import React from 'react';
import MuiditorPlugin from 'muiditor-plugin/dist';

function App() {
  const onData = (data: {[key: string]: any}) => {
    console.log(data);
  };
  const [muiEditor] = React.useState(
    new MuiditorPlugin({
      uid: 'change_to_your_uid',
      secret: 'change_to_your_secret',
      container: 'muiditor-plugin-container',
      data: {/* initial project data */},
      onData})
  );

  const projectData = {/*here is a project data*/};

  const setProjectData = (project: {[key: string]: any}) => {
    muiEditor.setProject(project);
  };

  React.useEffect(() => {
    muiEditor
      .getToken(muiEditor.config.uid || "", muiEditor.config.secret || "")
      .then((token) => {
        // muiEditor.startViewer(token); if you want to start Viewer
        muiEditor.startEditor(token);
      });
    return () => {
      muiEditor.dispose();
    }
  }, [muiEditor]);
  return (
    <React.Fragment>
      <div id="muiditor-plugin-container" />
      <button onClick={setProjectData}>Set Another Project</button>
    </React.Fragment>
  );
}

export default App;
```
