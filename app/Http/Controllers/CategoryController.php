<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'variants' => ['nullable', 'array'],
        ]);

        // dd($validatedData['variants']);

        DB::beginTransaction();

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        if (isset($validatedData['variants']) && count($validatedData['variants']) > 0) {

            $category->variants()->createMany($validatedData['variants']);
        }

        DB::commit();

        session()->flash('message', 'Success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {

        $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'variants' => ['nullable', 'array'],
        ]);

        DB::beginTransaction();

        $category->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        foreach ($request->variants as $variant) {
            if (isset($variant['id'])) {
                $category->variants()->updateOrCreate(
                    ['id' => $variant['id']],
                    ['name' => $variant['name']]
                );
            } else {
                $category->variants()->create($variant);
            }
        }

        $deletedVariants = $category->variants->whereNotIn('id', collect($request->variants)->pluck('id'));

        foreach ($deletedVariants as $dele) {
            $dele->delete();
        }

        DB::commit();

        session()->flash('message', 'Success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
