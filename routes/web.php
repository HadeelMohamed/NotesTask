<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/{any}', function () {
  return view('welcome');
})->where('any', '.*');

Route::prefix('vue')->group(function(){
Route::post('checkEmailUser', 'ValidationController@checkEmailUser');
Route::post('checkUsername', 'ValidationController@checkUsername');

 Route::post('login', 'Api\AuthController@login');
 Route::post('register', 'Api\AuthController@register');
 // Route::group(['middleware' => 'auth:api'], function(){
 // Route::post('getUser', 'Api\AuthController@getUser');
 // });
  Route::middleware('auth:api')->group(function () {
        Route::get('/logout', 'Api\AuthController@logout');
    });
});
