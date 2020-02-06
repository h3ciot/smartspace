const Mock = require('mockjs');
module.exports = {
  'GET /iot/iotsmartspace/overview': function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: '',
        data: {
          list: [
            {
              terminalType: '1',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '2',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '3',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '4',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '5',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '6',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '7',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '8',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '9',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '10',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '11',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
            {
              terminalType: '12',
              'total|0-1000000': 2,
              'offline|0-1000000': 2,
              'online|0-1000000': 2,
            },
          ],
        },
      })
    );
  },
};
