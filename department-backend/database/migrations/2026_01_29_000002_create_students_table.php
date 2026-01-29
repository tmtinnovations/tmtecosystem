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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique(); // External ID for API
            $table->string('name');
            $table->string('email')->unique();
            $table->string('discord_handle')->nullable();
            $table->foreignId('program_id')->constrained('programs')->onDelete('restrict');
            $table->enum('payment_status', ['Paid', 'Pending', 'Failed'])->default('Pending');
            $table->enum('onboarding_status', ['Not Started', 'In Progress', 'Completed'])->default('Not Started');
            $table->boolean('discord_role_assigned')->default(false);
            $table->date('joined_date');
            $table->date('due_date'); // Next payment/subscription renewal date
            $table->timestamp('last_reminder_sent')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('payment_status');
            $table->index('onboarding_status');
            $table->index('due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
