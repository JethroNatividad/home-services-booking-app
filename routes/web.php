<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use App\Http\Middleware\CheckUserCompleted;
use App\Models\Booking;
use App\Models\Category;
use App\Models\Service;
use App\Models\User;
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
            return Inertia::render('ServiceProvider/Dashboard', [
                'services' => Service::where('user_id', Auth::id())->with(['user', 'category'])->get(),
                'categories' => Category::all()
            ]);
        }

        if (Auth::user()->role === 'admin') {
            return Inertia::render('Admin/Dashboard', [
                'services' => Service::with(['user', 'category'])->get(),
                'categories' => Category::all()
            ]);
        }
    })->name('dashboard');


    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/services/create', [ServiceController::class, 'create'])->name('services.create');
    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show');
    Route::get('/services/{service}/edit', [ServiceController::class, 'edit'])->name('services.edit');
    Route::post('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');

    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

    Route::get('/customer-bookings', [BookingController::class, 'customerIndex'])->name('customer.bookings.index');
    Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
    Route::post('/bookings/{booking}/approve', [BookingController::class, 'approve'])->name('bookings.approve');
    Route::post('/bookings/{booking}/reject', [BookingController::class, 'reject'])->name('bookings.reject');
    Route::post('/bookings/{booking}/complete', [BookingController::class, 'complete'])->name('bookings.complete');
    Route::post('/bookings/{booking}/reschedule', [BookingController::class, 'reschedule'])->name('bookings.reschedule');

    Route::get('/reviews/create/{booking}', [ReviewController::class, 'create'])->name('reviews.create');
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::get('/reviews/{serviceRating}/edit', [ReviewController::class, 'edit'])->name('reviews.edit');
    Route::put('/reviews/{serviceRating}', [ReviewController::class, 'update'])->name('reviews.update');

    Route::get('/service-provider-bookings', [BookingController::class, 'serviceProviderIndex'])->name('service_provider.bookings.index');
    Route::get('/admin-bookings', [BookingController::class, 'adminIndex'])->name('admin.bookings.index');

    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/manage-users', function () {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Admin/Users/Users', [
            'users' => User::where('id', '!=', Auth::id())->get()
        ]);
    })->name('manage-users');

    Route::post('/manage-users/{user}/ban', function (User $user) {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $user->update(['status' => "banned"]);
    })->name('ban');

    Route::post('/manage-users/{user}/unban', function (User $user) {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $user->update(['status' => "active"]);
    })->name('unban');

    Route::get('/reports', function () {
        if (Auth::user()->role !== 'service_provider') {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('ServiceProvider/Reports', [
            'bookings' => Booking::whereHas('service', function ($query) {
                $query->where('user_id', Auth::id());
            })->with(['user', 'service.user'])->orderBy('updated_at', 'desc')->get(),
        ]);
    })->name('reports.index');

    Route::get('/admin-reports', function () {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Admin/Reports', [
            'bookings' => Booking::with(['service.user', 'user', 'rating'])->orderBy('updated_at', 'desc')->get(),
        ]);
    })->name('admin.reports.index');


    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/complete-setup', function () {
        return Inertia::render('Auth/Setup/Setup');
    })->name('complete-setup');

    Route::post('/complete-setup', [
        ProfileController::class,
        'setup'
    ])->name('complete-setup');
});

Route::get('/', function () {
    return Inertia::render('Landing');
})->middleware(['guest'])->name('landing');



require __DIR__ . '/auth.php';
