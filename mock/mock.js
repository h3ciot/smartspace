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
  'GET /iot/iotsmartspace/group': function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: '',
        data: {
          groupList: [
            {
              groupId: 'root',
              groupName: '全部',
              children: [
                {
                  groupId: '1',
                  groupName: '组1',
                  children: [
                    {
                      groupId: '11',
                      groupName: '组1-1',
                      children: [],
                    },
                    {
                      groupId: '12',
                      groupName: '组1-2',
                      children: [],
                    },
                    {
                      groupId: '13',
                      groupName: '组1-3',
                      children: [],
                    },
                  ],
                },
                {
                  groupId: '2',
                  groupName: '组2',
                  children: [
                    {
                      groupId: '21',
                      groupName: '组2-1',
                      children: [],
                    },
                    {
                      groupId: '22',
                      groupName: '组2-2',
                      children: [],
                    },
                    {
                      groupId: '23',
                      groupName: '组2-3',
                      children: [],
                    },
                  ],
                },
                {
                  groupId: '3',
                  groupName: '组3',
                  children: [
                    {
                      groupId: '31',
                      groupName: '组3-1',
                      children: [],
                    },
                    {
                      groupId: '32',
                      groupName: '组3-2',
                      children: [],
                    },
                    {
                      groupId: '33',
                      groupName: '组3-3',
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      })
    );
  },
  'POST /iot/iotsmartspace/group': function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: '',
        data: {},
      })
    );
  },
  'PUT /iot/iotsmartspace/group': function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: '',
        data: {},
      })
    );
  },
  'DELETE /iot/iotsmartspace/group': function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: '',
        data: {},
      })
    );
  },
};
