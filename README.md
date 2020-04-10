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

## Error Code

- user：
    - -101：cookie验证失败（cookie不合法或者cookie验证不通过，即cookie里的user_id和token不对应）（auth）
    - -102：权限不足（不可操作其他用户信息，包括user和project）
    - -103：用户名重复（register）
    - -104：密码格式不规范
        - 字母>=0个 数字>=0个 特殊字符（.@#$-）>=0个
        - 6位以上
- project：
    - -201：project_name重名（和当前用户的所有project里）
    - -202：project_type不存在（c++，c，python）
    - -203：项目已进入，不可重入项目，请先退出项目
    - -204：并未进入项目

## log

- `2020-04-09:` 第一版api完成，本地测试完成，与front-serve对接测试完成，但仍有一些参数不匹配的小问题

## TODO

- 将参数修改到匹配
- 新增对Cookie的管理
