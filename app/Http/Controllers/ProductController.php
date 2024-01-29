<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Configurations/Products/Index', [
            'categories' => Category::orderBy('name')->get(),
            'products' => Product::orderBy('category_id')->orderBy('name')->get(),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required'],
            'category_id' => ['required'],
            'variant_id' => ['nullable'],
            'quantity' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'retail_price' => ['required', 'numeric'],
            'wholesale_price' => ['required', 'numeric'],
            'description' => ['required'],
        ]);

        Product::create($validatedData);

        session()->flash('message', 'Success');

    }

    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => ['required'],
            'category_id' => ['required'],
            'variant_id' => ['nullable'],
            'quantity' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'retail_price' => ['required', 'numeric'],
            'wholesale_price' => ['required', 'numeric'],
            'description' => ['required'],
        ]);

        $product->update($validatedData);

        session()->flash('message', 'Success');
    }
}
