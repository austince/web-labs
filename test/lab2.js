const assert = require('assert');
const stdout = require('test-console').stdout;
const printShapes = require('../lab2/printShapes');

describe('PrintShapes:', () => {
  describe('triangle', () => {
    it('should throw an error when lines less than 1', () => {
      assert.throws(printShapes.triangle.bind(null, -1), 'Threw error!');
    });

    it('should throw an error when lines is not an integer', () => {
      assert.throws(printShapes.triangle.bind(null, 'string'), 'Threw error!');
      assert.throws(printShapes.triangle.bind(null, 7.5), 'Threw error!');
      assert.throws(printShapes.triangle.bind(null, true), 'Threw error!');
    });

    it('should print triangles to the console', () => {
      const output = stdout.inspectSync(printShapes.triangle.bind(null, 1));
      assert.deepEqual(output,
          ['/\\\n']);
    });
  });

  describe('square', () => {
    it('should throw an error when lines less than 2', () => {
      assert.throws(printShapes.square.bind(null, -1), 'Threw error!');
      assert.throws(printShapes.square.bind(null, 1), 'Threw error!');
    });

    it('should throw an error when lines is not an integer', () => {
      assert.throws(printShapes.square.bind(null, 'string'), 'Threw error!');
      assert.throws(printShapes.square.bind(null, 7.5), 'Threw error!');
      assert.throws(printShapes.square.bind(null, true), 'Threw error!');
    });

    it('should print squares to the console', () => {
      const output = stdout.inspectSync(printShapes.square.bind(null, 2));
      assert.deepEqual(output,
          ['|--|\n', '|--|\n']);
    });
  });

  describe('rhombus', () => {
    it('should throw an error when lines less than 2', () => {
      assert.throws(printShapes.rhombus.bind(null, -1), 'Threw error!');
      assert.throws(printShapes.rhombus.bind(null, 1), 'Threw error!');
    });

    it('should throw an error when lines not even', () => {
      assert.throws(printShapes.rhombus.bind(null, 0), 'Threw error!');
      assert.throws(printShapes.rhombus.bind(null, 1), 'Threw error!');
      assert.throws(printShapes.rhombus.bind(null, 3), 'Threw error!');
      assert.throws(printShapes.rhombus.bind(null, 357), 'Threw error!');
    });

    it('should throw an error when lines is not an integer', () => {
      assert.throws(printShapes.rhombus.bind(null, 'string'), 'Threw error!');
      assert.throws(printShapes.rhombus.bind(null, 7.5), 'Threw error!');
      assert.throws(printShapes.rhombus.bind(null, true), 'Threw error!');
    });

    it('should print rhombi to the console', () => {
      const output = stdout.inspectSync(printShapes.rhombus.bind(null, 2));
      assert.deepEqual(output,
          ['/-\\\n', '\\-/\n']);
    });
  });
});
