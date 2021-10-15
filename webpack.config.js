const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  //配置入口文件
  entry: "./src/index.ts",
  mode: "production",
  //指定打包文件所在目录
  output: {
    path: path.resolve(__dirname, "dist"),
    //打包以后的文件名字
    filename: "bundle.js",
    //
    environment:{
      //是否启用箭头函数
        arrowFunction: false
    }
  },
  //指定文本pack打包时要使用的模块
  module: {
    //指定要加载的规则
    rules: [
      //指定规则生效的文件
      {
        test: /\.ts$/,
        use: [
          {
            //指定加载器
            loader: "babel-loader",
            //设置babel
            options: {
              //设置预定义的环境
              presets: [
                [
                  //指定环境的插件
                  "@babel/preset-env",
                  //配置信息
                  {
                      //要兼容的目标浏览器
                    targets: {
                      chrome: "48",
                      ie:'6'
                    },
                    //指定corejs的版本
                    "corejs": "3",
                    //使用corejs的方式”usage“表示按需加载
                    "useBuiltIns":"usage"
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node-modules/,
      },
    ],
  },

  //配件webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  //设置引用
  resolve: {
    extensions: [".js", ".ts"],
  },
};
