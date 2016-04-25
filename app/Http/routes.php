<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('home.index');
});
Route::get('/users','UsersController@index');
Route::get('/users/create','UsersController@create');
//Route::get('/users/edit/{id}','UsersController@edit');
Route::get('/users/show/{id}','UsersController@show');
Route::get('/users/destroy','UsersController@destroy');
Route::post('/users/addUser','UsersController@addUser');


Route::get('/users/edit/{id}', [
    'middleware' => 'auth',
    'uses' => 'UsersController@edit'
]);



// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');