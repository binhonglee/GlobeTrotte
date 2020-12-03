/*
  Reference: https://github.com/zinserjan/mocha-webpack/blob/master/docs/guides/jsdom.md
*/

// var jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const { document } = (new JSDOM('', { url: 'https://localhost' })).window;

// global.document = document;
// global.window = document.defaultView;
// window.console = global.console;

// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = document.defaultView[property];
//   }
// });

// global.navigator = {
//   userAgent: 'node.js'
// };
