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
Route.put('/update/:id', 'AuthController.update').middleware(['auth']);
Route.get('/index', 'AuthController.index').middleware(['auth']);
Route.get('/show/:id', 'AuthController.show').middleware(['auth']);

Route.resource('/files', 'FileController')