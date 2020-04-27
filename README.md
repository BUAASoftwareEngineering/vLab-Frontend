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

## SetColor

- 支持动态改变xterm的背景颜色，光标颜色，字体颜色，也支持初始化时设定
- 初始化时请在project_ele属性中增加：
    - background：背景颜色，格式为css颜色格式
    - foreground：字体颜色，有：
        - black, red, green, yellow, blue, magenta, cyan, white, brightBlack, brightRed, brightGreen, brightYellow, brightBlue, brightMagenta, brightCyan, brightWhite
    - cursor：光标颜色，同上
- 动态修改时调用setcolor函数，参数为一个object，具有上面三个属性，若属性undefined时默认设置为当前配置