# web-api

## Usage

```js
// App.vue

import api from '/src/api.js'

// ...

function example(user_name, password) {
    api.user_auth(user_name, password, function (response) {
        if (response.code == 0) {
            // success
        }
    })
}

```

- 使用前需要修改server地址

## log

- `2020-04-09:` 第一版api完成，本地测试完成，与front-serve对接测试完成，但仍有一些参数不匹配的小问题

## TODO

- 将参数修改到匹配
- 新增对Cookie的管理
