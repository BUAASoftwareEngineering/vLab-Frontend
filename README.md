# web_terminal

> Terminal Demo project for vLab

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Init Term

- give the project element which was responsed from `project_enter` or `project_info`, and the DIV id for mounted function

```js
import Terminal from './Terminal.js'

function init(project_ele, div_id) {
    Terminal.mounted(project_ele, div_id)
}
```

- you should put `Terminal.js` and `api.js` in the same dir or change the path which define in `Terminal.js`

## Compile JSON

- CPP:
```
{
    type : "CPP"
    sources: [a list of .cpp and .h path]
}
```

## Run JSON

- CPP:
```
{
    type: "CPP"
    exec: path of out
    args: argument list, if empty can be undefined
}
```

- PYTHON3:
```
{
    type: "PYTHON3"
    exec: path of the main.py
    args: argument list, if empty can be undefined
}
```