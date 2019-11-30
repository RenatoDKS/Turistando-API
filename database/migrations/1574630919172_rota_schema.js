'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RotaSchema extends Schema {
  up () {
    this.create('rotas', (table) => {
      table.increments()
      table
        .string('user_email')
        .unsigned()
        .notNullable()
        .references('email')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('nome', 60).notNullable()
      table.string('data', 12).notNullable()
      table.string('hora', 6).notNullable()
      table.string('duracao', 6).notNullable()
      table.string('cidade', 60).notNullable()
      table.string('estado', 60).notNullable()
      table.string('avaliacao', 2).notNullable() 
      table.float('qtdturistas', 5).notNullable()
      table.string('personalidade', 40).notNullable()
      table.string('descricao', 254).notNullable()
      table.string('saida', 60).notNullable()
      table.string('link', 200).notNullable().unique()
      table.float('valor', 6).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('rotas')
  }
}

module.exports = RotaSchema
