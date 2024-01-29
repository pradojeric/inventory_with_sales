<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['check.role:admin'])->group(function () {
        Route::resource('users', UserController::class);
    });

    Route::middleware(['check.role:admin,inventory_manager'])->group(function () {
        Route::post('/categories/store', [CategoryController::class, 'store'])->name('categories.store');
        Route::post('/categories/{category}/update', [CategoryController::class, 'update'])->name('categories.update');
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::post('/products/store', [ProductController::class, 'store'])->name('products.store');
        Route::post('/products/{product}/update', [ProductController::class, 'update'])->name('products.update');

        Route::resource('stocks', StockController::class);
    });

    Route::middleware(['check.role:admin,sales'])->group(function () {
        Route::resource('sales', SaleController::class);

        Route::put('/sales/{sale}/update-status', [SaleController::class, 'updateStatus'])->name('sales.update-status');
        Route::get('/receivables', [SaleController::class, 'showReceivables'])->name('receivables');
        Route::put('/receivables/{sale}/update', [SaleController::class, 'updateReceivables'])->name('receivables.update');

    });

    Route::middleware(['check.role:admin,manager,inventory_manager'])->group(function () {
        Route::get('/report/stocks', [ReportController::class, 'productIndex'])->name('reports.stocks');
    });
    Route::middleware(['check.role:admin,manager,sales'])->group(function () {
        Route::get('/report/sales', [ReportController::class, 'saleIndex'])->name('reports.sales');
    });
});

require __DIR__ . '/auth.php';
