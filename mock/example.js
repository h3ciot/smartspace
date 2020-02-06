module.exports = {
  'GET /api': function(req, res) {
    res.json({
      code: 0,
      message: '',
      data: {
        title: 'mock',
        author: 'yoranfu',
      },
    });
  },
};
