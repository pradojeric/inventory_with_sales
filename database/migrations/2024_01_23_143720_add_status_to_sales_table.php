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
        Schema::table('sales', function (Blueprint $table) {
            $table->string('reference_no')->after('payment_type')->nullable();
            $table->string('status')->after('sale_date')->default('processing');
            $table->string('paid_via')->after('paid_on')->nullable();
            $table->softDeletes();
        });

        Schema::table('sale_items', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('reference_no');
            $table->dropColumn('paid_via');
            $table->dropSoftDeletes();
        });

        Schema::table('sale_items', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
