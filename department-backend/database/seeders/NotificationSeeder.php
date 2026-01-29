<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notifications = [
            ['message' => 'Reminder: 4 student payments near due (triggering auto-emails)', 'type' => 'info'],
            ['message' => 'Sarah Williams: 1-week reminder sent successfully', 'type' => 'success'],
            ['message' => '3 new students auto-added to the system', 'type' => 'success'],
            ['message' => 'Payment verification failed for Michael Brown - requires manual review', 'type' => 'error'],
            ['message' => 'Discord role sync completed for 5 students', 'type' => 'success'],
            ['message' => 'High-value crypto transaction pending verification', 'type' => 'warning'],
        ];

        foreach ($notifications as $index => $notification) {
            DB::table('notifications')->insert([
                'uuid' => Str::uuid()->toString(),
                'message' => $notification['message'],
                'type' => $notification['type'],
                'user_id' => null,
                'is_read' => $index > 2, // First 3 are unread
                'read_at' => $index > 2 ? now()->subHours(rand(1, 24)) : null,
                'created_at' => now()->subMinutes($index * 5),
                'updated_at' => now()->subMinutes($index * 5),
            ]);
        }
    }
}
