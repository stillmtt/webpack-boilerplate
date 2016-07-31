const {resolve} = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env => {
  
  return {

    entry: './js/app.js',

    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ],

    context: resolve(__dirname, 'app'),

    devtool: env.prod ? 'source-map' : 'eval',

    bail: env.prod,

    module: {

      loaders: [

       {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: /node_modules/
        },

        {
          test: /\.js$/, 
          loader: 'babel', 
          exclude: /node_modules/
        },

        {
          test: /\.scss$/, 
          loaders: ['style','css','sass'], 
          exclude: /node_modules/
        },

        {
          test: /\.jpe?g$|\.png$|\.gif$|\.svg$|\.woff$|\.ttf$|\.otf$|\.eot$/, 
          loader: 'url-loader', 
          exclude: /node_modules/
        }
      ],
    }   
  }
}