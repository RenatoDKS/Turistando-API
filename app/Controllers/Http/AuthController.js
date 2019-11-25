'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  async register({ request }){
   const data = request.only([
     'username',
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
     'idade'
    ]);

    const user = await User.create(data);
    
    return user;
  }

  async authenticate({ request, auth }){
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;

  }

  async update({ params, request, response, auth }){
    const user = await User.findOrFail(params.id);

    if(auth.user.id == params.id){

    const data = request.only([
      'username',
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
      'idade'
    ]);

    user.merge(data);

    await user.save();

    return user;
    }

    else{
     return response.status(400).json({
       status: 'error',
       message: 'Você não pode alterar dados de outro usuário'
     })
    }
  }


async index(){
  const user = await User.all();
  return user;
}

async show({ params, response }){
  try {
  const user = await User.findOrFail(params.id);
  return user;
  } catch (error) {
    return response.status(404).json({
      status: 'error',
      message: 'Usuário não encontrado'
    })
  }
  
}

}
     

module.exports = AuthController
