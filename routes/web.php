<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Middleware\CheckUserCompleted;
use App\Models\Category;
use App\Models\Service;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', CheckUserCompleted::class])->group(function () {
    Route::get('/dashboard', function () {

        if (Auth::user()->role === 'customer') {
            return Inertia::render('Customer/Dashboard', [
                'services' => Service::with(['user', 'category'])->get(),
                'categories' => Category::all()
            ]);
        }

        if (Auth::user()->role === 'service_provider') {
            return Inertia::render('ServiceProvider/Dashboard');
        }

        if (Auth::user()->role === 'admin') {
            return Inertia::render('Admin/Dashboard');
        }
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
