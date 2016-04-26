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
        return view('angular_index');
    });
    /*Route::get('/', function () {
        return view('home.index');
    });*/

Route::get('/users', [
    'middleware' => 'auth',
    'uses' => 'UsersController@index'
]);


Route::get('/users/addUser', [
    'middleware' => 'auth',
    'uses' => 'UsersController@addUser'
]);

Route::post('/users/addUser', [
    'middleware' => 'auth',
    'uses' => 'UsersController@addUser'
]);

Route::get('/users/destroy', [
    'middleware' => 'auth',
    'uses' => 'UsersController@destroy'
]);

Route::get('/users/create', [
    'middleware' => 'auth',
    'uses' => 'UsersController@create'
]);

Route::get('/users/show/{id}', [
    'middleware' => 'auth',
    'uses' => 'UsersController@show'
]);

Route::get('/users/edit/{id}', [
    'middleware' => 'auth',
    'uses' => 'UsersController@edit'
]);



// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');