'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RotaUserSchema extends Schema {
  up () {
    this.create('rota_users', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('rota_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rota_users')
  }
}

module.exports = RotaUserSchema
