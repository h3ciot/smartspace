const contexts = require.context('./', false, /\.json$/);
let en = {};
contexts.keys().forEach(item => {
  const message = contexts(item);
  en = { ...en, ...message };
});

export default en;
