'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register');
Route.post('/authenticate', 'AuthController.authenticate');
Route.put('/update/:id', 'AuthController.update');
Route.get('/index', 'AuthController.index').middleware(['auth']);
Route.get('/showUserByEmail/:id', 'AuthController.showUserByEmail').middleware(['auth']);
Route.get('/showUserByTipo/:id', 'AuthController.showUserByTipo').middleware(['auth']);
Route.get('/showUserByUsername/:id', 'AuthController.showUserByUsername').middleware(['auth']);
Route.delete('/delete/:id', 'AuthController.delete');
Route.resource('/files', 'FileController');
Route.resource('rotas', 'RotaController').apiOnly().middleware('auth');

Route.get('/listaCadastro', 'RotaUserController.index').middleware(['auth']);
Route.get('/listaUsuario', 'RotaUserController.listaUsuario').middleware(['auth']);
Route.post('/listaRota/:id', 'RotaUserController.listaRotas').middleware(['auth']);
Route.post('/cadastraTurista/:id', 'RotaUserController.store').middleware(['auth']);
Route.delete('/deletarCadastro/:id', 'RotaUserController.deletarCadastro').middleware(['auth']);

Route.get('/', () => 'EAE CLAUDIO KKK')
