/**
 * Created by austin on 1/27/17.
 */

const printShapes = require('./printShapes');

/**
 *
 * @param {int} length
 * @param {int} [maxInt=5]
 * @param {int} [minInt=0]
 * @return {Array}
 */
function randIntArr(length, maxInt = 5, minInt = 0) {
  return Array.from({ length }, () => minInt + Math.floor(Math.random() * (maxInt + 1)));
}

// Run the 'script' if run directly
if (require.main === module) {
  try {
    printShapes.rhombus(1);
  } catch (err) {
    console.log('Type Error caught when trying to print a rhombus with 1 line');
    console.log(err);
  }

  console.log('10TRIANGLES');
  randIntArr(10, 5).forEach(printShapes.triangle);

  console.log('10SQUARES');
  randIntArr(10, 5, 2).forEach(printShapes.square);

  console.log('10RHOMBI');
  randIntArr(10, 5, 2).map((num) => {
    // Make sure they're all even
    return (num % 2) === 0 ? num : num + 1;
  }).forEach(printShapes.rhombus);
}

