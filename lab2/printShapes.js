/**
 * Created by austin on 1/27/17.
 */

/**
 * Type checks for errors common to all shapes
 * @param {int} lines
 * @param lineFunc
 */
function logShape(lines, lineFunc) {
  if (!Number.isInteger(lines)) {
    throw new TypeError(`${lines} is not an integer.`);
  } else if (lines < 0) {
    throw new TypeError('Lines must be positive.');
  }

  for (let line = 1; line <= lines; line++) {
    console.log(lineFunc(line));
  }
}

/**
 *
 * @param {int} lines
 */
function triangle(lines) {
  logShape(lines, (line) => {
    let lineStr = ' '.repeat(lines - line);
    lineStr += '/';
    // Fill spaces between edges with - when the last line
    const filler = (line === lines) ? '-' : ' ';
    lineStr += filler.repeat((line - 1) * 2);
    lineStr += '\\';
    return lineStr;
  });
}

/**
 *
 * @param {int} lines
 */
function square(lines) {
  if (lines < 2) {
    throw new TypeError('Squares must have at least 2 lines.');
  }

  logShape(lines, (line) => {
    let lineStr = '|';
    // Fill spaces between edges with - when the last line
    const filler = (line === lines || line === 1) ? '-' : ' ';
    lineStr += filler.repeat(lines);
    lineStr += '|';
    return lineStr;
  });
}

/**
 *
 * @param {int} lines
 */
function rhombus(lines) {
  if (lines < 2) {
    throw new TypeError('Rhombi must have at least 2 lines.');
  } else if (lines % 2 !== 0) {
    throw new TypeError('Rhombi must have an even number of lines.');
  }

  const halfLine = lines / 2;

  logShape(lines, (line) => {
    let adjLine = line;
    let startBrace = '/';
    let endBrace = '\\';
    let fillLen = 1 + (2 * (line - 1));
    const filler = (line === lines || line === 1) ? '-' : ' ';

    if (line > halfLine) {
      adjLine--;
      startBrace = '\\';
      endBrace = '/';
      fillLen = 1 + (2 * (lines - line));
    }

    let lineStr = ' '.repeat(Math.abs(adjLine - halfLine));
    lineStr += startBrace;
    lineStr += filler.repeat(fillLen);
    lineStr += endBrace;

    return lineStr;
  });
}

module.exports = {
  triangle,
  square,
  rhombus,
};
