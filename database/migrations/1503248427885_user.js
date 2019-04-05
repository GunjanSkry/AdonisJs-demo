'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().unique()
      table.string('username', 80).notNullable()
      table.string('email', 254).notNullable()
      table.bigInteger('phone').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
