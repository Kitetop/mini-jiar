> 项目依赖说明

插件名字|作用 
 :----:|:----:
|@soda/friendly-errors-webpack-plugin|使得webpack报错更加友好的显示在控制台|
webpackbar | 显示webpack打包或者启动的进度条
yargs-parser | 获得命令行中带的参数
html-webpack-plugin | 创建html入口文件以及引入外部资源
node-notifier | 桌面提醒构建成功还是失败
webpack-bundle-analyzer | 对打包的结果进行分析的工具
dotenv-webpack | 使用环境变量
clean-webpack-plugin | 重新打包会把dist目录中的文件先删除
mini-css-extract-plugin | 将css单独抽出来作为一个文件
css-minimizer-webpack-plugin | 优化并缩小css代码
| | |
---
> 使用babel-loader时

插件名字|作用 
 :----:|:----:
 @babel/plugin-proposal-decorators | 用于支持装饰器
 @babel/plugin-proposal-class-properties | 用来编译class
 @babel/plugin-transform-block-scoping ｜ let const转成var
 @babel/plugin-transform-classes | 将ES2015类编译为ES5
 @babel/plugin-transform-proto-to-assign | 对__proto__属性赋值使用引用
 @babel/preset-react | 对react语法进行转换
 @babel/preset-typescript | 对ts语法进行转换