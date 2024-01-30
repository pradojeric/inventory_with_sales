<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = ['category', 'variant'];

    protected $casts = [
        'updated_at' => 'datetime:Y-m-d h:i a',
    ];

    protected $appends = [
        'last_delivery_date',
        'product_name',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(Variant::class);
    }

    public function stockProducts(): HasMany
    {
        return $this->hasMany(StockProduct::class);
    }

    public function saleItems(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }

    public function lastDeliveryDate(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->stockProducts->count() > 0 ? $this->stockProducts->sortByDesc('created_at')->first()->stock->delivery_date->format('Y-m-d h:i a') : $this->created_at->format('Y-m-d h:i a'),
        );
    }

    public function productName(): Attribute
    {
        $variant = "";
        if ($this->variant) {
            $variant = "({$this->variant->name})";
        }

        return Attribute::make(
            get: fn() => trim("{$this->name} $variant")
        );
    }
}
