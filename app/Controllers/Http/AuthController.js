'use strict'

const User = use('App/Models/User')
const Rota = use('App/Models/Rota')
const Hash = use('Hash')
const Database = use('Database')

class AuthController {
  async register({ request, response }){
   const data = request.only([
     'name',
     'lastName',
     'email', 
     'password',
     'telefone',
     'bairro',
     'cidade',
     'personalidade',
     'tipo',
     'hotel',
     'disp',
     'avaliacao',
     'bio',
     'idade',
     'cpf',
     'cnpj'
    ]);
    

    const user = await User.create(data);
    
    return user;
  }

  async authenticate({ request, auth }){
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;

  }

  async update({ params, request, response }){
    const user = await User.findOrFail(params.id);

    

    const data = request.only([
      'name',
      'lastName',
      'email', 
      'password',
      'telefone',
      'bairro',
      'cidade',
      'personalidade',
      'tipo',
      'hotel',
      'disp',
      'avaliacao',
      'bio',
      'idade',
      'cpf',
      'cnpj'
    ]); 

    user.merge(data);

    await user.save();

    return user;
  
  }

async index(){
  const user = await User.all();
  return user;
}

async showUserByEmail({ params, response }){
  try {
  const user = await User.findByOrFail('email',params.id);
  return user;
  } catch (error) {
    return response.status(404).json({
      status: 'error',
      message: 'Usuário não encontrado'
    })
  }
}

async showUserByTipo({ params, response }){
  try {
  const user = await Database.from('users').where('tipo', params.id)
  return user;
  } catch (error) {
    return response.status(404).json({
      status: 'error',
      message: 'Usuário não encontrado'
    })
  }
}

async showUserByUsername({ params, response }){
  try {
  const user = await User.findByOrFail('name', params.id);
  return user;
  } catch (error) {
    return response.status(404).json({
      status: 'error',
      message: 'Usuário não encontrado'
    })
  }
}

async delete({ params, response }){
  const user = await User.findOrFail(params.id);

  
    await user.delete()

  }

}
     

module.exports = AuthController
