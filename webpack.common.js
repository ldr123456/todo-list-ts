const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'index.tsx')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TodoMVC: React',
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    ["@babel/preset-env", { targets: "defaults" }],
                    ["@babel/preset-react", { runtime: "automatic" }],
                ],
            },
        },
    },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  }
}
