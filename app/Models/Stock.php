<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stock extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'delivery_date' => 'datetime:Y-m-d h:i a',
    ];

    public function stockProducts(): HasMany
    {
        return $this->hasMany(StockProduct::class);
    }
}
