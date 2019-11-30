'use strict'

const RotaUser = use('App/Models/RotaUser')
const Rota = use('App/Models/Rota')
const Database = use('Database')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rotausers
 */
class RotaUserController {
  /**
   * Show a list of all rotausers.
   * GET rotausers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const rotaUser = RotaUser.all()
    return rotaUser;
  }


  /**
   * Create/save a new rotauser.
   * POST rotausers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {
    const user_id = auth.user.id;
    let rota_id = await Database.from('rotas').where('id', params.id)
    rota_id = rota_id[0].id;
    if(rota_id.length === 0 && rota_id[0].id !== params.id){
      return response.status(404).json({
        status: 'error',
        message: 'Rota não encontrada'
      })
    } else {
      const rotaUser = await RotaUser.create({ user_id, rota_id});
      return rotaUser;
    }
    
  }

  async listaUsuario({ auth, response }){

  const user_id = auth.user.id;
  try {
    const rota = await Database.from('rota_users').where('user_id', user_id)
    return rota;
    } catch (error) {
      return response.status(404).json({
        status: 'error',
        message: 'Cadastro não encontrado'
      })
    }
  }

  async listaRotas({ params, response }){

    const rota_id = await Database.from('rota_users').where('rota_id', params.id)

    if(rota_id.length === 0){
      return response.status(404).json({
        status: 'error',
        message: 'Rota não encontrada'
      })
    } else {
      return rota_id;
    }
  }

  async deletarCadastro({ params, response, auth }){

    const user = auth.user.id
    const rota_id = await Database.from('rota_users').where('rota_id', params.id)
    const rota = rota_id[0].id 
    if(rota_id.length === 0){
      return response.status(404).json({
        status: 'error',
        message: 'Rota não encontrada'
      })
    } else {
      await Database.from('rota_users').where({ user_id: user, rota_id: rota }).delete()
      response.status(200).json({
        status: 'ok',
        message: 'Usuário deletado com sucesso'
      })
    }
  }


}

module.exports = RotaUserController
