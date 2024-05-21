<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TaskController;
Route::get('/', function () {
    return view('welcome');
});
Route::get('/wewe', function () {
    return ('Hello, World!');
});
Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::get('/data', function () {
    return response()->json([
        ['id' => 1, 'name' => 'John'],
        ['id' => 2, 'name' => 'Jane'],
        ['id' => 3, 'name' => 'Doe'],
    ]);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/employees', [EmployeeController::class, 'getEmployees']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::post('task/add', [TaskController::class, 'store']);
Route::put('task/edit/{id}', [TaskController::class, 'update']);
Route::delete('task/delete/{id}', [TaskController::class, 'destroy']);
