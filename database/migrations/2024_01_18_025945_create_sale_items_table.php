<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sale_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sale_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->float('unit_price');
            $table->integer('quantity');
            $table->boolean('has_discount')->default(false);
            $table->integer('quantity_discounted')->default(0);
            $table->float('discount_per_item')->default(0);
            $table->float('total_discount')->default(0);
            $table->float('total_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_items');
    }
};
