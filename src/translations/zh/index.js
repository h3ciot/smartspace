const contexts = require.context('./', false, /\.json$/);
let zh = {};
contexts.keys().forEach(item => {
  const message = contexts(item);
  zh = { ...zh, ...message };
});
export default zh;
