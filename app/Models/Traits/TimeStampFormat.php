<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait TimeStampFormat
{

    public static function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => \Carbon\Carbon::parse($value)
                ->timezone('Asia/Manila')
                ->format('Y-m-d h:i A')
        );
    }

    public static function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => \Carbon\Carbon::parse($value)
                ->timezone('Asia/Manila')
                ->format('Y-m-d h:i A')
        );
    }
}
