<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function productIndex(Request $request)
    {
        $date = $request->has('date') ? $request->date : date('Y-m-d');
        $endDate = $request->has('endDate') ? $request->endDate : date('Y-m-d');
        $month = $request->has('month') ? $request->month : date('m');
        $year = $request->has('year') ? $request->year : date('Y');
        $selectedReport = $request->has('selectedReport') ? $request->selectedReport : null;

        $products = Product::query();

        if ($selectedReport == 1) {

            $products = $products->with([
                'saleItems' => function ($query) use ($date) {
                    $query->whereHas('sale', function ($q) use ($date) {
                        $q->whereDate('sale_date', $date);
                    });
                },
                'stockProducts' => function ($query) use ($date) {
                    $query->whereHas('stock', function ($q) use ($date) {
                        $q->whereDate('delivery_date', $date);
                    });
                }]);
        }

        if ($selectedReport == 2) {
            $products = $products->with([
                'saleItems' => function ($query) use ($month, $year) {
                    $query->whereHas('sale', function ($q) use ($month, $year) {
                        $q->whereMonth('sale_date', ($month + 1))->whereYear('sale_date', $year);
                    });
                },
                'stockProducts' => function ($query) use ($month, $year) {
                    $query->whereHas('stock', function ($q) use ($month, $year) {
                        $q->whereMonth('delivery_date', ($month + 1))->whereYear('delivery_date', $year);
                    });
                }]);
        }

        if ($selectedReport == 3) {
            $products = $products->with([
                'saleItems' => function ($query) use ($year) {
                    $query->whereHas('sale', function ($q) use ($year) {
                        $q->whereYear('sale_date', $year);
                    });
                },
                'stockProducts' => function ($query) use ($year) {
                    $query->whereHas('stock', function ($q) use ($year) {
                        $q->whereDate('delivery_date', $year);
                    });
                }]);
        }

        if ($selectedReport == 4) {

            $products = $products->with([
                'saleItems' => function ($query) use ($date, $endDate) {
                    $query->whereHas('sale', function ($q) use ($date, $endDate) {
                        $q->whereDate('sale_date', '>', $date)->whereDate('sale_date', '<=', $endDate);
                    });
                },
                'stockProducts' => function ($query) use ($date, $endDate) {
                    $query->whereHas('stock', function ($q) use ($date, $endDate) {
                        $q->whereDate('delivery_date', $date)->whereDate('delivery_date', '<=', $endDate);
                    });

                }]);
        }

        $products = $products->get()->map(function ($product) {
            $category = $product->category;
            $prod = [];

            $name = $product->product_name;
            $itemSold = $product->saleItems->sum('quantity');
            $deliveredItem = $product->stockProducts->sum('quantity');
            $remaining = $product->quantity;

            $prod = [
                'name' => $name,
                'category' => $category,
                'delivered_item' => $deliveredItem,
                'item_sold' => $itemSold,
                'remaining' => $remaining,
            ];

            return $prod;
        })->groupBy(function ($cat) {
            return ['id' => $cat['category']->id];
        })->map(function ($cat) {

            $category = $cat->pluck('category')->first()->toArray();
            $category['products'] = $cat;

            return $category;
        });
        // dd(Category::all());
        // dd($products);

        return Inertia::render('Reports/Products', [
            'categories' => $products->values()->all(),
        ]);
    }

    public function saleIndex(Request $request)
    {
        $date = $request->has('date') ? $request->date : date('Y-m-d');
        $endDate = $request->has('endDate') ? $request->endDate : date('Y-m-d');
        $month = $request->has('month') ? $request->month : date('m');
        $year = $request->has('year') ? $request->year : date('Y');
        $selectedReport = $request->has('selectedReport') ? $request->selectedReport : null;

        // dd($date);
        $categories = Category::query();

        if ($selectedReport == 1) {

            $categories = $categories->with(['products.saleItems' => function ($query) use ($date) {
                $query->whereHas('sale', function ($q) use ($date) {
                    $q->whereDate('sale_date', $date);
                });
            }]);
        }

        if ($selectedReport == 2) {
            $categories = $categories->with(['products.saleItems' => function ($query) use ($month, $year) {
                $query->whereHas('sale', function ($q) use ($month, $year) {
                    $q->whereMonth('sale_date', ($month + 1))->whereYear('sale_date', $year);
                });
            }]);
        }

        if ($selectedReport == 3) {
            $categories = $categories->with(['products.saleItems' => function ($query) use ($year) {
                $query->whereHas('sale', function ($q) use ($year) {
                    $q->whereYear('sale_date', $year);
                });
            }]);
        }

        if ($selectedReport == 4) {

            $categories = $categories->with(['products.saleItems' => function ($query) use ($date, $endDate) {
                $query->whereHas('sale', function ($q) use ($date, $endDate) {
                    $q->whereDate('sale_date', '>', $date)->whereDate('sale_date', '<=', $endDate);
                });
            }]);
        }

        $categories = $categories->orderBy('name')->get();

        // dd($categories->toArray());
        $categories = $categories->map(function ($category) {
            $prods = [];

            foreach ($category->products as $product) {
                if ($product->saleItems->count() < 1) {
                    continue;
                }

                $prods[] = [
                    'product_name' => $product->product_name,
                    'quantity' => $product->saleItems->sum('quantity'),
                    'total_price' => $product->saleItems->sum('total_price'),
                    'total_cash' => $product->saleItems->sum(function ($sI) {
                        if ($sI->sale->payment_type == 'cash') {
                            return $sI->total_price;
                        }
                    }),
                    'total_gcash' => $product->saleItems->sum(function ($sI) {
                        if ($sI->sale->payment_type == 'gcash') {
                            return $sI->total_price;
                        }
                    }),
                    'total_account_receivables' => $product->saleItems->sum(function ($sI) {
                        if ($sI->sale->payment_type == 'account_receivable') {
                            return $sI->total_price;
                        }
                    }),
                    'total_cheque' => $product->saleItems->sum(function ($sI) {
                        if ($sI->sale->payment_type == 'cheque') {
                            return $sI->total_price;
                        }
                    }),
                ];

            }

            $cat['id'] = $category->id;
            $cat['name'] = $category->name;
            $cat['products'] = $prods;
            $cat['total_quantity'] = array_sum(array_column($prods, 'quantity'));
            $cat['total_price'] = array_sum(array_column($prods, 'total_price'));
            $cat['total_cash'] = array_sum(array_column($prods, 'total_cash'));
            $cat['total_gcash'] = array_sum(array_column($prods, 'total_gcash'));
            $cat['total_cheque'] = array_sum(array_column($prods, 'total_cheque'));
            $cat['total_account_receivables'] = array_sum(array_column($prods, 'total_account_receivables'));

            return $cat;
        });

        $totalPrice = $categories->sum('total_price');
        $totalCash = $categories->sum('total_cash');
        $totalGCash = $categories->sum('total_gcash');
        $totalCheque = $categories->sum('total_cheque');
        $totalReceivable = $categories->sum('total_account_receivables');

        $sales = [
            'total_price' => $totalPrice - $totalReceivable,
            'total_cash' => $totalCash,
            'total_gcash' => $totalGCash,
            'total_cheque' => $totalCheque,
            'total_receivable' => $totalReceivable,
        ];

        // dd($categories);

        return Inertia::render('Reports/Sales', [
            'categories' => $categories,
            'sales' => $sales,
        ]);
    }
}
