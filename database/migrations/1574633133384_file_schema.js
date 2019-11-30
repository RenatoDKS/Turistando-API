'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table
        .integer('rota_id')
        .unsigned()
        .references('id')
        .inTable('rotas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name')
      table.string('key')
      table.string('url')
      table.string('content_type')

      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
