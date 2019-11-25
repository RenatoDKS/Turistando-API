'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Drive = use('Drive');
const File = use('App/Models/File');

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Show a list of all files.
   * GET files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

 

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
     request.multipart.file('image', {}, async file  => {
      
try {
  const ContentType = file.headers['content-type']
  const ACL = 'public-read'
  const Key =  `${(Math.random() * 100).toString(32)}-${file.clientName}`

  const url = await Drive.put(Key, file.stream, {
    ContentType,
    ACL
  })

  await File.create({
    name: file.clientName,
    key: Key,
    url,
    content_type: ContentType
  })
} catch (err) {
  return response.status(err.status).json({
    error:{
      message: "Não foi possivel enviar o arquivo",
      err_message: err.message
    }
  })
}
    }).process()
  }

  /**
   * Display a single file.
   * GET files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const { id: name } = params;

    try {
      const file = await File.findByOrFail('name', name);

      response.implicitEnd = false;

      const stream = await Drive.getStream(file.key);
      
      stream.pipe(response.response);
      response.header('Content-Type', file.content_type);
    } catch (err) {
      return response.status(err.status).json({
        error:{
          message: "Arquivo não existe",
          err_message: err.message
        }
      })
    } 
  }

  /**
   * Update file details.
   * PUT or PATCH files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a file with id.
   * DELETE files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const { id: name } = params;

    try {
      const file = await File.findByOrFail('name', name);

      await Drive.delete(file.key);
      
      await file.delete();
      
    } catch (err) {
      return response.status(err.status).json({
        error:{
          message: "Arquivo não existe e não pôde ser deletado",
          err_message: err.message
        }
      })
    } 
  }

  }


module.exports = FileController
