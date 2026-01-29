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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique(); // TRX-9928 format
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('method', ['Stripe', 'PayPal', 'Bank Transfer', 'Crypto'])->default('Stripe');
            $table->enum('status', ['Verified', 'Pending', 'Failed'])->default('Pending');
            $table->string('external_reference')->nullable(); // External payment gateway reference
            $table->text('notes')->nullable();
            $table->timestamp('transaction_date');
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
            $table->index('method');
            $table->index('transaction_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
