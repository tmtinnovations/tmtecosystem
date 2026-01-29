<?php

namespace Database\Seeders;

use App\Models\DiscordRole;
use App\Models\Student;
use Illuminate\Database\Seeder;

class DiscordRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['email' => 'alex.j@example.com', 'discord_handle' => 'alex_trader#9921', 'target_role' => 'Get Funded Student', 'sync_status' => 'Synced'],
            ['email' => 'sarah.w@example.com', 'discord_handle' => 'sarah_w#1122', 'target_role' => 'TAT Member', 'sync_status' => 'Pending'],
            ['email' => 'm.brown@example.com', 'discord_handle' => 'mike_b_88', 'target_role' => 'Premium Member', 'sync_status' => 'Failed', 'error_message' => 'Discord API returned 504 Gateway Timeout'],
            ['email' => 'emily.d@example.com', 'discord_handle' => 'emily_d#5544', 'target_role' => 'TMT Basic', 'sync_status' => 'Pending'],
            ['email' => 'chris.w@example.com', 'discord_handle' => 'cwilson#0001', 'target_role' => 'Premium Lite', 'sync_status' => 'Synced'],
            ['email' => 'j.lee@example.com', 'discord_handle' => 'jess_lee#7788', 'target_role' => 'MOM Member', 'sync_status' => 'Synced'],
        ];

        foreach ($roles as $data) {
            $student = Student::where('email', $data['email'])->first();
            
            if ($student) {
                DiscordRole::create([
                    'student_id' => $student->id,
                    'discord_user_id' => rand(100000000000000000, 999999999999999999),
                    'discord_handle' => $data['discord_handle'],
                    'target_role' => $data['target_role'],
                    'sync_status' => $data['sync_status'],
                    'last_sync_at' => $data['sync_status'] === 'Synced' ? now()->subMinutes(rand(10, 1440)) : null,
                    'error_message' => $data['error_message'] ?? null,
                    'retry_count' => $data['sync_status'] === 'Failed' ? rand(1, 3) : 0,
                ]);
            }
        }
    }
}
