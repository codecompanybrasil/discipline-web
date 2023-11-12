const path = require('path');
const { randomUUID } = require('crypto');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/')
        },
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.output.hashSalt = randomUUID()
            return webpackConfig
        }

    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^@(.*)$': '<rootDir>/src$1'
            }
        }
    }
};