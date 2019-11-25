'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('telefone', 14).notNullable()
      table.string('bairro', 80).notNullable()
      table.string('cidade', 80).notNullable()
      table.string('personalidade', 60).notNullable()
      table.string('tipo', 60).notNullable()
      table.string('hotel', 60)
      table.string('disp', 60)
      table.float('avaliacao', 5)
      table.string('bio', 254)
      table.string('idade', 3).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
