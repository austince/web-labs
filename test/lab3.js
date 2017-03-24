/**
 * Created by austin on 2/6/17.
 */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {
    getFileAsJSON,
    getFileAsString,
    saveStringToFile,
    saveJSONToFile,
} = require('../lab3/fileData');
const {
    simplify,
    createMetrics,
} = require('../lab3/textMetrics');

const TEST_FILE_ROOT = 'lab3';
const TEST_FILE_PATHS = {
  chp1: `${TEST_FILE_ROOT}/chapter1.txt`,
  chp2: `${TEST_FILE_ROOT}/chapter2.txt`,
  chp3: `${TEST_FILE_ROOT}/chapter3.txt`,
  jsonFile: `${TEST_FILE_ROOT}/package.json`,
};

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.should();

describe('fileData:', () => {
  describe('getFileAsString', () => {
    it('should return a promise that evaluates to a string', () => {
      return Promise.all([
        getFileAsString(TEST_FILE_PATHS.chp1).should.eventually.be.fulfilled,
        getFileAsString(TEST_FILE_PATHS.chp1).then((data) => {
          (typeof data).should.equal('string');
        }),
      ]);
    });

    it('should reject bad file names and bad inputs', () => {
      return Promise.all([
        getFileAsString(0).should.be.rejected,
        getFileAsString('does not exist').should.be.rejected,
        getFileAsString('').should.be.rejected,
      ]);
    });
  });

  describe('getFileAsJSON', () => {
    it('should return a promise that evaluates to an obj', () => {
      return Promise.all([
        getFileAsJSON(TEST_FILE_PATHS.jsonFile).should.eventually.be.fulfilled,
        getFileAsJSON(TEST_FILE_PATHS.jsonFile).then((data) => {
          (typeof data).should.equal('object');
          data.should.have.property('version');
        }),
      ]);
    });

    it('should reject bad file names and bad inputs', () => {
      return Promise.all([
        getFileAsJSON(0).should.be.rejected,
        getFileAsJSON('does not exist').should.be.rejected,
        getFileAsJSON('').should.be.rejected,
      ]);
    });
  });

  describe('saveFileAsString', () => {
    it('should reject bad file names and bad inputs', () => {
      return Promise.all([
        saveStringToFile(0).should.be.rejected,
        saveStringToFile('not', 0).should.be.rejected,
        saveStringToFile('', 'no path').should.be.rejected,
      ]);
    });
  });

  describe('saveJSONToFile', () => {
    it('should reject bad file names and bad inputs', () => {
      return Promise.all([
        saveJSONToFile(0).should.be.rejected,
        saveJSONToFile(0, {}).should.be.rejected,
        saveJSONToFile('no object').should.be.rejected,
        saveJSONToFile('').should.be.rejected,
        saveJSONToFile('', {}).should.be.rejected,
      ]);
    });
  });
});


describe('textMetrics:', () => {
  describe('simplify', () => {
    it('should handle bad input', () => {
      expect(simplify.bind(null)).to.throw(TypeError);
    });

    it('should convert to lowercase', () => {
      (simplify('UPPERCASE')).should.equal('uppercase');
      (simplify('UppErCasE')).should.equal('uppercase');
    });

    it('should remove all non-alphanumerics', () => {
      (simplify('()*&-+U%P$P!E_RC-A?SE=#^<>/\\')).should.equal('uppercase');
    });

    it('should remove all whitespace', () => {
      (simplify('     \rUPPER\b\t  CASE\n\t')).should.equal(' upper case ');
    });
  });

  describe('createMetrics', () => {
    describe('sample input', () => {
      const INPUT = 'Hello, my friends! This is a great day to say hello.\n\n\tHello! 2 3 4 23';
      const OUTPUT = createMetrics(INPUT);

      it('should count total letters', () => {
        OUTPUT.totalLetters.should.equal(49);
      });

      it('should count total words', () => {
        OUTPUT.totalWords.should.equal(16);
      });

      it('should count long words', () => {
        OUTPUT.longWords.should.equal(1);
      });

      it('should count average word length', () => {
        OUTPUT.averageWordLength.should.equal(3.0625);
      });

      it('should count number of unique words', () => {
        OUTPUT.uniqueWords.should.equal(14);
      });

      it('should count word occurrences', () => {
        /* eslint-disable dot-notation */
        OUTPUT.wordOccurrences['hello'].should.equal(3);
        OUTPUT.wordOccurrences['my'].should.equal(1);
        OUTPUT.wordOccurrences['friends'].should.equal(1);
        OUTPUT.wordOccurrences['a'].should.equal(1);
        OUTPUT.wordOccurrences['great'].should.equal(1);
        OUTPUT.wordOccurrences['23'].should.equal(1);

        /* eslint-enable dot-notation */
      });
    });
  });
});
