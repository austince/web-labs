/**
 * Created by austin on 2/6/17.
 */

const fs = require('fs');
const fsp = require('fs-promise');
const glob = require('glob');
const fd = require('./fileData');
const textMetrics = require('./textMetrics');

// Select all txt files that aren't debug files
const FILE_GLOB = './!(*.debug)*.txt';
function doesNotExist(path) {
  return new Promise((resolve, reject) => {
    fsp.access(path, fs.constants.F_OK)
        .then(() => {
          // it already exists
          reject();
        })
        .catch(() => {
          // it doesn't exist
          resolve();
        });
  });
}

function processFile(path) {
  // Check if corresponding result file already exists
  const resFile = path.replace('.txt', '.result.json');
  let simplified;
  let metrics;
  doesNotExist(resFile)
      .then(() => {
        // doesn't exist so run metrics
        return fd.getFileAsString(path);
      })
      .then((content) => {
        simplified = textMetrics.simplify(content);
        const debugFile = path.replace('.txt', '.debug.txt');
        return fd.saveStringToFile(debugFile, simplified);
      })
      .then(() => {
        metrics = textMetrics.createMetrics(simplified);
        return fd.saveJSONToFile(resFile, metrics);
      })
      .then(() => {
        // Print the metrics to the console
        console.log(`Metrics for: ${path}`);
        console.log(metrics);
      })
      .catch((err) => {
        if (err) {
          // another error
          console.error(`Problem processing ${path}: ${err}`);
        } else {
          // already processed, file exists
          console.log(`${path} has already been processed.`);
        }
      });
}


// Main script
glob(FILE_GLOB, (err, files) => {
  if (err) {
    console.error('Error finding the .txt files!');
    return;
  }

  for (const file of files) {
    processFile(file);
  }
});
