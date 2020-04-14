# web-api

## Usage

```js
// App.vue

import api from '/src/api.js'

// ...

function example(user_name, password) {
    api.user_login(user_name, password, function (response) {
        if (response.code == 0) {
            // success
        }
    })
}

```

- 使用前需要修改server地址

## Error Code

- user：
    - -101：cookie验证失败（cookie不合法或者cookie验证不通过，即cookie里的user_id和token不对应）（auth）
    - -102：权限不足（不可操作其他用户信息，包括user和project）
    - -103：用户名重复（register）
    - -104：密码格式不规范
        - 字母>=0个 数字>=0个 特殊字符（.@#$-）>=0个
        - 6位以上
- project：
    - 无特别的错误码
- file/dir:
    - -301：路径存在（存在重名文件或文件夹）
    - -300：未知错误
- 其他：服务器错误

## log

- `2020-04-09:` 第一版api完成，本地测试完成，与front-serve对接测试完成，但仍有一些参数不匹配的小问题
- `2020-04-10:` 第二版api完成，本地测试，服务器测试均通过，目前可以完成用户身份验证功能以及获取user_name，前端不需要操控cookie，并且明确了错误码定义。
- `2020-04-12:` user和project的请求和服务器对接完成，可以投入使用，并且新加了对project_type的限制
- `2020-04-14:` 第三版api完成，本地测试完成，目前可支持所有file操作，服务器尚未进行对接测试。

## TODO

- 和前端对接project
- 和服务器对接file接口
