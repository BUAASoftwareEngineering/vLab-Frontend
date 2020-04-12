# vLab - IDE Page

> A [Vue.js](https://vuejs.org/index.html) project with [monaco-editor](http://github.com/Microsoft/monaco-editor)

## Dependencies
```javascript
"monaco-editor": "=0.19.3",
"monaco-editor-webpack-plugin": "=1.9.0",
"webpack": "^3.6.0",
"webpack-dev-server": "^2.9.1",
```

## Build & Run Setup
### Install Dependencies (node_modules/)
``` bash
npm install .
```

### Serve Dev Version with Hot Reload at http://localhost:8080 [works well]
``` bash
npm run dev
```

### Build for Production with Minification [not tested]
``` bash
npm run build
```
Then set the website root to `vLab-Frontend/dist/` and setup local server with Apache.
