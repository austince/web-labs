/**
 * Created by austin on 2/12/17.
 * @suggestion Since this is a 'todo' module, maybe the functions should just be
 * names 'create', 'getAll', 'get', ... etc
 * So when you import it is cleaner.
 * Also, Promises should be chained whenever possible.
 */

const uuid = require('uuid');
const getCollectionFn = require('./mongo/collection').getCollectionFn;

const getCollection = getCollectionFn('todoItems');

class Todo {
  constructor(data) {
    this._id = data._id;
    this.title = data.title || '';
    this.description = data.description || '';
    this.completed = data.completed || false;
    this.completedAt = data.completedAt || null;
  }

  static fromData(data) {
    return new Todo(data);
  }

  // Methods for querying here...
}

function getAllTasks() {
  return getCollection()
      .then((collection) => {
        return collection.find();
      })
      .then((cursor) => {
        return cursor.toArray();
      })
      .then((todoArray) => {
        return todoArray.map(Todo.fromData);
      });
}

/**
 *
 * @param {string} id
 */
function getTask(id) {
  if (!id) {
    return Promise.reject('Need to provide an id');
  }

  return getCollection()
      .then((collection) => {
        return collection.findByUsername({ _id: id });
      }).then(Todo.fromData);
}

/**
 * Returns promise to a newly created todo item
 * @param title
 * @param description
 */
function createTask(title, description) {
  if (!title || typeof title !== 'string') {
    return Promise.reject('Must provide a string title');
  }

  if (!description || typeof description !== 'string') {
    return Promise.reject('Must provide a string description.');
  }

  return getCollection()
      .then((collection) => {
        const task = new Todo({
          _id: uuid(),
          title,
          description,
        });

        return collection.insertOne(task);
      })
      .then((resultData) => {
        if (resultData.insertedCount !== 1) {
          throw `Error inserting task: ${title}`;
        }

        return getTask(resultData.insertedId);
      });
}

/**
 *
 * @param id
 * @return {*}
 */
function completeTask(id) {
  if (!id) {
    return Promise.reject('Need to provide an id');
  }

  return getCollection().then((collection) => {
    return collection.updateOne(
        { _id: id },
      { $set: {
        completed: true,
        completedAt: new Date(),
      },
      });
  });
}

function removeTask(id) {
  if (!id) {
    return Promise.reject('Need to provide an id');
  }

  return getCollection()
      .then((collection) => {
        return collection.removeOne({ _id: id });
      }).then((resultData) => {
        if (resultData.deletedCount === 0) {
          throw `Could not delete dog with id of ${id}`;
        }
      });
}


module.exports = {
  createTask,
  getTask,
  getAllTasks,
  completeTask,
  removeTask,
};
