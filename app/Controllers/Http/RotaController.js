'use strict'

const Rota = use('App/Models/Rota');
const Database = use('Database');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rotas
 */
class RotaController {
  /**
   * Show a list of all rotas.
   * GET rotas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const rota = Rota.all();
    return rota;
  }

  /**
   * Create/save a new rota.
   * POST rotas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { email } = auth.user;
    const data = request.only([
        'nome',
        'data',
        'hora',
        'duracao',
        'cidade',
        'estado',
        'avaliacao',
        'qtdturistas',
        'personalidade',
        'descricao',
        'saida',
        'link',
        'valor'
    ])

    const rota = await Rota.create({...data, user_email: email});
    return rota;
  }

  /**
   * Display a single rota.
   * GET rotas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const rota = await Database.from('rotas').where('cidade', params.id)
      return rota;
      } catch (error) {
        return response.status(404).json({
          status: 'error',
          message: 'Rota não encontrada'
        })
      }
  }


  /**
   * Update rota details.
   * PUT or PATCH rotas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth}) {
    const rota = await Rota.findOrFail(params.id);

    if(rota.user_email === auth.user.email){
      
      const data = request.only([
        'nome',
        'data',
        'hora',
        'duracao',
        'cidade',
        'estado',
        'avaliacao',
        'qtdturistas',
        'personalidade',
        'descricao',
        'saida',
        'link',
        'valor'
      ]);

      rota.merge(data);

      await rota.save();
      
      return rota;

    } else {
      return response.status(401).json({
        status: 'error',
        message: 'Não foi possivel alterar a rota'
      })
     }
  }

  /**
   * Delete a rota with id.
   * DELETE rotas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const rota = await Rota.findOrFail(params.id);
    if(rota.user_email === auth.user.email){
      await rota.delete()
      return response.status(200).json({
        status: 'Ok',
        message: 'Rota deletada com sucesso'
      })
    }else{
      return response.status(401).json({
        status: 'error',
        message: 'Você não pode deletar a rota de outro usuário'
      })
     }
  }
}

module.exports = RotaController
