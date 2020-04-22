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
      onData})
  );

  React.useEffect(() => {
    muiEditor
      .getToken(muiEditor.config.uid || "", muiEditor.config.secret || "")
      .then((token) => muiEditor.startEditor(token));
    return () => {
      muiEditor.dispose();
    }
  }, [muiEditor]);
  return (
    <div id="muiditor-plugin-container" />
  );
}

export default App;
```
