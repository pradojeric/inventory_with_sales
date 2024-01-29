<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function dashboard(Request $request)
    {
        $year = $request->has('date') ? $request->date : date('Y');
        $sales = [];

        for ($i = 1; $i <= 12; $i++) {
            $sale = Sale::whereMonth('sale_date', $i)->whereYear('sale_date', $year);
            $currentDate = Carbon::createFromDate($year, $i, 1)->format('M');
            $gross = (clone $sale)->sum('total_amount');
            $receivables = (clone $sale)->where('payment_type', 'account_receivable')->sum('total_amount');

            $sales[] = [
                'name' => $currentDate,
                'sales' => $gross - $receivables,
                'receivables' => $receivables,
            ];
        }
        $stocks = [];
        $categories = Category::all();

        foreach ($categories as $category) {

            $stocks[] = [
                'name' => $category->name,
                'quantity' => $category->products->sum('quantity'),
            ];

        }

        return Inertia::render('Dashboard', [
            'sales' => $sales,
            'stocks' => $stocks,

        ]);
    }
}
