const { whenDev } = require('@craco/craco');
const CracoAlias = require('craco-alias');
const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },
    // configure: {
    //   /* Any Jest configuration options: https://jestjs.io/docs/en/configuration. */
    // },
    // configure: (jestConfig, { env, paths, resolve, rootDir }) => {
    //   return jestConfig;
    // },
  },
  babel: {
    presets: ['@babel/preset-react'],
    plugins: ['@babel/plugin-syntax-dynamic-import'],
  },
  eslint: {
    enable: false,
  },
  webpack: {
    configure: {
      devtool: whenDev(() => 'eval-source-map'),
      output: {
        devtoolModuleFilenameTemplate: function (info) {
          return 'file:///' + path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: './src',
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: './config/typescript/tsconfig.alias.json',
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        miniCssExtractPluginOptions: {
          ignoreOrder: true,
        },
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#5FC6FF' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
