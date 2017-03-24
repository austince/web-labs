/**
 * @file lab1.js
 * @author austin cawley-edwards <acawleye@stevens.edu>
 *
* */

/**
 *
 * @param args
 */
function sumOfSquares(...args) {
  let sum = 0;
  for (const arg of args) {
    if (isNaN(arg)) throw new TypeError(`${arg} is not a number.`);
    sum += arg * arg;
  }

  return sum;
}

/**
 *
 * @param {string} firstName
 * @param {string} [lastName]
 * @param {string} [title]
 */
function sayHelloTo(firstName, lastName, title) {
  let statement;

  switch (arguments.length) {
    case 0:
      throw new TypeError('Need to say hello to someone!');
    case 1:
      statement = `Hello, ${firstName}!`;
      break;
    case 2:
      statement = `Hello, ${firstName} ${lastName}. I hope you are having a good day!`;
      break;
    default:
      statement = `Hello, ${title} ${firstName} ${lastName}! Have a good evening!`;
  }

  console.log(statement);
}

/**
 * @param {Number} howManyCups
 * @return {string}
 */
function cupsOfCoffee(howManyCups) {
  if (isNaN(howManyCups) || !Number.isSafeInteger(howManyCups)) {
    throw new TypeError('Must be an integer!');
  }

  let song = '';

  function lyric(cupsLeft) {
    switch (cupsLeft) {
      case 1:
        return '1 cups of coffee on the desk! 1 cups of coffee!' +
            '\nPick it up, drink the cup, no more coffee left on the desk!';
      case 2:
        return '2 cups of coffee on the desk! 2 cups of coffee!' +
            '\nPick one up, drink the cup, 1 cup of coffee on the desk!\n\n';
      default:
        return `${cupsLeft} cups of coffee on the desk! ${cupsLeft} cups of coffee!\nPick one up, drink the cup, ${cupsLeft - 1} cups of coffee on the desk!\n\n`;
    }
  }

  for (let cup = howManyCups; cup > 0; cup--) {
    song += lyric(cup);
  }
  return song;
}

/**
 * @param {String} fullString
 * @param {String} substring
 * @return {Number}
 */
function occurrencesOfSubstring(fullString, substring) {
  if (typeof fullString !== 'string') {
    throw new TypeError(`${fullString} is not a string.`);
  } else if (typeof substring !== 'string') {
    throw new TypeError(`${substring} is not a string.`);
  }

  let occurrences = 0;
  const searchPat = new RegExp(substring, 'g');

  // Iterative regex searching
  let match = searchPat.exec(fullString);
  while (match != null) {
    occurrences++;
    // Each match updates the lastIndex to past the last match
    searchPat.lastIndex -= (match[0].length - 1);
    match = searchPat.exec(fullString);
  }

  return occurrences;
}

/**
 *
 * @param {string} paragraph
 */
function randomizeSentences(paragraph) {
  if (typeof paragraph !== 'string') {
    throw new TypeError(`${paragraph} is not a string`);
  }

  // Matches anything that's not a sentence end, followed by a sentence end or the end of the string
  const sentenceRegex = /([^.!?]+[.!?]+)|([^.!?]+$)/g;
  const sentences = paragraph.match(sentenceRegex) || []; // empty array if no sentences
  // Now randomize

  let randParagraph = '';
  while (sentences.length > 0) {
    randParagraph += sentences.splice(Math.floor(Math.random() * sentences.length), 1);
  }
  return randParagraph;
}


function main() {
  console.log(`sumOfSquares: ${sumOfSquares(5, 3, 10)} should be 134`);

  try {
    sumOfSquares('hey', 'there');
  } catch (err) {
    console.log(`Caught error: ${err}`);
  }

  console.log('\nsayHelloTo:');
  try {
    sayHelloTo(); // throws
  } catch (err) {
    console.log('Caught you and your insufficient parameters!');
  }

  sayHelloTo('Phil'); // logs: Hello, Phil!
  sayHelloTo('Phil', 'Barresi'); // logs: Hello, Phil Barresi. I hope you are having a good day!
  sayHelloTo('Phil', 'Barresi', 'Mr.'); // logs: Hello, Mr. Phil Barresi! Have a good evening!

  console.log(cupsOfCoffee(5));

  console.log('\noccurencestOfSubstring:');
  console.log(`${occurrencesOfSubstring('hello world', 'o')} should be 2`);
  console.log(`${occurrencesOfSubstring('Helllllllo, class!', 'll')} should be 6`);

  console.log(randomizeSentences('Hey there! Hello, world! This is so new'));

  console.log('8192 Randomized Cups of Coffee!');
  console.log(randomizeSentences(cupsOfCoffee(8192)));
}

// Run the 'script' if run directly
if (require.main === module) {
  main();
}

// Easier to test?
module.exports = {
  sumOfSquares,
  cupsOfCoffee,
  sayHelloTo,
  occurrencesOfSubstring,
  randomizeSentences,
};
