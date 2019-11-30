<?php

use Illuminate\Http\Request;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group(['prefix' => 'vue'], function() {
Route::post('checkEmailUser', 'ValidationController@checkEmailUser');
Route::post('checkUsername', 'ValidationController@checkUsername');

 Route::post('login', 'Api\AuthController@login');
 Route::post('register', 'Api\AuthController@register');
});
 

Route::group(['prefix' => 'vue',  'middleware' => 'auth:api'], function() {

Route::get('note', 'NoteController@index');
    Route::post('note', 'NoteController@store');
    Route::put('note/{id}', 'NoteController@update');
    Route::delete('note/{id}', 'NoteController@delete');
    Route::get('/logout', 'Api\AuthController@logout');
    });


