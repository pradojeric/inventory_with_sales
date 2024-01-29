<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {
        return Inertia::render('Stock/Index', [
            'stocks' => Stock::with(['stockProducts.product'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Stock/Create', [
            'control_no' => str_pad(Stock::get()->count() + 1, 8, "0", STR_PAD_LEFT),
            'categories' => Category::all(),
            'products' => Product::with(['category'])->get(),
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->items);
        $request->validate([
            'delivery_date' => ['required', 'date'],
            'items' => ['required'],
        ]);

        DB::beginTransaction();

        $stock = Stock::create([
            'control_no' => $request->control_no,
            'delivery_date' => $request->delivery_date,
        ]);

        foreach ($request->items as $item) {
            $product = Product::find($item['productItem']['id']);
            $product->increment('quantity', $item['quantity']);

            $data[] = [
                'product_id' => $item['productItem']['id'],
                'quantity' => $item['quantity'],
            ];
        }

        $stock->stockProducts()->createMany($data);

        DB::commit();

        return redirect()->route('stocks.index');
    }
}
