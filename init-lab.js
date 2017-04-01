#!/home/austin/.nvm/versions/node/v7.7.1/bin/node

/**
 * Created by austin on 3/24/17.
 */

const init = require('init-package-json');
const path = require('path');
const fs = require('fs');

const initFile = path.resolve(process.env.HOME, '.npm-init');
const labName = `lab${process.argv[2]}`;
const cwd = process.cwd();
const testDir = path.join(cwd, 'test');
const labDir = path.join(cwd, labName);

const configData = {
  name: labName,
  version: '1.0.0',
  author: 'austin cawley-edwards <acawleye@stevens.edu>',
  description: `${labName} for CS 546 at Stevens`,
  main: 'app.js',
  scripts: {
    start: 'node app.js',
    test: 'cd .. && npm test',
  },
  keywords: [
    'node',
    'web',
    'development',
    'stevens',
    'institute',
    'of',
    'technology',
  ],
  license: 'ISC',
};

fs.mkdir(labDir);

init(labDir, initFile, configData, (err, data) => {
  if (err) console.log(err);

  fs.closeSync(fs.openSync(path.join(labDir, configData.main), 'w'));
  fs.closeSync(fs.openSync(path.join(testDir, `${labName}.js`), 'w'));
});

