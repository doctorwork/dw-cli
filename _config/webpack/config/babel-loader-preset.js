
const reactModule = require('./react-module').default;
module.exports = () => ({
    presets: [
      'env',
    ],
    plugins: [
        require('./../../helper/styleName'),
        reactModule,
        'syntax-dynamic-import',
        [
            'transform-react-jsx',
            {
                pragma: 'Nerv.createElement'
            }
        ],
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
    ],
  });