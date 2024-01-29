<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = ['variants'];

    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
