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
        Schema::create('response_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('label'); // FB Page Response Rate, FB Page Response Time, etc.
            $table->string('value'); // 31.70%, 3h 48m, etc.
            $table->enum('trend', ['improved', 'dropped', 'neutral'])->default('neutral');
            $table->string('delta')->nullable(); // -56.09%, +1h 51m
            $table->boolean('is_time')->default(false);
            $table->date('recorded_date');
            $table->timestamps();

            $table->index('recorded_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('response_metrics');
    }
};
