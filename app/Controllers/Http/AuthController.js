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
    
    const verificaEmail = await Database.from('users').where('email', data.email)
    if(verificaEmail){
      return response.status(500).json({ status: "erro", message: "Email já cadastrado"}) ;
    }

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

    else{
     return response.status(401).json({
       status: 'error',
       message: 'Você não pode alterar dados de outro usuário'
     })
    }
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

async delete({ params, response, auth }){
  const user = await User.findOrFail(params.id);

  if(auth.user.id == params.id){
    await user.delete()
    return response.status(200).json({
      status: 'Ok',
      message: 'Usuário deletado com sucesso'
    })
  }else{
    return response.status(401).json({
      status: 'error',
      message: 'Você não pode deletar outro usuário'
    })
   }
}

}
     

module.exports = AuthController
