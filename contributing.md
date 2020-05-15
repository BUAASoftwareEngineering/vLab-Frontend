# VLab-Frontend-Contributing

## 开发流程

- 挑选一个issue或者新建一个issue作为工作内容
- 使用git pull拉取master分支最新内容到本地开发环境
- 从master创建一个新分支：`git checkout -b issue-<###>-<short-description>`
- 写代码、单元测试、调整代码至符合规范、保证本地可以成功编译运行
- git add && commit && push（注意commit规范与push的分支）
- 重复以上两步直至任务完成
- 发起pull request，并通知团队成员进行代码复审
- - 如果有错误或有冲突重复上述开发流程，修改
  - 如果没有错误和冲突，同意pull request，将分支合并到master

## commit规范

每个commit信息由三部分组成：

```
<type> : <description> #<issueId>
```

### type

主要有以下几种：

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **accessibility**: Adding support for accessibility

### description

没有强制要求，可以中文也可以英文

### issueId

本次commit提交工作内容所关联的issueId

### example

比如使用以下命令commit，表示本次commit只是更新了文档方面的内容，并且本次commit版本号与内容将会关联到第54号issue中

```
git commit -m "docs: 添加开发流程规范文档 #54"
```

