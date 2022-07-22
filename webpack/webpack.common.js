const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    'scripts/popup': path.join(srcDir, 'pages/popup/index.tsx'),
    'scripts/background': path.join(srcDir, 'scripts/background.ts'),
  },
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /.ttf|eot|woff2|woff|svg?$/,
        type: 'asset/resource',
        generator: {
          filename: 'iconfonts/[name].[hash:6][ext]'
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "less", "css"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/images',
          to: 'images'
        },
        {
          from: 'src/_locales',
          to: '_locales'
        },
        {
          from: 'src/manifest.json',
          to: 'manifest.json'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/popup.html',
      template: 'src/pages/popup/index.html',
      inject: true,
      hash: true,
      chunks: ['scripts/popup']
    }),
  ],
};
