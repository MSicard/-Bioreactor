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
});

Route::group(['prefix' => 'restaurant', 'middleware' => 'auth.mid'], function () {
    Route::get('', 'RestaurantController@show');
});