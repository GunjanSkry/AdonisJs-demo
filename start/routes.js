'use strict'

const StoreUser = require('../app/Jobs/StoreUser');
const StoreTodo = require('../app/Jobs/StoreTodo');
const { Register } = require('../config/prometheus');


/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

StoreUser.start()
StoreTodo.start()

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/todo', 'TodoController.create')
Route.get('/todo', 'TodoController.show')

Route.post('/redis', 'RedisTestController.create')
Route.get('/redis', 'RedisTestController.show')

Route.post('/s3', 'S3TestController.create')
Route.get('/s3', 'S3TestController.show')

Route.get('/metrics', ({ request, response }) => {
    response.header('Content-Type', Register.contentType);
    response.send(Register.metrics());
})