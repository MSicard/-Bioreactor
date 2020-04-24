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

Route::get('/home', function () {
    return view('layouts/app');
});

Route::get('/', 'DashboardController@home')->middleware('auth.mid');

Route::get('cb', 'SessionController@cognitoAuthCallback');

Route::group(['prefix' => 'session'], function () {
    Route::get('login', 'SessionController@login');
    Route::get('logout', 'SessionController@logout');
});

Route::group(['prefix' => 'notification', 'middleware' => 'auth.mid'], function () {
    Route::post('', 'NotificationController@send');
});

Route::group(['prefix' => 'bioreactor', 'middleware' => 'auth.mid'], function () {
    Route::post('', 'BioReactorController@send');
    Route::post('byday', 'BioReactorController@getByDay');
});

Route::group(['prefix' => 'restaurant', 'middleware' => 'auth.mid'], function () {
    Route::get('', 'RestaurantController@show');
    Route::post('', 'RestaurantController@create');
    Route::get('all', 'RestaurantController@all');
    Route::post('{restaurant}', 'RestaurantController@update');
});

Route::group(['prefix' => 'container', 'middleware' => 'auth.mid'], function () {
    Route::get('', 'ContainerController@show');
    Route::post('', 'ContainerController@create');
    Route::get('all', 'ContainerController@all');
    Route::post('{container}', 'ContainerController@update');
});

Route::group(['prefix' => 'user', 'middleware' => 'auth.mid'], function () {
    Route::get('', 'UserController@show');
    Route::post('', 'UserController@create');
    Route::get('all', 'UserController@all');
    Route::post('{user}', 'UserController@delete');
});

Route::group(['prefix' => 'report', 'middleware'=> 'auth.mid'], function () {
    Route::get('', 'ReportController@show');
});