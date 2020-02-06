const path = require('path');
const SRC_PATH = path.join(__dirname, 'src');
const cookie =
  'connect.sid=s%3Axu_4Fg3kJZHSF5HBVk772kZMpPwTyTl5.1uj6QGFfxIT%2FDGAUdC3Qw4txoN5RZIws2oqxIutH0pY';

module.exports = {
  // supported options in detail:
  // https://github.com/yoranfu/alpha-scripts/blob/master/README.md
  eslintrc: true,
  eslintConfigPath: path.resolve(__dirname, '.eslintrc.json'),
  babelrc: true,
  // modules: ['shared'],
  proxy: [
    {
      context: ['/iotapp', '/oasisapp', '/iotappapi', '/iotapp_rest_parkscreen'],
      target: 'https://oasisrdapp.h3c.com',
      secure: false,
      onProxyReq: function(proxyReq, req, rsp) {
        proxyReq.setHeader('cookie', cookie);
      },
    },
  ],
  alias: {
    utils: path.resolve(SRC_PATH, 'utils'),
    components: path.resolve(SRC_PATH, 'components'),
    containers: path.resolve(SRC_PATH, 'containers'),
    images: path.resolve(SRC_PATH, 'assets/images'),
    assets: path.resolve(SRC_PATH, 'assets'),
    styles: path.resolve(SRC_PATH, 'styles')
  },
  mockOptions: {
    path: 'mock',
    disable: false,
  },
  openPathname: '/',
  theme: {
    'primary-color': '#133795',
    'border-radius-base': '5px',
  },
  plugins: [],
};
