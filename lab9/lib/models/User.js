/**
 * Created by austin on 3/31/17.
 */

const createError = require('http-errors');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');

const db = require('../../data/users.json');

const _protectedFields = ['_protectedFields', 'hashedPass'];

class User {

  constructor(userData) {
    this.id = userData._id;
    this.username = userData.username;
    this.hashedPass = userData.hashedPassword;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.profession = userData.profession;
    this.bio = userData.bio;
  }

  get returnable() {
    const data = {};
    for (const key of Object.keys(this)) {
      if (_protectedFields.indexOf(key) === -1) {
        data[key] = this[key];
      }
    }
    return data;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  verifyPassword(password) {
    return bcrypt.compare(password, this.hashedPass);
  }

  // Don't need to get that intense
  // static findOne(obj) {
  //
  // }

  static findById(id) {
    return new Promise((resolve, reject) => {
      // Linear search
      for (const userData of db) {
        if (userData._id === id) {
          return resolve(new User(userData));
        }
      }

      return reject(createError(HttpStatus.NOT_FOUND, `Can't find user with id: ${id}`));
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      // Linear search
      for (const userData of db) {
        // Case insensitive for normal unicode characters
        if (userData.username.toUpperCase() === username.toUpperCase()) {
          return resolve(new User(userData));
        }
      }

      return reject(createError(HttpStatus.NOT_FOUND, `Can't find user with username: ${username}`));
    });
  }
}

module.exports = User;
