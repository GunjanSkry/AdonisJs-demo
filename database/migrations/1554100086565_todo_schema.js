'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodoSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable()
      table.text('todo').notNullable()
      table.timestamps()
      table.foreign('user_id').references('users.user_id').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('todos')
  }
}

module.exports = TodoSchema
