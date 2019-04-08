"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  todos() {
    return this.hasMany("App/Models/Todo", "user_id");
  }
}

module.exports = User;
