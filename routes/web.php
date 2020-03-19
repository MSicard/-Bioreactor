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

Route::get('/', function () {
    return view('layouts/app');
});

Route::get('/home', function () {
    return view('welcome');
})->middleware('auth.mid');

Route::get('cb', 'SessionController@cognitoAuthCallback');

Route::group(['prefix' => 'session'], function () {
    Route::get('login', 'SessionController@login');
    Route::get('logout', 'SessionController@logout');
});