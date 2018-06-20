const fs = require('fs-extra');
const path = require('path');

const HUI_VAR_CSS = path.resolve(
  __dirname,
  '../node_modules/hui/packages/theme-default/src/common/var.css',
);
const INPUT_CSS = path.resolve(__dirname, '../src/theme.css');
const OUTPUT_CSS = path.resolve(__dirname, '../temp/theme.css');

Promise.all([
  fs.readFile(HUI_VAR_CSS),
  fs.readFile(INPUT_CSS),
])
  .then(cssArr => cssArr.join('\n'))
  .then(css => fs.outputFile(OUTPUT_CSS, css));
