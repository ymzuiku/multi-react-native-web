# react-native & react-native-web 的多项目框架, 内置轻量级 navigation

## 安装

克隆项目

```sh
$ git clone https://github.com/dalcib/react-native-material-ui-web-app
```

安装依赖

```sh
yarn to init
```

## 使用

如果要启动某个目录里的项目, 如 app 目录

```sh
# 启动app文件夹内的web项目
yarn to web app

# 启动app文件夹内的web项目, 生产环境
yarn to web-prod app

# 编译app文件夹内的web项目
yarn to web-build app

# 启动app文件夹内的ios项目
yarn to ios app

# 启动app文件夹内的ios项目, 生产环境
yarn to ios-pord app

# 启动app文件夹内的android项目
yarn to android app

# 启动app文件夹内的android项目, 生产环境
yarn to android-pord app
```

如果要启动 `projects/OtherApp` 路径的web项目

```sh
yarn to android-pord projects/OtherApp
```
