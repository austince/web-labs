/**
 * Created by austin on 2/6/17.
 */

/**
 *  1. Convert the text to lowercase
    2. Remove all non-alphanumeric characters (?.!'," and so on)
    3. Convert all white space to simple spaces (new lines become spaces; tabs become spaces, etc)
    4. Return the result.
 * @param text
 */
function simplify(text) {
  if (typeof text !== 'string') {
    throw new TypeError(`Text needs to be a string, not: ${text}`);
  }

  let simplified = text.toLowerCase();
  // First replace the white spaces with a single space
  simplified = simplified.replace(/[\n\t\r\b ]+/gi, ' ');
  // Replace anything not alphanumeric or a single space with an empty string
  simplified = simplified.replace(/[^0-9a-z ]/gi, '');
  return simplified;
}

/**
 * Should this be a constructor? Since we're returning a datatype
 * @param text
 */
function createMetrics(text) {
  if (typeof text !== 'string') {
    throw new TypeError(`Text needs to be a string, not: ${text}`);
  }
  // Count words by replacing all non-alphanumerics and whitespace with a space
  const words = simplify(text).split(' ');
  const uniqueWords = words.filter((word, index) => words.indexOf(word) === index);
  const avgWordLen = words.reduce((acc, word) => {
    return acc + (word.length / words.length);
  }, 0);
  const longWords = words.filter(word => word.length >= 6);
  const totalLetters = words.reduce((acc, word) => acc + word.length, 0);

  // Count word occurences
  const wordOccurrences = {};
  for (const word of words) {
    // If we haven't seen the word before, initialize at one
    // otherwise add one to the previous count
    wordOccurrences[word] = wordOccurrences[word] ? wordOccurrences[word] + 1 : 1;
  }

  // Build Metrics object
  const metrics = {
    wordOccurrences,
  };
  // Count letters by removing everything else and counting length
  metrics.totalLetters = totalLetters;
  metrics.totalWords = words.length;
  metrics.longWords = longWords.length;
  metrics.averageWordLength = avgWordLen;
  metrics.uniqueWords = uniqueWords.length;
  return metrics;
}

module.exports = {
  simplify,
  createMetrics,
};
