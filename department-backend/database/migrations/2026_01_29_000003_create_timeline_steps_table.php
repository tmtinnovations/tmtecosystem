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
        Schema::create('timeline_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('label'); // Payment Received, Auto Logged, Role Assigned, Student Notified, etc.
            $table->enum('status', ['completed', 'current', 'pending', 'failed'])->default('pending');
            $table->string('timestamp_label')->nullable(); // Display timestamp like "10:00 AM", "Processing..."
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['student_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timeline_steps');
    }
};
