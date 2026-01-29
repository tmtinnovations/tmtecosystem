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
        Schema::create('discord_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->string('discord_user_id')->nullable(); // Discord user ID
            $table->string('discord_handle'); // alex_trader#9921
            $table->string('target_role'); // Get Funded Student, TAT Member, Premium Member, etc.
            $table->enum('sync_status', ['Synced', 'Pending', 'Failed'])->default('Pending');
            $table->timestamp('last_sync_at')->nullable();
            $table->text('error_message')->nullable();
            $table->integer('retry_count')->default(0);
            $table->timestamps();

            $table->index('sync_status');
            $table->index('discord_user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discord_roles');
    }
};
