<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    public function index()
    {
        return Inertia::render('Configurations/Index', [
            'categories' => Category::all(),
        ]);
    }
}
