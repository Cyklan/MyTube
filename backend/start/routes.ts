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

Route.get('/', async () => {
  return { hello: 'world' }
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
Route.get('admin/get-accounts', 'AdministratorController.getAccounts').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.post('admin/create-account', 'AdministratorController.createAccount').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.delete('admin/delete-account', 'AdministratorController.deleteAccount').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.patch(
  'admin/update-account-password',
  'AdministratorController.updateAccountPassword'
).middleware([Middlewares.AdministratorAuthentication])
Route.patch('admin/update-account-admin', 'AdministratorController.updateAccountAdmin').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.patch('admin/update-settings', 'AdministratorController.updateSettings').middleware([
  Middlewares.AdministratorAuthentication,
])
Route.delete('admin/delete-video', 'AdministratorController.deleteVideo').middleware([
  Middlewares.AdministratorAuthentication,
])
//#endregion
