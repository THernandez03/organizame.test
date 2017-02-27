require('babel-register')({
  "presets": ["latest", "stage-1"],
  "plugins": [
    ["transform-runtime", {
      "polyfill": true,
      "regenerator": true,
    }],
  ]
});
require('./server.babel');
