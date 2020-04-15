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

## 使用规范

- 返回的code非0时代表错误
- 全局：
    - 对于每个页面首次访问，请使用user_info进行cookie验证，若验证失败（code非0）则跳转到login页面
    - 对于任意一个请求，若返回code为-101，则跳转到login页面，并提示“登录信息超时，请重新登录”
- user接口注意事项：
    - user_info_update的密码规范需要前端进行验证
    - 对于所有接口的错误信息，需要进行提示
- project接口注意事项：
    - project_info返回的data是一个数组，数组每个元素为一个对象，具有以下属性：
        - projectId：即project_id
        - imageType：即project_type
        - name：即project_name
    - 关于project_type参数，请不要使用自定义的字符串，请使用api中导出的几种，详见api.js
- file/dir接口注意事项：
    - 请求参数规范：
        - 请使用绝对路径
        - 文件路径末尾不要有`/`，文件夹路径末尾务必带`/`
        - 路径均使用完整路径，即对于move和copy的new_path，请使用结果路径
            - 例如将`./a.txt`移动到`./A/`目录下，则new_path为`./A/a.txt`
    - file_struct：负责查询以某个根目录下的文件结构，返回的res.data结构和iview的tree组件需要的JSON结构基本一致（除了没有expand分量）
        - 建议前端可以每5-10s查询一次file_struct，不要使用返回的data直接替换原结构
        - 项目根目录`/home/project/user/`
    - file_content：负责查询某个文件的内容，返回的data：
        - path：文件路径
        - content：文件内容，字符串形式
    - file_new，file_rename，dir_new，dir_rename：：需要处理-301错误，即弹出提示信息（文件或文件夹重名）
    - file_move，file_copy，dir_move，dir_copy：有force参数，force为false时代表不覆盖同名文件或文件夹，进行错误返回；force为true时覆盖
        - 建议第一次请求force设置为false，如果返回错误-301，则进行错误提示“存在同名文件或文件夹，是否进行覆盖？”，并设置按钮“确定”和“取消”
        - 当点击确定时，发送第二次请求，force设置为true；点击取消时，不发送第二次请求
    - 关于错误处理，除了上述提到的错误处理，其他情况出现错误时则弹出提示信息，内容为message（一般情况下前端没写出bug不会发生错误，这部分用于debug）
    - 对于已打开的文件，建议设置每30s保存
    - 当进行文件移动相关操作后，注意若被移动的文件为已打开的文件，需要修改相关文件的路径，以免保存到错误路径下
    
    

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
- `2020-04-15:` 服务器对接测试完成，容器已配置，新增project_info_update接口

## TODO

- 和前端对接project
- 和服务器对接file接口
