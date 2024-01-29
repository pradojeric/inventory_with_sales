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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('order_no');
            $table->string('customer_name')->nullable();
            $table->text('customer_address')->nullable();
            $table->string('payment_type');
            $table->float('cash_received');
            $table->float('total_amount');
            $table->float('change_amount');
            $table->datetime('sale_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
