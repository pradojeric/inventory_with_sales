<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $from = $request->has('from') ? $request->from : date('Y-m-d');
        $to = $request->has('to') ? $request->to : date('Y-m-d');
        $status = $request->status ? $request->status : 'all';

        $sales = Sale::withTrashed()->where(function ($query) use ($from, $to) {
            $query->whereDate('sale_date', '>=', $from)
                ->whereDate('sale_date', '<=', $to);
        })->when($status != 'all', function ($query) use ($status) {
            $query->where('status', $status);
        })->orderByDesc('created_at')->get();

        $inputs = [
            'from' => $from,
            'to' => $to,
            'status' => $status,
        ];

        return Inertia::render('Sale/SaleIndex', [
            'sales' => $sales,
            'inputs' => $inputs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::with(['products' => function ($query) {
            $query->orderBy('name');
        }])->get();

        if ($categories->count() < 1) {
            session()->flash('message', 'Please add a product!');
            return redirect()->route('products.index');
        }

        return Inertia::render('Sale/SaleCreate', [
            'order_no' => str_pad(Sale::withTrashed()->get()->count() + 1, 8, "0", STR_PAD_LEFT),
            'categories' => $categories,
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'order_no' => ['required'],
            'customer_name' => ['nullable'],
            'customer_address' => ['nullable'],
            'orders' => ['required', 'array'],
            'payment_method' => ['required'],
            'cash_received' => ['required', 'numeric', 'min:0'],
            'change_amount' => ['required', 'numeric', 'min:0'],
            'sale_date' => ['required', 'date'],
            'reference_no' => ['required_if:payment_method,gcash', 'required_if:payment_method,cheque', 'nullable'],
            'due_date' => ['required_if:payment_method,account_receivable', 'nullable', 'date'],
        ]);

        DB::beginTransaction();

        $totalAmount = 0;

        foreach ($request->orders as $order) {
            if (isset($order['hasDiscount']) && $order['hasDiscount']) {
                $productsPrice = (($order['totalQuantity'] - $order['quantityDiscounted']) * $order['newPrice']) + ($order['discountPerItem'] * $order['quantityDiscounted']);
            } else {
                $productsPrice = (($order['totalQuantity']) * $order['newPrice']);
            }

            $totalAmount += $productsPrice;

            $data[] = [
                'product_id' => $order['id'],
                'unit_price' => $order['newPrice'],
                'quantity' => $order['totalQuantity'],
                'has_discount' => isset($order['hasDiscount']) && $order['hasDiscount'],
                'quantity_discounted' => isset($order['quantityDiscounted']) ? $order['quantityDiscounted'] : 0,
                'discount_per_item' => isset($order['discountPerItem']) ? $order['discountPerItem'] : 0,
                'total_discount' => isset($order['quantityDiscounted']) ? (($order['totalQuantity']) * $order['newPrice']) - ($order['discountPerItem'] * $order['quantityDiscounted']) : 0,
                'total_price' => $productsPrice,
            ];

            Product::find($order['id'])->update(['quantity' => $order['quantity']]);
        }

        $sale = Sale::create([
            'order_no' => $request->order_no,
            'customer_name' => $request->customer_name,
            'customer_address' => $request->customer_address,
            'payment_type' => $request->payment_method,
            'cash_received' => $request->cash_received,
            'total_amount' => $totalAmount,
            'change_amount' => $request->change_amount,
            'paid' => $request->payment_method != 'account_receivable',
            'paid_on' => $request->payment_method == 'account_receivable' ? null : now(),
            'sale_date' => $request->sale_date,
            'reference_no' => $request->reference_no,
            'user_id' => Auth::id(),
            'due_date' => $request->due_date,
        ]);

        $sale->saleItems()->createMany($data);

        DB::commit();

        session()->flash('message', 'Success');

        return redirect()->route('sales.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        return Inertia::render('Sale/SaleView', [
            'sale' => $sale->load(['saleItems.product.variant']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        // dd($sale);
        $sale->update(['cancelled_by' => Auth::id()]);
        foreach ($sale->saleItems as $saleItem) {
            Product::find($saleItem->product_id)->increment('quantity', $saleItem->quantity);
        }

        $sale->saleItems()->delete();
        $sale->delete();

        session()->flash('message', 'Success');

        return back();
    }

    public function showReceivables(Request $request)
    {
        $from = $request->has('from') ? $request->from : date('Y-m-d');
        $to = $request->has('to') ? $request->to : date('Y-m-d');

        $sales = Sale::where('payment_type', 'account_receivable')->where(function ($query) use ($from, $to) {
            $query->whereDate('sale_date', '>=', $from)
                ->whereDate('sale_date', '<=', $to);
        })->orderBy('paid')->orderByDesc('created_at')->get();

        $inputs = [
            'from' => $from,
            'to' => $to,
        ];

        return Inertia::render('Receivables/Index', [
            'sales' => $sales,
            'inputs' => $inputs,
        ]);
    }

    public function updateReceivables(Request $request, Sale $sale)
    {
        $request->validate([
            'payment_method' => ['required'],
            'reference_no' => ['required_if:payment_method,gcash', 'required_if:payment_method,cheque', 'nullable'],
            'paid_date' => ['required', 'date'],
        ]);

        $sale->update([
            'payment_type' => $request->payment_method,
            'reference_no' => $request->reference_no,
            'paid_on' => $request->paid_date,
            'paid' => 1,
        ]);

        session()->flash('message', 'Success');

        return back();
    }

    public function updateStatus(Request $request, Sale $sale)
    {

        $request->validate([
            'status' => ['required'],
        ]);

        $sale->update([
            'status' => $request->status,
        ]);

        return back();
    }
}
