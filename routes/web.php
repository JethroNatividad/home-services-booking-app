<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckUserCompleted;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', CheckUserCompleted::class])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::get('/', function () {
    return Inertia::render('Landing');
})->middleware(['guest'])->name('landing');

Route::get('/complete-setup', function () {
    return Inertia::render('Auth/Setup/Setup');
})->middleware(['auth'])->name('complete-setup');

Route::post('/complete-setup', [
    ProfileController::class,
    'setup'
])->middleware(['auth'])->name('complete-setup');


require __DIR__ . '/auth.php';
