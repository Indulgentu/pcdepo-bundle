const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

module.exports = env => {

    const writeToDisk = env && Boolean(env.writeToDisk);

    let htmlPageNames = ['header'];
    
    let multipleHtmlPlugins = htmlPageNames.map(name => {
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, SOURCE_ROOT + `/static/${name}.html`) , // relative path to the HTML files
        filename: `${name}.html`, // output HTML files
      })
    });
    
    return merge(common, {
        mode: 'development',
        entry: {
            site: SOURCE_ROOT + '/static/main.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.html')
            })
        ].concat(multipleHtmlPlugins),
        devServer: {
            proxy: [{
                context: ['/content', '/etc.clientlibs', '/libs', '/apps/pcdepo/clientlibs/'],
                target: 'http://localhost:8080',
                secure: false,
                changeOrigin: true
            }],
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
            watchFiles: ['src/**/*'],
            hot: false,
            devMiddleware: {
                writeToDisk: writeToDisk
            }
        }
    });
}
