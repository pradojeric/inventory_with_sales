<?php

namespace App\Models;

use App\Models\Traits\TimeStampFormat;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory, TimeStampFormat, SoftDeletes;

    protected $guarded = [];

    protected $casts = [
        'sale_date' => 'date:Y-m-d',
    ];

    protected $with = ['user', 'cancelledBy'];

    public function customerName(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => trim(ucwords(strtolower($value))),
            set: fn(string $value) => trim(strtoupper($value)),
        );
    }

    public function paidOn(): Attribute
    {
        return Attribute::make(
            get: fn($value) => \Carbon\Carbon::create($value)->format('Y-m-d h:i A'),
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cancelledBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cancelled_by');
    }

    public function saleItems(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }

}
