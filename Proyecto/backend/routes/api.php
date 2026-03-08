<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use Illuminate\Support\Facades\Route;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Rutas protegidas (requieren token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Citas
    Route::get('/horarios',           [AppointmentController::class, 'horarios']);
    Route::post('/citas',             [AppointmentController::class, 'store']);
    Route::get('/citas/mis-citas',    [AppointmentController::class, 'misCitas']);
    Route::put('/citas/{id}/cancelar',[AppointmentController::class, 'cancelar']);

    // Solo doctor
    Route::get('/citas/todas',           [AppointmentController::class, 'todasLasCitas']);
    Route::put('/citas/{id}/estado',     [AppointmentController::class, 'cambiarEstado']);
});