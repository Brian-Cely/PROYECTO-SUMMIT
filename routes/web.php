<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'index');
Route::view('/destinos', 'destinos');
Route::view('/paquetes', 'paquetes');
Route::view('/constructor-paquete', 'constructor-paquete');
Route::view('/nosotros', 'nosotros');
Route::view('/contactanos', 'contactanos');
Route::view('/login', 'auth.login');
Route::view('/registro', 'auth.registro');
Route::view('/recuperar', 'auth.recuperar');
Route::view('/dashboard/admin', 'dashboards.admin');
Route::view('/dashboard/cliente', 'dashboards.cliente');
Route::view('/dashboard/proveedor', 'dashboards.proveedor');
