/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { Middlewares } from 'App/Middleware'
import { hashPassword } from 'App/utils/hashPassword'

Route.get('/', async () => {
  return { hello: await hashPassword('startPw+1') }
})

Route.get('/auth', async () => {
  return { hello: 'world' }
}).middleware([Middlewares.Authentication])

Route.get('/admin-auth', async () => {
  return { hello: 'world' }
}).middleware([Middlewares.AdministratorAuthentication])

//#region Authentication routes
Route.post('login', 'AuthenticationController.login')
Route.post('register', 'AuthenticationController.register')
//#endregion

//#region Admin routes
Route.get('admin/get-users', 'AdministratorController.getUsers').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.post('admin/create-user', 'AdministratorController.createUser').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.delete('admin/delete-user', 'AdministratorController.deleteUser').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.patch('admin/update-user-password', 'AdministratorController.updateUserPassword').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.patch('admin/update-user-admin', 'AdministratorController.updateUserAdmin').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.patch('admin/update-settings', 'AdministratorController.updateSettings').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.delete('admin/delete-video', 'AdministratorController.deleteVideo').middleware([
  Middlewares.AdministratorAuthentication,
])
//#endregion

//#region
Route.get('user', 'UserController.get')
Route.patch('user/subscribe', 'UserController.subscribe').middleware([Middlewares.Authentication])
Route.patch('user/unsubscribe', 'UserController.unsubscribe').middleware([
  Middlewares.Authentication,
])
Route.patch('user/update-password', 'UserController.updatePassword').middleware([
  Middlewares.Authentication,
])
Route.delete('user/delete', 'UserController.delete').middleware([Middlewares.Authentication])
//#endregion
