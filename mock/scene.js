const Mock = require('mockjs');
module.exports = {
  'GET /iot/iotsmartspace/stragegy': function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: '',
        'data|30': [
          {
            icon: '@integer',
            strategyName: '@string(5)',
            strategyAction: '@cword(5)',
            kongjian: '@string(4)',
            timeSetting: '@datetime',
            strategyDescription: '@csentence',
          },
        ],
      })
    );
  },
};
