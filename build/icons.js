const fs = require('fs-extra');
const path = require('path');
const webfontsGenerator = require('webfonts-generator');

const INPUT_DIR = path.resolve(__dirname, '../assets/font-src');
const OUTPUT_DIR = path.resolve(__dirname, '../temp/icons');

fs.readdir(INPUT_DIR)
  .then(files => files.map(filename => path.resolve(INPUT_DIR, filename)))
  .then((files) => {
    webfontsGenerator({
      files,
      dest: OUTPUT_DIR,
      cssTemplate: path.resolve(__dirname, './icons-template.hbs'),
      templateOptions: { classPrefix: 'rm-' },
      fontName: 'rm-icons',
    });
  });
