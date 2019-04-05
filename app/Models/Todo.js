'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Todo extends Model {

    user () {
        // defining relationship with todo table
        return this.belongsTo('App/Models/Todo', 'user_id')
    }
}

module.exports = Todo
